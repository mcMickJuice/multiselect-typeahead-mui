import React, { Component } from 'react'
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List'
import Downshift from 'downshift'
import { AddCircle, Close } from 'material-ui-icons'
import IconButton from 'material-ui/IconButton'

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


export default SelectedItemsDropdown
