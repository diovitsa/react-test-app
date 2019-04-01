import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { LoginPageStyles } from './styles';
import LoginForm from './LogInForm/LogInForm';
import { DataService } from '../../services/data/DataService';

class LogInPage extends React.Component {

  signIn = (email, password) => {
    return DataService.signIn(email, password)
      .then(() => {
        if (this.erorMessage) this.erorMessage.removeAttribute('style');
        this.props.history.push('/list');
      })
      .catch(() => {
        this.erorMessage = document.querySelector('#errorMessage');
        this.erorMessage.setAttribute('style', 'display: block');
      });
  };

  render() {
    const { root, header, wrongCreds } = this.props.classes;
    return (
      <div className={root}>
        <p className={header}> Welcome to my test app </p>
        <LoginForm onSignIn={this.signIn}/>
        <p id='errorMessage' className={wrongCreds}> Email or password is incorrect </p>
      </div>
    );
  }
}

export default withStyles(LoginPageStyles)(LogInPage);
