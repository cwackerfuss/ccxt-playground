import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Dropdown, Button, Icon } from 'semantic-ui-react'
import { initializeExchange, fetchBalance, tryExchanges } from './utils/exchange';
import ccxt from 'ccxt';


const getOhlvcExchanges = () => (
  ccxt.exchanges.filter(exchange => (new ccxt[exchange]().hasFetchOHLCV))
);

class App extends Component {
  state = {
    exchange: null,
    marketFrom: null,
    marketTo: null,
    ccxtExchange: null,
    markets: {},
    marketsFrom: [],
    marketsTo: [],
    marketsLoading: false,
    exchangeSelected: false,
    ohlcv: false
  }

  componentDidMount() {
    const gemini = {
      exchange: 'gemini',
      apiKey: 'ZrWXh0rt0RLtubOSxtcJ',
      secret: '31xoDGKLc3Q6Gw51A1yaBMTG8KWc'
    }

    tryExchanges();

    const inittedGemini = initializeExchange(gemini);
    fetchBalance(inittedGemini)
  }

  onSubmit = values => {
    console.log(values)
  }

  validate = values => {
    console.log('validating: ', values)
  }

  getMarketsFrom = (markets) => {
    const getFrom = x => (
      x.substr(0, x.indexOf('/'))
    );
    const marketsFrom = Object.keys(markets).map(getFrom);
    return [...new Set(marketsFrom)];
  }

  getMarketsTo = (markets, from) => {
    const filterTo = x => (
      x.substr(0, x.indexOf('/')) === from
    );
    const getTo = x => {
      const index = x.lastIndexOf('/');
      return x.slice(index+1);
    }
    const filteredMarketsTo = Object.keys(markets).filter(filterTo);
    return Object
      .keys(markets)
      .filter(filterTo)
      .map(getTo)
  }

  selectExchange = async (e, data) => {
    const exchange = new ccxt[data.value]({ proxy: 'https://cors-anywhere.herokuapp.com/' })
    this.setState({
      exchangeSelected: true,
      marketsLoading: true,
      exchange: data.value,
      ccxtExchange: exchange
    })

    try {
      const markets = await exchange.loadMarkets()
      console.log(markets)
      const marketsFrom = this.getMarketsFrom(markets);
      const marketFrom = marketsFrom[0];

      this.setState({
        markets,
        marketsFrom: marketsFrom,
        marketsLoading: false,
        marketFrom
      })
    } catch(e) {
      this.setState({
        marketsLoading: false
      })
    }
  }

  selectMarketFrom = (e, data) => {
    const marketsTo = this.getMarketsTo(this.state.markets, this.state.marketFrom)

    this.setState({
      marketFrom: data.value,
      marketTo: marketsTo[0],
      marketsTo
    })
  }

  selectMarketTo = (e, data) => {
    this.setState({
      marketTo: data.value
    })
  }

  fetchData = async () => {
    const { ccxtExchange, marketFrom, marketTo } = this.state;
    const ohlcv = await ccxtExchange.fetchOHLCV(`${marketFrom}/${marketTo}`, '1m')
    this.setState({ ohlcv })
  }

  render() {
    const { marketsFrom, marketFrom, marketsTo, marketTo, marketsLoading, exchange, exchangeSelected, ohlcv } = this.state;


    const outputOhlcv = () => {
      let output = '';
      output += `[
`
      ohlcv.forEach(a => {
        output += ` [
`
        a.forEach(b => {
          output += `  ${b},
`
        })
        output += ` ],
`
      })
      output += `]
`

      return output;
    }
    return (
      <div className="App">
        <Container>
          <Dropdown
            placeholder='Exchange'
            search
            selection
            value={exchange}
            onChange={this.selectExchange}
            options={getOhlvcExchanges().map(exchange => ({ key: exchange, value: exchange, text: exchange }))}
          />
          { marketsLoading || !exchangeSelected
            ? <span>Preparing markets...</span>
            : (
              <span>
                <Dropdown
                  placeholder='From'
                  search
                  selection
                  value={marketFrom}
                  onChange={this.selectMarketFrom}
                  options={marketsFrom.map(market => ({ key: market, value: market, text: market }))}
                />
                /
                <Dropdown
                  placeholder='To'
                  search
                  selection
                  value={marketTo}
                  onChange={this.selectMarketTo}
                  options={marketsTo.map(market => ({ key: market, value: market, text: market }))}
                />
                <Button animated onClick={this.fetchData}>
                  <Button.Content visible>Fetch</Button.Content>
                  <Button.Content hidden>
                    <Icon name='right arrow' />
                  </Button.Content>
                </Button>
              </span>
            )
          }

          <pre style={{textAlign: 'left', backgroundColor: '#efefef', fontWeight: 'bold'}}>
            <code>
              {this.state.ohlcv ? outputOhlcv() : ''}
            </code>
          </pre>
        </Container>
      </div>
    );
  }
}

export default App;
