import React from 'react';
import { AddFormStyles } from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import { ButtonStyles } from './styles';
import Button from '@material-ui/core/Button/index';
import { connect } from 'react-redux';
import { addUser } from '../../../actions/users';
import { updateUserForm } from '../../../actions/addUserForm';

const CustomizedButton = withStyles(ButtonStyles)(Button);


class AddForm extends React.Component {

  state = {
    addUserForm: {
      name: '',
      email: '',
      password: '',
    }
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

  inputHandler(e) {
    this[e.target.id] = e.target;
    this.props.onFormUpdate({ value: e.target.value, id: [e.target.id] });
  };

  clearInputValues() {
    if (this.name && this.email && this.password) {
      this.name.value = '';
      this.email.value = '';
      this.password.value = '';
    }
  }

  addUser() {
    const { name, email, password } = this.props.addUserForm;

    this.clearInputValues();
    this.props.onUserAdd({ 'password': password, 'email': email, 'name': name });
  }

  render() {
    const { root, input } = this.props.classes;
    return (
      <div className={root}>
        <TextField className={input} id='name' label='Name' type="text" onChange={(e) => this.inputHandler(e)}/>
        <TextField className={input} id='email' label="Email" type="text" onChange={(e) => this.inputHandler(e)}/>
        <TextField className={input} id='password' label="Password" type="password" onChange={(e) => this.inputHandler(e)}/>
        <CustomizedButton onClick={() => this.addUser()} variant="contained" color="primary">Add user</CustomizedButton>
      </div>
    );
  }
}

export default connect(
  state => ({
    users: state.users,
    addUserForm: state.addUserForm
  }),
  dispatch => ({
    onUserAdd: (newUser) => {
      dispatch(addUser(newUser));
    },
    onFormUpdate: (updatedInput) => {
      dispatch(updateUserForm(updatedInput));
    }
  })
)(withStyles(AddFormStyles)(AddForm));