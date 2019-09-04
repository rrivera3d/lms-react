import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Page from '../../common/Page';
import ClientCard from '../ClientCard';
import Record from '../../common/Record';

// MATERIAL-UI
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Divider from 'material-ui/Divider';
import Tabs, { Tab } from 'material-ui/Tabs';
import Badge from 'material-ui/Badge';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { FormControl } from 'material-ui/Form';

const styles = theme => ({

  root: {
    marginBottom: 16,
  },
  expanded: {
    minHeight: 48,
  },
  contentExpanded: {
    margin: "12px 0",
  },
  summary: {
    flexGrow: 1,
    padding: "0 12px",
  },
  heading: {
    fontWeight: 'bold',
    flexShrink: 0,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  action: {
    padding: "0 8px",
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  card: {
    minHeight: 240
  },
  recordTab: {
    minWidth: 'auto',
    paddingRight: 16,
    textTransform: "none",
  },
  recordBadge: {
    fontSize: 12,
    height: 18,
    width: 18,
    top: 0,
    left: "calc(100% + 5px)",
  }

});

class Application extends Component {

  state = {
    currentTab: 0,
    tabs: ['loan', 'documents', 'notes', 'emails'],
    isRecordExpanded: false,
    dialogOpen: false,
    note: '',
  }

  componentDidCatch(error, errorInfo) {
    console.log('>>> error', error, errorInfo);
  }

  componentDidUpdate() {
    this.resolveRecordTabs();
  }

  componentDidMount() {
    this.props.requestApplication({id: this.props.match.params.id});
  }

  addItemToRecord = event => {
    const id = event.currentTarget.id;
    const tab = this.state.tabs[id];
    console.log(`Add record item in '${tab}'`);

    this.setState({
      dialogOpen: true
    });
  };

  handleAddNote = () => {
    alert(`Quick note added by ${this.props.session.firstName}: ${this.state.note}`);
    this.setState({note: ''});
  };

  handleUpdateNote = event => {
    this.setState({note: event.currentTarget.value});
  };

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    });
  };

  handleFilterChange = () => {
    console.log("Record filter changed");
  };

  isTabValid = (tab) => {
    if (tab === 'loan') {
      return true;
    }
    const { application } = this.props;
    return application.hasOwnProperty(tab) && application[tab].length > 0;
  };

  resolveRecordTabs = () => {

    const { currentTab, tabs } = this.state;

    // if tab is not valid, find the next valid tab and setState to the valid tab
    if (!this.isTabValid(tabs[currentTab])) {
      for (let i=0, I=tabs.length; i<I; i++) {
        if (this.isTabValid(tabs[i])) {
          this.setState({currentTab: i});
          break;
        }
      }
    }
  };

  handleChange = (event, currentTab) => {
    this.setState({ currentTab });
  };

  toggleRecord = () => {
    this.setState({
      isRecordExpanded: !this.state.isRecordExpanded
    });
  };

  render() {

    const { classes, application } = this.props;
    const { currentTab, isRecordExpanded, tabs, note } = this.state;
    const {
      clients=[],
      notes=[],
      emails=[],
      documents=[],
    } = application;

    return (
      <Page
        backLabel="Applications"
        backLink="/applications"
        isRecordExpanded={isRecordExpanded}
      >
        <Slide in={true} direction="left" mountOnEnter unmountOnExit>
          <div>
            <Grid container spacing={16}>
              <Grid className="hide-on-expand" item xs={4}>

                <ExpansionPanel className={classes.root}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    className={classes.summary}
                    classes={{
                      expanded: classes.expanded,
                      contentExpanded: classes.contentExpanded
                    }}>
                    <Typography className={classes.heading}><i className="fas fa-filter" /> Application: {application.status}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    <Divider />
                    <Typography>Application History</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>

                { clients.map(client => <ClientCard client={client} key={client.id} />) }

              </Grid>
              <Grid item xs={isRecordExpanded ? 12 : 8}>

                <div className="hide-on-expand">
                  <ExpansionPanel className={classes.root}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      className={classes.summary}
                      classes={{
                        expanded: classes.expanded,
                        contentExpanded: classes.contentExpanded
                      }}>
                      <Typography className={classes.heading}>
                        <span className={classes.action}><i className="fas fa-file-alt" /> Add a quick note</span>
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                      <FormControl fullWidth>
                        <TextField
                          id="quickNote"
                          onChange={this.handleUpdateNote}
                          value={note}
                          multiline
                          rowsMax="4"
                          className={classes.textField}
                          margin="normal"
                          fullWidth
                        />
                        <div>
                          <Button variant="raised" color="primary" className={classes.button} onClick={this.handleAddNote}>OK</Button>
                        </div>
                      </FormControl>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>

                <div className="record">
                  <Tabs
                    value={currentTab}
                    onChange={this.handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    scrollable
                    scrollButtons="on"
                    fullWidth={false}
                  >
                    <Tab className={classes.recordTab} label={"Loan"} />
                    <Tab className={classes.recordTab} label={
                      <Badge
                        classes={{badge: classes.recordBadge}}
                        badgeContent={documents.length > 0 ? documents.length : ""}
                        color={documents.length > 0 ? "secondary" : "default"}>
                        Documents
                      </Badge>
                    } disabled={documents.length < 1} />
                    <Tab className={classes.recordTab} label={
                      <Badge
                        classes={{badge: classes.recordBadge}}
                        badgeContent={notes.length > 0 ? notes.length : ""}
                        color={notes.length > 0 ? "secondary" : "default"}>
                        Notes
                      </Badge>
                    } disabled={notes.length < 1} />
                    <Tab className={classes.recordTab} label={
                      <Badge
                        classes={{badge: classes.recordBadge}}
                        badgeContent={emails.length > 0 ? emails.length : ""}
                        color={emails.length > 0 ? "secondary" : "default"}>
                        Emails
                      </Badge>
                    } disabled={emails.length < 1} />
                  </Tabs>
                  <Card className={classes.card}>
                    <CardContent>

                      <Record
                        currentTab={currentTab}
                        toggleRecord={this.toggleRecord}
                        isRecordExpanded={isRecordExpanded}
                        handleFilterChange={this.handleFilterChange}
                        addItem={this.addItemToRecord.bind(this)}>

                        { currentTab === 0 && <div>

                          <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>Credit scores</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>Cash flow</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel disabled>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>Risk assessment</Typography>
                            </ExpansionPanelSummary>
                          </ExpansionPanel>

                          <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>Loan request</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>Loan assessment</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>Funding</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                        </div> }
                        { currentTab === 1 && <div>Documents</div> }
                        { currentTab === 2 && <div>Notes</div> }
                        { currentTab === 3 && <div>Emails</div> }

                      </Record>

                    </CardContent>
                  </Card>
                </div>

              </Grid>
            </Grid>
          </div>
        </Slide>

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{`Add a record to ${tabs[currentTab]}`}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new item, please enter item here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="New Record"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Add item
            </Button>
            <Button onClick={this.handleDialogClose} color="default">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

      </Page>
    )
  }

}

Application.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Application);