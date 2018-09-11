import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import './Navigation.css';

class Navigation extends Component {
  render() {
    return (
      <Menu theme="dark" defaultSelectedKeys={['1']} className="navigation">
        <Menu.Item key="1">
          <a href="">
            <Icon type="message" />
            <p
              className="navigation__item-label"
              style={{ marginLeft: '-7px' }}
            >
              Диалоги
            </p>
          </a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href="">
            <Icon type="team" />
            <p
              className="navigation__item-label"
              style={{ marginLeft: '-7px' }}
            >
              Клиенты
            </p>
          </a>
        </Menu.Item>
        <Menu.Item key="3" style={{ position: 'absolute', bottom: '37px' }}>
          <a href="">
            <Icon type="setting" />
            <p
              className="navigation__item-label"
              style={{ marginLeft: '-13px' }}
            >
              Настройка
            </p>
          </a>
        </Menu.Item>

        <Menu.Item key="4" style={{ position: 'absolute', bottom: 0 }}>
          <a href="">
            <Icon type="user" />
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navigation;
