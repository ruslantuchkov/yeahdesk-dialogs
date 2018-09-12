import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import Moment from 'react-moment';
import './Message.css';

const mapStateToProps = (state, ownProps) => ({
  user: state.usersInfo.find(user => user.id === ownProps.owner)
});

class Message extends Component {
  render() {
    return (
      <div
        className={`message${this.props.reversed ? ' message--reversed' : ''}`}
      >
        <Avatar
          src={
            this.props.user
              ? this.props.user.avatar
              : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          }
        />
        <div className="message__content">
          <div className="message__metadata">
            <span className="message__author">
              {this.props.user ? this.props.user.name : 'User Name'}
            </span>
            <span className="message__create-date">
              {
                <Moment format="DD MMMM YYYY HH:MM:SS">
                  {this.props.date}
                </Moment>
              }
            </span>
          </div>

          <p>{this.props.content.text}</p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Message);
