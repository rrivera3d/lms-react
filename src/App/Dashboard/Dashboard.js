import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Page from '../../common/Page';
import { AppBookmarks } from '../../common/Bookmarks';

// MATERIAL-UI
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grow from 'material-ui/transitions/Grow';

const styles = theme => ({
  card: {
    height: 300,
    overflow: 'hidden'
  },
  cardHeading: {
    fontSize: '1rem',
    color: '#727572',
    lineHeight: '18px',
    fontWeight: 'bold'
  },
  cardSubHeading: {
    fontSize: '1rem',
    color: '#727572',
    lineHeight: '18px'
  },
  cardValue: {
    color: theme.palette.text.secondary,
    fontSize: 150,
    lineHeight: '1.4em'
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#999',
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: '100%',
  }
});

class Dashboard extends Component {

  state = { expanded: false };

  componentDidMount() {
    this.reload();
  }

  reload() {
    this.props.requestApplications();
  }

  render() {

    const { classes, applicationBookmarks, applications } = this.props;

    console.log(this.props);

    return (
      <Page>
        <Grow in={true}>
          <div className="flex-grid flex-grid-item-width360">

            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.cardHeading}>
                  <i className="fas fa-list" />&nbsp;
                  Application Repository
                </Typography>
                <Typography variant="subheading" gutterBottom={true}>Your queue:</Typography>
                <Typography className={classes.cardValue} align="center">
                  <Link to='/applications' className={classes.navLink}>{applications.results.length}</Link>
                </Typography>
              </CardContent>
            </Card>

            <Card className={classes.card}>
              <AppBookmarks maxCount={10} bookmarks={applicationBookmarks} />
            </Card>

            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.cardHeading}>
                  <i className="fas fa-certificate" />&nbsp;
                  Scorecard Repository
                </Typography>
                <Typography variant="subheading" gutterBottom={true}>Your queue:</Typography>
                <Typography className={classes.cardValue} align="center">8</Typography>
              </CardContent>
            </Card>

            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.cardHeading}>
                  <i className="fas fa-money-bill-alt" />&nbsp;
                  Loan Management System
                </Typography>
                <Typography variant="subheading" gutterBottom={true}>Your queue:</Typography>
                <Typography className={classes.cardValue} align="center">2</Typography>
              </CardContent>
            </Card>

          </div>
        </Grow>
      </Page>
    )
  }

}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);