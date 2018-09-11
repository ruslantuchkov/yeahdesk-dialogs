import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.css';
import Dialogs from './routes/Dialogs';
import MainMenu from './components/MainMenu';

class App extends Component {
  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <MainMenu />
        <Dialogs />
      </Layout>
    );
  }
}

export default App;
