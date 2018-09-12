import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, Icon, Checkbox } from 'antd';
import './DialogGroupSelect.css';
import { changeFindingParams, getDialogs } from '../../ac';

const CheckboxGroup = Checkbox.Group;

const mapStateToProps = state => ({
  channels: state.channels,
  findingParams: state.dialogs.findingParams
});

class DialogGroupSelect extends Component {
  state = {
    visible: false,
    groups: ['Мои диалоги', 'Открытые', 'Закрытые', 'Все диалоги'],
    activeGroup: 'Мои диалоги'
  };

  hide = () => {
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  handleGroupClick = group => () => {
    this.setState({
      activeGroup: group
    });
    this.hide();
  };

  onChannelsChange = checkedValues => {
    const { sort, search } = this.props.findingParams;

    this.props.changeFindingParams({ channels: checkedValues });
    this.props.getDialogs(
      undefined,
      undefined,
      sort || undefined,
      search || undefined,
      checkedValues.length ? checkedValues.join(',') : undefined
    );
  };

  get popoverContent() {
    return (
      <div className="dialog-group-select__channels">
        <CheckboxGroup
          options={this.props.channels}
          onChange={this.onChannelsChange}
        />
        <span className="dialog-group-select__filter-deleted-channels">
          Показать удаленные
        </span>
      </div>
    );
  }

  get popoverTitle() {
    return (
      <div className="dialog-group-select__groups">
        {this.state.groups.map(group => (
          <a key={group} onClick={this.handleGroupClick(group)}>
            {group}
          </a>
        ))}
      </div>
    );
  }

  render() {
    return (
      <Popover
        content={this.popoverContent}
        title={this.popoverTitle}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <div className="dialog-group-select__btn">
          <Icon type="filter" theme="outlined" />
          <span>{this.state.activeGroup}</span>
        </div>
      </Popover>
    );
  }
}

export default connect(
  mapStateToProps,
  { changeFindingParams, getDialogs }
)(DialogGroupSelect);
