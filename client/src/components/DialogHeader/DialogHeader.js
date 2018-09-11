import React, { Component } from 'react';
import { Icon, Layout, Button, Avatar } from 'antd';
import './DialogHeader.css';

const { Header } = Layout;

class DialogHeader extends Component {
  render() {
    return (
      <Header className="dialog-header">
        <Icon
          className="trigger"
          type={this.props.isDialogsCollapsed ? 'arrow-right' : 'arrow-left'}
          onClick={this.props.toggleDialogs}
          style={{ fontSize: 20, padding: 0 }}
        />
        <h3 className="dialog-header__dialog-name">Dialog Name</h3>
        <p className="dialog-header__owner">User Name</p>
        <Button
          style={{
            position: 'absolute',
            right: '15px',
            top: '15px'
          }}
        >
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            size="small"
          />
          <span style={{ textDecoration: 'underline', marginLeft: 10 }}>
            Current User
          </span>
        </Button>
      </Header>
    );
  }
}

export default DialogHeader;
