import React, { Component } from 'react';
import { Popover, Icon, Checkbox } from 'antd';
import './DialogGroupSelect.css';

const CheckboxGroup = Checkbox.Group;

class DialogGroupSelect extends Component {
  state = {
    visible: false,
    groups: ['Мои диалоги', 'Открытые', 'Закрытые', 'Все диалоги'],
    channels: [
      { label: 'nidjel87@gamil.com', value: 'nidjel87@gamil.com' },
      { label: 'ruslantuchkov@yandex.ru', value: 'ruslantuchkov@yandex.ru' }
    ],
    selectedChannels: [],
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
    this.setState({ selectedChannels: checkedValues });
  };

  get popoverContent() {
    return (
      <div className="dialog-group-select__channels">
        <CheckboxGroup
          options={this.state.channels}
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

export default DialogGroupSelect;
