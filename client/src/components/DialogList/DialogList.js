import React, { Component } from 'react';
import { List, message, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import './DialogList.css';

class DialogList extends Component {
  state = {
    data: [
      {
        id: 1,
        name: 'Электронный билетЭлектронный билетЭлектронный билет'
      },
      {
        id: 2,
        name: 'Электронный билетЭлектронный билетЭлектронный билет'
      }
    ],
    loading: false,
    hasMore: true
  };

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
  };

  getTitle = item => (
    <p className="dialog-list__list-title">
      <span className="dialog-list__name">{item.name}</span>
      <span className="dialog-list__date">5/9/18</span>
    </p>
  );

  getDescription = item => (
    <p className="dialog-list__description">
      <span className="dialog-list__user-name">UserName</span>: Note that the
      development build is not optimized. To create a production build, use yarn
      build.
    </p>
  );

  render() {
    return (
      <div className="dialog-list">
        <div className="infinite-container">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={this.state.data}
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
              {this.state.loading &&
                this.state.hasMore && (
                  <div className="loading-container">
                    <Spin />
                  </div>
                )}
            </List>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default DialogList;
