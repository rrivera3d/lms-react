import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import accounting from 'accounting';

// MATERIAL-UI
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Fade from 'material-ui/transitions/Fade';

import Page from '../../common/Page';

// REACT-GRID
import {
  FilteringState,
  IntegratedFiltering,
  SortingState,
  IntegratedSorting,
  TableColumnResizing,
  PagingState,
  IntegratedPaging,
  DataTypeProvider,
  SelectionState,
} from '@devexpress/dx-react-grid';

// REACT-GRID-MATERIAL-UI
import { 
  Grid as DataGrid, 
  ColumnChooser,
  DragDropProvider,
  TableColumnReordering,
  Table, 
  TableHeaderRow,
  TableFilterRow,
  PagingPanel,
  TableSelection,
  TableColumnVisibility,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';

const CurrencyFormatter = ({ value }) => {
  let amount = accounting.formatMoney(value, "$", 2);
  return (
    <span style={{ color: (value > 10000) ? 'red' : 'black' }}>
      {amount}
    </span>
  )
};

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatter}
    {...props}
  />
);

const DateFormatter = ({ value }) =>
  moment(value).format("MMM DD, YYYY hh:mm a");

const DateTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={DateFormatter}
    {...props}
  />
);

// STYLES
const styles = theme => ({
  root: {
    width: 'auto'
  },
  button: {
    marginLeft: theme.spacing.unit,
  }
});

class Applications extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      columnOrder: [
        'fullName',
        'region',
        'loanAmount',
        'status',
        'referralAgent',
        'updatedAt',
        'actions'
      ],
      columns: [
        { name: 'fullName', title: 'Primary Applicant' },
        { name: 'region', title: 'Region' },
        { name: 'loanAmount', title: 'Loan Amount' },
        { name: 'status', title: 'Status' },
        { name: 'referralAgent', title: 'Referrer' },
        { name: 'updatedAt', title: 'Updated on' },
        { name: 'actions', title: 'Actions' }
      ],
      columnWidths: [
        { columnName: 'fullName', width: 180 },
        { columnName: 'region', width: 160 },
        { columnName: 'loanAmount', width: 120 },
        { columnName: 'status', width: 160 },
        { columnName: 'referralAgent', width: 160 },
        { columnName: 'updatedAt', width: 180 },
        { columnName: 'actions', width: 300 },
      ],
      currencyColumns: ['loanAmount'],
      currentPage: 0,
      dateColumns: ['updatedAt'],
      actionsColumns: ['actions'],
      filters: [
        { columnName: 'region', value: 'British Columbia' }
      ],
      hiddenColumnNames: ['referralAgent'],
      pageSize: 10,
      pageSizes: [10, 25, 50, 100],
      selection: [],
      sorting: [
        { columnName: 'fullName', direction: 'asc' }
      ],
    };
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    this.props.requestApplications();
  }

  approveApplication(id) {
    this.props.approveApplication(id)
  }

  declineApplication(id) {
    this.props.declineApplication(id)
  }

  changeSorting = sorting => {
    this.setState({ sorting });
  };

  changeColumnWidths = columnWidths => {
    this.setState({ columnWidths });
  };

  changeFilters = filters => {
    this.setState({ filters });
  };

  changeSelection = selection => {
    this.setState({ selection });
  };

  hiddenColumnNamesChange = hiddenColumnNames => {
    this.setState({ hiddenColumnNames });
  };

  changePageSize = (pageSize) => {
    this.setState({ pageSize });
  };

  ActionsFormatter = ({ value }) => {
    const { classes } = this.props;
    const id = value.id;
    return (
      <Fragment>
        <Button
          variant="raised"
          className={classes.button}
          onClick={ () => this.props.history.push(`/applications/${id}`) }
        >View</Button>
        <Button
          color="primary"
          className={classes.button}
          onClick={ () => this.approveApplication(id) }
        >Approve</Button>
      </Fragment>
    )
  };

  TableRow = ({ row, ...restProps }) => {
    return (
      <Table.Row
        {...restProps}
        style={{ cursor: 'pointer' }}
      />
    )
  };

  FilterCell = (props) => {
    if (props.column.name === 'actions') {
      return (<th style={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}></th>);
    }
    return <TableFilterRow.Cell {...props} />;
  };


  render() {

    const {
      columnOrder,
      columns, 
      columnWidths,
      currencyColumns, 
      currentPage,
      dateColumns,
      actionsColumns,
      filters, 
      hiddenColumnNames,
      pageSize,
      selection, 
      sorting,
      pageSizes,
    } = this.state;

    const ActionsTypeProvider = props => (
      <DataTypeProvider
        formatterComponent={this.ActionsFormatter}
        {...props}
      />
    );

    return (
      <Page>
        <div>
          <Fade in={true}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Paper>
                  <DataGrid
                    rows={this.props.applications.results}
                    columns={columns}>

                    <FilteringState
                      filters={filters}
                      onFiltersChange={this.changeFilters}
                    />
                    <IntegratedFiltering />

                    <SortingState
                      sorting={sorting}
                      onSortingChange={this.changeSorting}
                    />
                    <IntegratedSorting />

                    <PagingState
                      defaultCurrentPage={currentPage}
                      pageSize={pageSize}
                      onPageSizeChange={this.changePageSize}
                    />
                    <IntegratedPaging />

                    <CurrencyTypeProvider for={currencyColumns} />
                    <DateTypeProvider for={dateColumns} />
                    <ActionsTypeProvider for={actionsColumns} />
                    <DragDropProvider />

                    {/*<SelectionState*/}
                    {/*selection={selection}*/}
                    {/*onSelectionChange={this.changeSelection}*/}
                    {/*/>*/}

                    <Table rowComponent={this.TableRow} />

                    {/*<TableSelection selectByRowClick highlightRow />*/}
                    <TableColumnReordering defaultOrder={columnOrder} />
                    <TableColumnResizing
                      columnWidths={columnWidths}
                      onColumnWidthsChange={this.changeColumnWidths}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableFilterRow cellComponent={this.FilterCell} />

                    <TableColumnVisibility
                      hiddenColumnNames={hiddenColumnNames}
                      onHiddenColumnNamesChange={this.hiddenColumnNamesChange}
                    />

                    <Toolbar />
                    <ColumnChooser />
                    <PagingPanel pageSizes={pageSizes} />

                  </DataGrid>
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        </div>
      </Page>
    )
  }

}

Applications.propTypes = {
  classes: PropTypes.object.isRequired,
  applications: PropTypes.shape({
    fullName: PropTypes.string,
  }),
  requestApplications: PropTypes.func.isRequired,
};

export default withStyles(styles)(Applications);