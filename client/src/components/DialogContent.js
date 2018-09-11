import React, { Component } from 'react';
import { Layout } from 'antd';
import Message from './Message/Message';

const { Content } = Layout;

class DialogContent extends Component {
  state = {
    messages: [
      {
        id: 1,
        content: {
          text: `ToolLinks must not point to "#". Use a more descriptive href or use
          a button instead Links must not point to "#". Use a more descriptive
          href or use a button instead tip ToolLinks must not point to "#".
          Use a more descriptive href or use a button instead Links must not
          point to "#". Use a more descriptive href or use a button instead
          tip`
        },
        owner: 'userID',
        date: new Date()
      },
      {
        id: 2,
        content: {
          text: `ToolLinks must not point to "#". Use a more descriptive href or use
          a button instead Links must not point to "#". Use a more descriptive
          href or use`
        },
        owner: 'userID',
        date: new Date()
      },
      {
        id: 3,
        content: {
          text: `ToolLinks must not point to "#". Use a more descriptive href or use
          a button instead Links must not point to "#". Use a more descriptive
          href or use a button instead tip ToolLinks must not point to "#".
          Use a more descriptive href or use a button instead Links must not
          point to "#". Use a more descriptive href or use a button instead
          tip`
        },
        owner: 'userID',
        date: new Date()
      },
      {
        id: 4,
        content: {
          text: `ToolLinks must not point to "#". Use a more descriptive href or use
          a button instead Links must not point to "#". Use a more descriptive
          href or use`
        },
        owner: 'userID',
        date: new Date()
      }
    ]
  };

  render() {
    return (
      <Content
        style={{
          padding: 24,
          minHeight: 280,
          overflow: 'auto'
        }}
      >
        {this.state.messages.map((message, idx) => (
          <Message
            key={message.id}
            {...message}
            reversed={(idx + 1) % 2 === 0 ? true : false}
          />
        ))}
      </Content>
    );
  }
}

export default DialogContent;
