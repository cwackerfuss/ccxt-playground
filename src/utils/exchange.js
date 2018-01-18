import { Client as Coinbase } from 'coinbase';
import ccxt from 'ccxt';

const exchanges = [
  "_1broker",
  "_1btcxe",
  "acx",
  "allcoin",
  "anxpro",
  "bibox",
  "binance",
  "bit2c",
  "bitbay",
  "bitcoincoid",
  "bitfinex",
  "bitfinex2",
  "bitflyer",
  "bithumb",
  "bitlish",
  "bitmarket",
  "bitmex",
  "bitso",
  "bitstamp",
  "bitstamp1",
  "bittrex",
  "bl3p",
  "bleutrade",
  "braziliex",
  "btcbox",
  "btcchina",
  "btcexchange",
  "btcmarkets",
  "btctradeua",
  "btcturk",
  "btcx",
  "bter",
  "bxinth",
  "ccex",
  "cex",
  "chbtc",
  "chilebit",
  "coincheck",
  "coinexchange",
  "coinfloor",
  "coingi",
  "coinmarketcap",
  "coinmate",
  "coinsecure",
  "coinspot",
  "cryptopia",
  "dsx",
  "exmo",
  "flowbtc",
  "foxbit",
  "fybse",
  "fybsg",
  "gatecoin",
  "gateio",
  "gdax",
  "gemini",
  "getbtc",
  "hitbtc",
  "hitbtc2",
  "huobi",
  "huobicny",
  "huobipro",
  "independentreserve",
  "itbit",
  "jubi",
  "kraken",
  "kucoin",
  "kuna",
  "lakebtc",
  "liqui",
  "livecoin",
  "luno",
  "lykke",
  "mercado",
  "mixcoins",
  "nova",
  "okcoincny",
  "okcoinusd",
  "okex",
  "paymium",
  "poloniex",
  "qryptos",
  "quadrigacx",
  "quoine",
  "southxchange",
  "surbitcoin",
  "therock",
  "tidex",
  "urdubit",
  "vaultoro",
  "vbtc",
  "virwox",
  "wex",
  "xbtce",
  "yobit",
  "yunbi",
  "zaif",
  "zb"
];
// cancelOrder
// createDepositAddress
// createOrder
// deposit
// fetchBalance
// fetchBidsAsks
// fetchClosedOrders
// fetchCurrencies
// fetchDepositAddress
// fetchMarkets
// fetchMyTrades
// fetchOHLCV
// fetchOpenOrders
// fetchOrder
// fetchOrderBook
// fetchOrders
// fetchTicker
// fetchTickers
// fetchTrades
// withdraw
export const tryExchanges = () => {
  const ccxts = exchanges.map(exchange => new ccxt[exchange]())
  ccxts.forEach(x => {
    // console.log(`${x.name} has:`)
    // console.log(`fetchBalance:       ${x.has.fetchBalance}`)
    // console.log(`fetchClosedOrders:  ${x.has.fetchClosedOrders}`)
    // console.log(`fetchMyTrades:      ${x.has.fetchMyTrades}`)
    // console.log(`fetchOpenOrders:    ${x.has.fetchOpenOrders}`)
    // console.log(`fetchOrders:        ${x.has.fetchOrders}`)
    // console.log(`fetchTrades:        ${x.has.fetchTrades}`)
    // console.log('=====================================')
    console.log(`${x.name} has cors: ${x.hasCORS}`);
    if (x.has.fetchBalance && x.has.fetchClosedOrders && x.has.fetchMyTrades && x.has.fetchOpenOrders && x.has.fetchOrders && x.has.fetchTrades) {
      console.log(`${x.name} has all.`)
    }
  })
};

export const initializeExchange = ({ exchange, apiKey, secret }) => {
  if (exchange === 'coinbase') {
    const client = new Coinbase({
      apiKey,
      apiSecret: secret,
      strictSSL: false
    });
    let totals = {};
    let coinbaseTransactions = [];
  } else {
    return new ccxt[exchange]({ apiKey, secret, proxy: 'https://cors-anywhere.herokuapp.com/' });
  }
};

export const initializeExchanges = items =>
  items.map(item => initializeExchange(item));

export const fetchBalance = async exchange => {
  try {
    const balance = await exchange.fetchBalance();
    console.log(balance)
    return balance;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBalances = async exchanges => {
  const results = await Promise.all(
    exchanges.map(exchange => fetchBalance(exchange))
  );
};
