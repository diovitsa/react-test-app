import React from 'react';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import PropTypes from 'prop-types';
import { GridAction } from './grid-action.entity';
import { ContextMenuBtn } from './partials';

export class GridRowContextMenu extends React.Component {

  static propTypes = {
    rowData: PropTypes.object,
    actions: PropTypes.arrayOf(PropTypes.instanceOf(GridAction)).isRequired,
    onAction: PropTypes.func,
  };

  state = {
    opened: false,
    target: null,
  };

  openMenu = ({ currentTarget }) => {
    this.setState({
      opened: true,
      target: currentTarget,
    });
  };

  closeMenu = () => {
    this.setState({
      opened: false,
      target: null,
    });
  };

  onActionClick(action) {
    this.props.onAction(action, this.props.rowData);
    this.closeMenu();
  }

  render() {
    const menuBtn = this.props.actions.length
      ? <ContextMenuBtn className="grid-context-btn" onClick={this.openMenu}/>
      : null;

    return (
      <div>
        {menuBtn}

        <Menu anchorEl={this.state.target}
              open={this.state.opened}
              onClose={this.closeMenu}>
          {this.props.actions.map(action => {
            return (
              <MenuItem key={action.id} onClick={this.onActionClick.bind(this, action)}>
                {action.title}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  }
}
