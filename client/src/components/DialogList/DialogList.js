import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Avatar, Spin, message } from 'antd';
import Moment from 'react-moment';
import InfiniteScroll from 'react-infinite-scroller';
import './DialogList.css';
import { getDialogs, getChannels } from '../../ac';

const mapStateToProps = state => ({
  dialogs: state.dialogs.entities,
  loading: state.dialogs.loading,
  hasMore: state.dialogs.hasMore,
  usersInfo: state.usersInfo,
  findingParams: state.dialogs.findingParams
});

class DialogList extends Component {
  componentDidMount() {
    this.props.getDialogs();
    this.props.getChannels();
  }

  handleInfiniteOnLoad = () => {
    let data = this.props.dialogs;
    const { sort, search, channels } = this.props.findingParams;

    if (!this.props.hasMore) {
      message.warning('Все диалоги загружены');
      return;
    }
    this.props.getDialogs(
      data.length - 1,
      data.length - 1 + 50,
      sort || undefined,
      search || undefined,
      channels.length ? channels.join(',') : undefined
    );
  };

  getTitle = item => (
    <p className="dialog-list__list-title">
      <span className="dialog-list__name">{item.name}</span>
      <span className="dialog-list__date">
        <Moment format="DD/MM/YY">{item.date}</Moment>
      </span>
    </p>
  );

  getDescription = item => {
    const lastMessage = item.messages[item.messages.length - 1];
    const lastMessageOwner =
      this.props.usersInfo.length &&
      this.props.usersInfo.find(user => user.id === lastMessage.owner);

    const userName = lastMessageOwner ? lastMessageOwner.name : 'User Name';

    return (
      <p className="dialog-list__description">
        <span className="dialog-list__user-name">{userName}</span>:{' '}
        {lastMessage.content && lastMessage.content.text}
      </p>
    );
  };

  render() {
    return (
      <div className="dialog-list dialog-list__infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.props.loading && this.props.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.props.dialogs}
            renderItem={item => (
              <List.Item key={item.id} className="dialog-list__list-item">
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={this.getTitle(item)}
                  description={this.getDescription(item)}
                />
              </List.Item>
            )}
          >
            {this.props.loading &&
              this.props.hasMore && (
                <div className="dialog-list__loading-container">
                  <Spin />
                </div>
              )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getDialogs, getChannels }
)(DialogList);
