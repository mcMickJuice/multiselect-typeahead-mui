import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from 'material-ui/List'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

export class DropdownList extends Component {
  componentDidMount() {
    const body = document.querySelector('body')
    body.style.overflowY = 'hidden'
  }

  componentWillUnmount() {
    const body = document.querySelector('body')
    body.style.overflowY = ''
  }

  render() {
    const { children, classes } = this.props

    return (
      <Paper classes={{ root: classes.root }}>
        <List data-test-id="list" classes={{ root: classes.list }}>
          {children}
        </List>
      </Paper>
    )
  }
}

DropdownList.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object,
  inputElement: PropTypes.element.isRequired
}

DropdownList.defaultProps = {
  classes: {}
}

export default withStyles(styles)(DropdownList)
