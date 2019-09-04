import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

// UTILITIES
import moment from "moment/moment";
import _ from 'lodash';

// MATERIAL-UI
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import List, {
  ListItemAvatar,
  ListItem,
  ListItemIcon,
  ListItemText,
} from 'material-ui/List';
import {withStyles} from "material-ui/styles/index";

const styles = theme => ({
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
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: '190px',
  }
});

const lastBookmarkItems = bookmark => {
  return (
    <Link to={bookmark.path} key={bookmark.id}>
      <ListItem button divider>
        <ListItemIcon>
          <i className="fas fa-link"></i>
        </ListItemIcon>
        <ListItemText
          primary={bookmark.primaryApplicant}
          secondary={moment(bookmark.created).format("MMM DD, YYYY hh:MM a")}
        />
      </ListItem>
    </Link>
  )
};

const mostVisitedBookmarkItems = bookmark => {
  return (
    <Link to={bookmark.path} key={bookmark.id}>
      <ListItem button divider>
        <ListItemAvatar>
          <Avatar>
            {bookmark.count}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={bookmark.primaryApplicant} />
      </ListItem>
    </Link>
  )
};

class AppBookmarks extends Component {

  state = {
    value: 0,
  };

  getLastBookmarks() {
    const { bookmarks, maxCount } = this.props;
    return _.sortBy(bookmarks, 'id')
      .reverse()
      .slice(0, maxCount)
      .map(lastBookmarkItems);
  }

  getMostVisited() {
    const { bookmarks, maxCount } = this.props;
    const groups = _.groupBy(bookmarks, 'appId');
    const mostVisited = Object.keys(groups).map(function(id){
      let application = groups[id];
      return {
        count: application.length,
        ...application[0]
      }
    });

    return _.sortBy(mostVisited, 'count')
      .reverse()
      .slice(0, maxCount)
      .map(mostVisitedBookmarkItems);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { bookmarks, classes, maxCount, theme } = this.props;
    const { value } = this.state;

    return (bookmarks.length <= 0) ? (
      <CardContent>
        <Typography className={classes.cardHeading}>
          <i className="fas fa-bookmark" />&nbsp;
          Bookmarked Applications
        </Typography>
        <Typography className={classes.cardSubHeading}>
          No Bookmarks Available
        </Typography>
      </CardContent>
    ) : (
      <CardContent>
        <Typography className={classes.cardHeading}>
          <i className="fas fa-bookmark" />&nbsp;
          Bookmarked Applications
        </Typography>

        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label={`Last ${maxCount}`} />
          <Tab label={`Most Viewed`} />
        </Tabs>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <List dir={theme.direction} className={classes.root} dense={true}>{this.getLastBookmarks()}</List>
          <List dir={theme.direction} className={classes.root} dense={true}>{this.getMostVisited()}</List>
        </SwipeableViews>

      </CardContent>
    )
  }
}

export default  withStyles(styles, { withTheme: true })(AppBookmarks);