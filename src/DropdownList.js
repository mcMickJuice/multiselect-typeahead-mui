import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "material-ui/List";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";

const styles = {
  root: {
    position: "fixed",
    minWidth: "400px",
    maxHeight: "300px",
    overflowY: "auto",
    marginTop: "10px"
  },
  list: {}
};

class DropdownList extends Component {
  componentDidMount() {
    const body = document.querySelector("body");
    body.style.overflowY = "hidden";
  }

  componentWillUnmount() {
    const body = document.querySelector("body");
    body.style.overflowY = "";
  }

  render() {
    const { children, classes } = this.props;

    return (
      <Paper classes={{ root: classes.root }}>
        <List classes={{ root: classes.list }}>{children}</List>
      </Paper>
    );
  }
}

DropdownList.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DropdownList);
