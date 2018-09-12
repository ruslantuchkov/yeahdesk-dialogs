import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Message from './Message/Message';

const { Content } = Layout;

const mapStateToProps = state => {
  const activeDialog = state.dialogs.entities.find(
    dialog => dialog.id === state.activeDialog
  );

  return {
    messages: activeDialog ? activeDialog.messages : []
  };
};

class DialogContent extends Component {
  render() {
    return (
      <Content
        style={{
          padding: 24,
          minHeight: 280,
          overflow: 'auto'
        }}
      >
        {this.props.messages.length ? (
          this.props.messages.map((message, idx) => (
            <Message
              key={message.id}
              {...message}
              reversed={(idx + 1) % 2 === 0 ? true : false}
            />
          ))
        ) : (
          <span>Выберите диалог</span>
        )}
      </Content>
    );
  }
}

export default connect(mapStateToProps)(DialogContent);
