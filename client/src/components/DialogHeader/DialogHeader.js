import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Layout, Button, Avatar } from 'antd';
import './DialogHeader.css';

const { Header } = Layout;

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

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
            src={
              this.props.currentUser.avatar
                ? this.props.currentUser.avatar
                : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            }
            size="small"
          />
          <span style={{ textDecoration: 'underline', marginLeft: 10 }}>
            {this.props.currentUser.name ? this.props.currentUser.name : 'You'}
          </span>
        </Button>
      </Header>
    );
  }
}

export default connect(mapStateToProps)(DialogHeader);
