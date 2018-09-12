import React, { Component } from 'react';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import './DialogInput.css';
import { addMessage } from '../../ac';

const { TextArea } = Input;

const mapStateToProps = state => ({
  isDialogSelected: !!state.activeDialog
});

class DialogInput extends Component {
  state = {
    errors: {},
    userText: ''
  };

  componentDidMount() {
    this.validate();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addMessage(this.state.userText);
  };

  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value,
        errors: {}
      },
      () => this.validate()
    );
  };

  validate = () => {
    if (!this.state.userText) {
      this.setState({
        errors: {
          ...this.state.errors,
          userText: 'необходимо ввести сообщение'
        }
      });
    }
  };

  render() {
    return (
      <form
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        className="dialog-input"
      >
        <TextArea
          rows={4}
          name="userText"
          placeholder="Введите сообщение..."
          className="dialog-input__textarea"
          style={{
            boxShadow: 'none'
          }}
        />
        <Button
          type="primary"
          htmlType="submit"
          disabled={
            !this.props.isDialogSelected ||
            !!Object.keys(this.state.errors).length
          }
          className="dialog-input__btn"
          style={{ width: 130, position: 'absolute', right: 10, bottom: 10 }}
        >
          Отправить
        </Button>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  { addMessage }
)(DialogInput);
