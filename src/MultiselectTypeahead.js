import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Downshift from 'downshift'
import { withStyles } from 'material-ui/styles'
import SelectedItemsDropdown from './SelectedItemsDropdown'

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
    backgroundColor: 'gray',
  },
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
    }, state => {
      if(this.state.selected.length === 0){
        this.input.focus()
      }
    })
  }

  onRemoveAllSelected = () => {
    this.setState({
      selected: [],
      isMenuOpen: false
    }, () => {
      this.input.focus()
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
                
                  <SelectedItemsDropdown
                    selected={selected}
                    isMenuOpen={isMenuOpen}
                    onRemoveAllItems={this.onRemoveAllSelected}
                    onRemoveItem={this.onRemoveSelected}
                    classes={classes}
                    disabled={!hasSelected}
                  />
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
                            divider
                            {...getItemProps({ item, key: item.id, classes: {
                              root: isSelected || index === highlightedIndex
                                    ? classes.selectedItem
                                    : ''
                            } })}
                          >
                            <ListItemText
                              primary={item.name}
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
