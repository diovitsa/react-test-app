import React from 'react';
import { Grid } from './Grid/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { ListOfUsersStyles, ButtonStyles } from './styles';
import { GridAction } from './Grid/grid-action.entity';
import AddForm from './AddUserForm/AddForm';
import { DataService } from '../../services/data/DataService';
import Button from '@material-ui/core/Button/index';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../../actions/users';

const CustomizedButton = withStyles(ButtonStyles)(Button);

class ListOfUsers extends React.Component {

  actions = [new GridAction('delete', 'Delete user', (e) => this.props.onDeleteUser(e))];

  componentWillMount() {
    return this.props.loadUsers();
  }

  triggerAction = (action, item) => {
    action.execute(item);
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
          <AddForm />
          <CustomizedButton onClick={() => this.logOut()} variant="contained" color="secondary">Log Out</CustomizedButton>
        </div>
        <Grid data={this.props.users}
              actions={this.actions}
              onAction={this.triggerAction}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    users: state.users
  }),
  dispatch => ({
    loadUsers: () => {
      dispatch(getUsers());
    },
    onDeleteUser: ({ _id }) => {
      dispatch(deleteUser(_id));
    }
  })
)(withStyles(ListOfUsersStyles)(ListOfUsers));
