import React, { Component } from 'react';
import { Input, Message } from 'semantic-ui-react';

export default class SemanticField extends Component {
  componentWillMount() {
    const { input, initialValue } = this.props;

    if (!input.value && initialValue) {
      input.onChange(initialValue);
    }
  }

  handleChange = (e, { value }) => {
    const { input } = this.props;
    return input.onChange(value);
  };

  render() {
    const {
      input,
      label,
      initialValue,
      meta: { touched, error },
      as: As = Input,
      ...props
    } = this.props;

    const errorMessage = (
      <Message size="mini" negative>
        {error}
      </Message>
    );
    return (
      <As
        {...input}
        value={input.value}
        {...props}
        label={label}
        onChange={this.handleChange}
        error={touched && !!error}
      />
    );
  }
}
