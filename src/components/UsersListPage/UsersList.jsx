import React from 'react';
import { Grid } from './Grid/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { ListOfUsersStyles, ButtonStyles } from './styles';
import { GridAction } from './Grid/grid-action.entity';
import AddForm from './AddUserForm/AddForm';
import { DataService } from '../../services/data/DataService';
import Button from '@material-ui/core/Button/index';

const CustomizedButton = withStyles(ButtonStyles)(Button);

class ListOfUsers extends React.Component {
  state = {
    users: []
  };

  actions = [new GridAction('delete', 'Delete user', (e) => this.deleteUser(e))];

  loadData = () => {
    return DataService.getUsersList()
      .then(users => {
        this.setState({ users: users });
      })
      .catch(() => this.props.history.push('/'));
  };

  componentWillMount() {
    this.loadData();
  }

  triggerAction = (action, item) => {
    action.execute(item);
  };

  deleteUser({ _id }) {
    return DataService.deleteUser(_id).then(() => this.loadData());
  }

  addUser = (formData) => {
    return DataService.addUser(formData).then(() => this.loadData());
  };

  logOut = () => {
    this.props.history.push('/');
    DataService.resetSession();
  };

  render() {
    const { root, upperBlock } = this.props.classes;
    return (
      <div className={root}>
        <div className={upperBlock}>
          <AddForm onUserAdd={this.addUser}/>
          <CustomizedButton onClick={() => this.logOut()} variant="contained" color="secondary">Log
            Out</CustomizedButton>
        </div>
        <Grid data={this.state.users}
              actions={this.actions}
              onAction={this.triggerAction}/>
      </div>
    );
  }
}

export default withStyles(ListOfUsersStyles)(ListOfUsers);
