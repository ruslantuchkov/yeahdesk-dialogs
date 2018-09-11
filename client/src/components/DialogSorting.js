import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';

class DialogSorting extends Component {
  state = {
    values: ['Новые в начале', 'Старые в начале'],
    activeValue: 'Новые в начале'
  };

  handleValueClick = val => () => {
    this.setState({
      activeValue: val
    });
  };

  get menu() {
    return (
      <Menu>
        {this.state.values.map(val => (
          <Menu.Item key={val}>
            <a onClick={this.handleValueClick(val)}>{val}</a>
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
          {this.state.activeValue} <Icon type="caret-down" theme="outlined" />
        </a>
      </Dropdown>
    );
  }
}

export default DialogSorting;
