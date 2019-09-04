import React from 'react';

// MATERIAL-UI
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

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
  clientSummary: {
    width: "100%"
  }

});

const ClientCard = props => {

  const { classes, client } = props;

  return (
    <ExpansionPanel className={classes.root}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.summary}
        classes={{
          expanded: classes.expanded,
          contentExpanded: classes.contentExpanded
        }}>
        <Typography className={classes.heading}><i className="fas fa-user" /> {[client.firstName, client.lastName].join(' ')}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <div className={classes.clientSummary}>
          <Divider />
          <Typography>applicant details</Typography>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(ClientCard);