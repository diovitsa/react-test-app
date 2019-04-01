import React from 'react';
import { AddFormStyles } from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import { ButtonStyles } from './styles';
import Button from '@material-ui/core/Button/index';

const CustomizedButton = withStyles(ButtonStyles)(Button);


class AddForm extends React.Component {

  state = {
    userName: '',
    userEmail: '',
    password: '',
  };

  componentDidMount() {
    document.addEventListener('keydown', this.keydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydown, false);
  }

  keydown = (e) => {
    if (e.key === 'Enter' && (e.target === this.nameInput || e.target === this.emailInput || e.target === this.passwordInput)) {
      this.addUser();
    }
  };

  nameInputHandler(e) {
    this.nameInput = e.target;
    this.setState({ userName: e.target.value });
  };

  emailInputHandler(e) {
    this.emailInput = e.target;
    this.setState({ userEmail: e.target.value });
  };

  passwordInputHandler(e) {
    this.passwordInput = e.target;
    this.setState({ password: e.target.value });
  }

  clearInputValues() {
    if (this.nameInput && this.emailInput && this.passwordInput) {
      this.nameInput.value = '';
      this.emailInput.value = '';
      this.passwordInput.value = '';
    }
  }

  addUser() {
    const { userName, userEmail, password } = this.state;

    this.clearInputValues();
    this.props.onUserAdd({ 'password': password, 'email': userEmail, 'name': userName });
  }

  render() {
    const { root, input } = this.props.classes;
    return (
      <div className={root}>
        <TextField className={input} label='Name' type="text" onChange={(e) => this.nameInputHandler(e)}/>
        <TextField className={input} label="Email" type="text" onChange={(e) => this.emailInputHandler(e)}/>
        <TextField className={input} label="Password" type="password" onChange={(e) => this.passwordInputHandler(e)}/>
        <CustomizedButton onClick={() => this.addUser()} variant="contained" color="primary">Add user</CustomizedButton>
      </div>
    );
  }
}

export default withStyles(AddFormStyles)(AddForm);