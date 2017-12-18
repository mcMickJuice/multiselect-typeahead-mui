import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List'
import Downshift from 'downshift'
import { withStyles } from 'material-ui/styles'
import { AddCircle, Close } from 'material-ui-icons'
import IconButton from 'material-ui/IconButton'

const items = [
  { id: 1, name: 'Bananas' },
  { id: 2, name: 'Apples' },
  { id: 3, name: 'Plantains' },
  { id: 4, name: 'Oranges' },
  { id: 5, name: 'Coconuts' },
  { id: 6, name: 'Zebra Mussels' }
]

const itemToString = () => ''

const styles = {
  inputContainer: {
    position: 'relative',
    display: 'inline-block'
  },
  listContainer: {
    width: '300px'
  },
  input: {
    paddingRight: `28px`
  },
  selectedToggle: {
    position: 'absolute',
    zIndex: 1000,
    bottom: 0,
    right: 0
  },
  selectedList: {
    display: 'absolute'
  },
  selectedItem: {
    fontWeight: 600
  }
}

const removeAllItem = {
  id: -1,
  name: 'Remove All Items'
}

class SelectedItemsDropdown extends Component {
  constructor() {
    super()

    this.state = {
      isMenuOpen: false
    }
  }

  onRemoveSelected = itemToRemove => {
    if (itemToRemove.id === -1) {
      this.props.onRemoveAllItems()
    } else {
      this.props.onRemoveItem(itemToRemove)
    }
  }

  onRemoveAllItems = () => {
    this.props.onRemoveAllItems()
  }

  openList = () => {
    this.setState(state => ({
      isMenuOpen: !state.isMenuOpen
    }))
  }

  handleKeyDown = ({ key }) => {
    console.log('key down', key)

    const { isMenuOpen } = this.state
    if (key === 'ArrowDown' && !isMenuOpen) {
      this.setState({
        isMenuOpen: true
      })
      return
    }

    if (key === 'Escape' && isMenuOpen) {
      this.setState({
        isMenuOpen: false
      })
    }
  }

  render() {
    const { isMenuOpen } = this.state
    const { classes, selected } = this.props
    const selectedWithItems = [removeAllItem, ...selected]
    return (
      <Downshift
        onChange={this.onRemoveSelected}
        onStateChange={this.onStateChange}
        selectedItem=""
        itemToString={() => ''}
        isOpen={isMenuOpen}
        onOuterClick={this.openList}
      >
        {({ getItemProps, getButtonProps, highlightedIndex }) => {
          return (
            <span onKeyDown={this.handleKeyDown}>
              <IconButton {...getButtonProps({ onClick: this.openList })}>
                <AddCircle />
              </IconButton>
              {!isMenuOpen ? null : (
                <List classes={{ root: classes.selectedList }}>
                  {selectedWithItems.map((item, index) => {
                    return (
                      <ListItem
                        divider
                        button
                        {...getItemProps({ item, key: item.id })}
                      >
                        <ListItemText
                          primary={item.name}
                          classes={{
                            text:
                              highlightedIndex === index
                                ? classes.selectedItem
                                : ''
                          }}
                        />
                        <ListItemIcon>
                          <Close
                            onClick={() => this.onRemoveSelected(item)}
                            key={item.id}
                          />
                        </ListItemIcon>
                      </ListItem>
                    )
                  })}
                </List>
              )}
            </span>
          )
        }}
      </Downshift>
    )
  }
}

class MultiselectTypeahead extends Component {
  constructor() {
    super()

    this.turnOffSelected = []

    this.state = {
      selected: [],
      isMenuOpen: true
    }
  }

  onChange = e => {
    const { selected } = this.state
    let newSelected
    if (selected.indexOf(e) > -1) {
      newSelected = selected.filter(s => s.id !== e.id)
    } else {
      newSelected = [...selected, e]
    }

    this.setState(
      {
        selected: newSelected
      },
      () => {
        this.input.focus()
      }
    )
  }

  onRemoveSelected = itemToRemove => {
    const { selected } = this.state
    const newSelected = selected.filter(item => item.id !== itemToRemove.id)

    this.setState({
      selected: newSelected,
      isMenuOpen: newSelected.length > 0
    })
  }

  onRemoveAllSelected = () => {
    this.setState({
      selected: [],
      isMenuOpen: false
    })
  }

  onMenuOpen = () => {
    this.setState(state => ({
      isMenuOpen: !state.isMenuOpen
    }))
  }

  render() {
    const { classes } = this.props
    const { selected, isMenuOpen } = this.state
    const hasSelected = selected.length > 0

    return (
      <Downshift
        onChange={this.onChange}
        onStateChange={this.onStateChange}
        itemToString={itemToString}
        selectedItem={this.turnOffSelected}
        defaultHighlightedIndex={0}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex
        }) => {
          return (
            <div className={classes.root}>
              <div className={classes.inputContainer}>
                <TextField
                  inputRef={input => (this.input = input)}
                  {...getInputProps({
                    placeholder: `${selected.length} Items Selected`,
                    InputProps: {
                      classes: {
                        input: classes.input
                      }
                    }
                  })}
                />
                {hasSelected ? (
                  <SelectedItemsDropdown
                    selected={selected}
                    isMenuOpen={isMenuOpen}
                    onRemoveAllItems={this.onRemoveAllSelected}
                    onRemoveItem={this.onRemoveSelected}
                    classes={classes}
                  />
                ) : null}
              </div>
              <div className={classes.listContainer}>
                {!isOpen ? null : (
                  <List>
                    {items
                      .filter(
                        i =>
                          i.name
                            .toLowerCase()
                            .indexOf(inputValue.toLowerCase()) > -1
                      )
                      .map((item, index) => {
                        const isSelected =
                          selected.map(s => s.id).indexOf(item.id) > -1

                        return (
                          <ListItem
                            button
                            divider
                            {...getItemProps({ item, key: item.id })}
                          >
                            <ListItemText
                              primary={item.name}
                              classes={{
                                text:
                                  isSelected || index === highlightedIndex
                                    ? classes.selectedItem
                                    : ''
                              }}
                            />
                          </ListItem>
                        )
                      })}
                  </List>
                )}
              </div>
            </div>
          )
        }}
      </Downshift>
    )
  }
}

export default withStyles(styles)(MultiselectTypeahead)
