import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from 'material-ui/List'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

const maxHeight = 300
const marginTop = 10
const marginBottom = 20

const calculateListPlacement = (inputRect, viewPortHeight) => {
  console.log(inputRect)
  const { left, bottom, top } = inputRect

  if (bottom + maxHeight < viewPortHeight) {
    //we're gonna go passed the viewport
    return {
      left,
      top: bottom + marginTop,
      bottom: undefined
    }
  }

  //place list right above input
  return {
    left,
    bottom: viewPortHeight - top + marginBottom,
    top: undefined
  }
}

export class DropdownList extends Component {
  constructor() {
    super()

    this.state = {
      top: undefined,
      left: undefined
    }
  }

  componentDidMount() {
    const body = document.querySelector('body')
    body.style.overflowY = 'hidden'
    const rect = this.props.inputElement.getBoundingClientRect()
    const viewPortHeight = window.innerHeight

    const { left, top, bottom } = calculateListPlacement(rect, viewPortHeight)

    this.setState({
      left,
      top,
      bottom
    })
  }

  componentWillUnmount() {
    const body = document.querySelector('body')
    body.style.overflowY = ''
  }

  computeDropdownPosition() {
    const { top, left, bottom } = this.state
    if (left == null) return {}

    return {
      top,
      left,
      bottom
    }
  }

  render() {
    const { children, classes } = this.props
    const styles = this.computeDropdownPosition()

    return (
      <Paper classes={{ root: classes.root }} style={styles}>
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
  inputElement: PropTypes.object.isRequired
}

DropdownList.defaultProps = {
  classes: {}
}

export default withStyles(styles)(DropdownList)
