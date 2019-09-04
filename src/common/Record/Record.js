import React, {Fragment} from 'react';
import PropTypes from "prop-types";

// MATERIAL-UI
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';

const styles = () => ({

  toolbar: {
    display: 'flex'
  },
  toolbarBtn: {
    fontSize: 14,
    height: 36,
    width: 36,
  },
  hidden: {
    display: "none"
  },
  sizer: {
    flexGrow: 1
  },
  filter: {
    fontSize: 'inherit',
    margin: "auto 10px auto 5px"
  },
  search: {
    fontSize: 'inherit',
    margin: "auto 5px"
  }

});

const RecordToggle = (props) => {
  const {isRecordExpanded, classes} = props;
  return (
    <Fragment>
      <span className={isRecordExpanded ? "" : ` ${classes.hidden}`}>
        <i className="fas fa-compress"></i>
      </span>
      <span className={isRecordExpanded ? ` ${classes.hidden}` : ""}>
        <i className="fas fa-external-link-square-alt"></i>
      </span>
    </Fragment>
  );
};

const Record = (props) => {
  const {
    children,
    classes,
    currentTab,
    toggleRecord,
    isRecordExpanded,
    handleFilterChange,
    addItem
  } = props;

  return (
    <Typography headlineMapping={{body1: 'div'}}>
      <div className={classes.toolbar}>
        <span className={classes.toolBarLeft}>
          <IconButton className={classes.toolbarBtn}>
            <i className="fas fa-filter"></i>
          </IconButton>
          <Select
            value='ALL'
            onChange={handleFilterChange}
            displayEmpty
            name="age"
            className={classes.filter}
          >
            <MenuItem value='ALL'>Show all</MenuItem>
          </Select>
          <IconButton className={classes.toolbarBtn}>
            <i className="fas fa-search"></i>
          </IconButton>
          <TextField
            id="search"
            type="search"
            placeholder="Search"
            className={classes.search}
          />
        </span>
        <span className={classes.sizer}></span>
        <span className={classes.toolBarRight}>
          <IconButton
            id={currentTab}
            className={classes.toolbarBtn}
            onClick={addItem}>
            <i className="fas fa-plus-circle"></i>
          </IconButton>Add new
          <IconButton
            className={classes.toolbarBtn}
            onClick={toggleRecord}>
            <RecordToggle
              classes={classes}
              isRecordExpanded={isRecordExpanded} />
          </IconButton>
          <IconButton
            className={classes.toolbarBtn}
            color="primary">
            <i className="fas fa-align-justify"></i>
          </IconButton>
          <IconButton
            className={classes.toolbarBtn}>
            <i className="fas fa-th-list"></i>
          </IconButton>
        </span>
      </div>
      <div className={classes.recordBody}>
        {children}
      </div>
    </Typography>
  );
};

Record.propTypes = {
  toggleRecord: PropTypes.func.isRequired,
  isRecordExpanded: PropTypes.bool.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
};

export default withStyles(styles)(Record);