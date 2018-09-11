import React, { Component, Fragment } from 'react';
import { Layout, Divider } from 'antd';
import DialogList from '../components/DialogList/DialogList';
import SearchField from '../components/SearchField';
import DialogInput from '../components/DialogInput/DialogInput';
import DialogContent from '../components/DialogContent';
import DialogHeader from '../components/DialogHeader/DialogHeader';

import DialogGroupSelect from '../components/DialogGroupSelect/DialogGroupSelect';
import DialogSorting from '../components/DialogSorting';

const { Sider } = Layout;

class Dialogs extends Component {
  state = {
    isDialogsCollapsed: false
  };

  toggleDialogs = () => {
    this.setState({
      isDialogsCollapsed: !this.state.isDialogsCollapsed
    });
  };
  render() {
    return (
      <Fragment>
        <Sider
          width={370}
          trigger={null}
          collapsible
          collapsed={this.state.isDialogsCollapsed}
          collapsedWidth={0}
          style={{ background: '#f0f2f5' }}
        >
          <SearchField />
          <DialogGroupSelect />
          <DialogSorting />
          <DialogList />
        </Sider>

        <Layout style={{ background: '#fff' }}>
          <DialogHeader
            isDialogsCollapsed={this.state.isDialogsCollapsed}
            toggleDialogs={this.toggleDialogs}
          />
          <Divider
            type="horizontal"
            style={{ margin: '5px auto', width: '97%' }}
          />
          <DialogContent />
          <DialogInput />
        </Layout>
      </Fragment>
    );
  }
}

export default Dialogs;
