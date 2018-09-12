import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';
import { getDialogs } from '../ac';

class DialogSorting extends Component {
  state = {
    values: ['new', 'old'],
    sortDirection: 'new'
  };

  handleValueClick = val => () => {
    this.props.getDialogs(undefined, undefined, val);

    this.setState({
      sortDirection: val
    });
  };

  getSortValue = sortDirection => {
    if (sortDirection === 'new') return 'Новые в начале';
    if (sortDirection === 'old') return 'Старые в начале';
  };

  get menu() {
    return (
      <Menu>
        {this.state.values.map(val => (
          <Menu.Item key={val}>
            <a onClick={this.handleValueClick(val)}>{this.getSortValue(val)}</a>
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  render() {
    return (
      <Dropdown overlay={this.menu} trigger={['click']}>
        <a
          className="ant-dropdown-link"
          style={{
            color: 'rgba(0,0,0,.65)',
            marginLeft: '20px'
          }}
        >
          {this.getSortValue(this.state.sortDirection)}{' '}
          <Icon type="caret-down" theme="outlined" />
        </a>
      </Dropdown>
    );
  }
}

export default connect(
  null,
  { getDialogs }
)(DialogSorting);
