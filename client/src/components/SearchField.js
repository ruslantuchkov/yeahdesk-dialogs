import React, { Component } from 'react';
import { Input, Icon } from 'antd';

class SearchField extends Component {
  state = {
    value: ''
  };

  emitEmpty = () => {
    this.input.focus();
    this.setState({ value: '' });
  };

  onChangeValue = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { value } = this.state;
    const suffix = value ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;
    return (
      <Input
        placeholder="Найти"
        style={{ width: '90%', margin: '10px 5%' }}
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        suffix={suffix}
        value={value}
        onChange={this.onChangeValue}
        ref={node => (this.input = node)}
      />
    );
  }
}

export default SearchField;
