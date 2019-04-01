import './grid.sass';
import React from 'react';
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { GridAction } from './grid-action.entity';
import { Column } from 'primereact/column';
import { GridRowContextMenu } from './GridRowContextMenu';


export class Grid extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    actions: PropTypes.arrayOf(PropTypes.instanceOf(GridAction)),
    onAction: PropTypes.func,
  };

  static defaultProps = {
    actions: [],
    selectedItems: [],
  };

  columnOptions = {
    actionsColumn: {
      headerStyle: { width: '60px', textAlign: 'center' },
      style: { textAlign: 'center' },
      sortable: false
    }
  };

  render() {
    const { data, actions, onAction } = this.props;
    return (
      <DataTable value={data}>
        <Column key='name' field='name' header='name'/>
        <Column key='email' field='email' header='email'/>
        <Column key='password' field='password' header='password'/>
        <Column
          key="actionsColumn"
          body={data => getActionCellTemplate(data, { actions, onAction })}
          className="grid-context-menu-column"
          {...this.columnOptions['actionsColumn']}/>
      </DataTable>
    );
  }
}

function getActionCellTemplate(rowData, props) {
  return (
    <GridRowContextMenu {...props} rowData={rowData}></GridRowContextMenu>
  );
}
