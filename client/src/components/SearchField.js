import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Icon } from 'antd';
import { getDialogs, changeFindingParams } from '../ac';

const MapStateToProps = state => ({
  value: state.dialogs.findingParams.search
});

class SearchField extends Component {
  emitEmpty = () => {
    this.input.focus();
    this.props.changeFindingParams({ search: '' });
    this.props.getDialogs();
  };

  onChangeValue = e => {
    this.props.changeFindingParams({ search: e.target.value });
    this.props.getDialogs(undefined, undefined, undefined, e.target.value);
  };

  render() {
    const value = this.props.value;
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

export default connect(
  MapStateToProps,
  { getDialogs, changeFindingParams }
)(SearchField);
