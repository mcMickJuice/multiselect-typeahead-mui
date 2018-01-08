import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import DropdownList from '../DropdownList'
import styles from './styles'

export class TypeaheadSelect extends Component {
  constructor() {
    super()
  }

  onSelect = itemToSelect => {
    const { onSelected, entityKey, selected } = this.props

    const itemToSelectId = itemToSelect[entityKey]

    if (itemToSelectId === selected) {
      //clear selected
      onSelected('')
    } else {
      onSelected(itemToSelect[entityKey])
    }
    this.input.focus()
  }

  //For some reason...selected Item can be object or string...
  itemToString = selectedItem => {
    const { displayKey, entityKey, items } = this.props

    let itemForDisplay
    if (typeof selectedItem === 'string' || typeof selectedItem === 'number') {
      itemForDisplay = items.find(item => item[entityKey] === selectedItem)
    } else {
      itemForDisplay = items.find(i => i[entityKey] === selectedItem[entityKey])
    }

    const toReturn = itemForDisplay == null ? '' : itemForDisplay[displayKey]

    return toReturn
  }

  render() {
    const {
      classes,
      items,
      ItemComponent,
      filter,
      selected,
      label,
      entityKey
    } = this.props

    return (
      <Downshift
        onSelect={this.onSelect}
        selectedItem={selected || ''}
        itemToString={this.itemToString}
        defaultHighlightedIndex={0}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex
        }) => {
          return (
            <div className={classes.root}>
              <TextField
                inputRef={input => (this.input = input)}
                {...getInputProps({
                  label,
                  fullWidth: true,
                  InputProps: {
                    classes: {
                      input: classes.input
                    }
                  }
                })}
              />

              <div className={classes.listContainer}>
                {!isOpen ? null : (
                  <DropdownList
                    data-test-id="dropdown-list"
                    inputElement={this.input}
                  >
                    {items
                      .filter(item => filter(item, inputValue))
                      .map((item, index) => {
                        const isSelected =
                          selected != '' && selected === item[entityKey]

                        const isHighlighted = index === highlightedIndex
                        return (
                          <ItemComponent
                            item={item}
                            isSelected={isSelected}
                            key={item[entityKey]}
                            isHighlighted={isHighlighted}
                            {...getItemProps({
                              item
                            })}
                          />
                        )
                      })}
                  </DropdownList>
                )}
              </div>
            </div>
          )
        }}
      </Downshift>
    )
  }
}

TypeaheadSelect.propTypes = {
  items: PropTypes.array.isRequired,
  displayKey: PropTypes.string.isRequired,
  entityKey: PropTypes.string.isRequired,
  onSelected: PropTypes.func.isRequired,
  ItemComponent: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.object
}

TypeaheadSelect.defaultProps = {
  classes: {}
}

export default withStyles(styles)(TypeaheadSelect)
