import React from 'react';
import { LogInFormStyles } from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import { ButtonStyles } from './styles';
import Button from '@material-ui/core/Button/index';

const CustomizedButton = withStyles(ButtonStyles)(Button);

class LogInForm extends React.Component {

  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    document.addEventListener('keydown', this.keydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydown, false);
  }

  keydown = (e) => {
    if (e.key === 'Enter' && (e.target === this.passwordInput || e.target === this.passwordInput)) {
      this.signIn();
    }
  };

  emailInputHandler(e) {
    this.emailInput = e.target;
    this.setState({ email: e.target.value });
  };

  passwordInputHandler(e) {
    this.passwordInput = e.target;
    this.setState({ password: e.target.value });
  };

  clearInputValues() {
    if (this.emailInput && this.passwordInput) {
      this.emailInput.value = '';
      this.passwordInput.value = '';
    }
  }

  signIn() {
    const { email, password } = this.state;

    this.clearInputValues();
    this.props.onSignIn(email, password);
  }

  render() {
    const { root } = this.props.classes;
    return (
      <div className={root}>
        <TextField label="Email" type="email" onChange={(e) => this.emailInputHandler(e)}/>
        <TextField label="Password" type="password" onChange={(e) => this.passwordInputHandler(e)}/>
        <CustomizedButton onClick={() => this.signIn()} variant="contained" color="primary"> Sign In</CustomizedButton>
      </div>
    );
  }
}

export default withStyles(LogInFormStyles)(LogInForm);