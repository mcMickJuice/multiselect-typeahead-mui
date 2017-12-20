import React from "react";
import PropTypes from "prop-types";
import List, { ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";

const styles = {
  root: {},
  list: {}
};

const DropdownList = ({ children, classes }) => {
  return (
    <Paper classes={{ root: classes.root }}>
      <List classes={{ root: classes.list }}>{children}</List>
    </Paper>
  );
};

DropdownList.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DropdownList);
