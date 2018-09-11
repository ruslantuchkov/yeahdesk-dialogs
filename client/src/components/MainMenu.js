import React, { Component } from 'react';
import { Layout, Divider } from 'antd';
import Navigation from '../components/Navigation/Navigation';

const { Sider } = Layout;

class MainMenu extends Component {
  render() {
    return (
      <Sider width={70} style={{ position: 'relative' }}>
        <div className="logo">
          <img
            src="https://app.yeahdesk.ru/static/media/path46.af75286b.png"
            alt=""
            style={{ width: '35px' }}
          />
        </div>
        <Divider type="horizontal" style={{ margin: 0 }} />
        <Navigation />
      </Sider>
    );
  }
}

export default MainMenu;
