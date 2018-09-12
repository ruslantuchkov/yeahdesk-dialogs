import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';
import { getDialogs, changeFindingParams } from '../ac';

const mapStateToProps = state => ({
  sortDirection: state.dialogs.findingParams.sort
});

class DialogSorting extends Component {
  state = {
    values: ['new', 'old']
  };

  handleValueClick = val => () => {
    this.props.changeFindingParams({ sort: val });
    this.props.getDialogs(undefined, undefined, val);
  };

  getSortValue = sortDirection => {
    if (sortDirection === 'new') return 'Новые в начале';
    if (sortDirection === 'old') return 'Старые в начале';
  };

  get menu() {
    return (
      <Menu>
        {this.state.values.map(val => (
          <Menu.Item key={val}>
            <a onClick={this.handleValueClick(val)}>{this.getSortValue(val)}</a>
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  render() {
    return (
      <Dropdown overlay={this.menu} trigger={['click']}>
        <a
          className="ant-dropdown-link"
          style={{
            color: 'rgba(0,0,0,.65)',
            marginLeft: '20px'
          }}
        >
          {this.getSortValue(this.props.sortDirection)}{' '}
          <Icon type="caret-down" theme="outlined" />
        </a>
      </Dropdown>
    );
  }
}

export default connect(
  mapStateToProps,
  { getDialogs, changeFindingParams }
)(DialogSorting);
