import React, { Component } from 'react';
import { Avatar } from 'antd';
import './Message.css';

class Message extends Component {
  render() {
    return (
      <div
        className={`message${this.props.reversed ? ' message--reversed' : ''}`}
      >
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <div className="message__content">
          <div className="message__metadata">
            <span className="message__author">Name Name</span>
            <span className="message__create-date">
              7 сентября 2018 г. 3:48
            </span>
          </div>

          <p>
            ToolLinks must not point to "#". Use a more descriptive href or use
            a button instead Links must not point to "#". Use a more descriptive
            href or use a button instead tip ToolLinks must not point to "#".
            Use a more descriptive href or use a button instead Links must not
            point to "#". Use a more descriptive href or use a button instead
            tip
          </p>
        </div>
      </div>
    );
  }
}

export default Message;
