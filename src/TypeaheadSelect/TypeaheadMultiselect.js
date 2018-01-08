import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import DropdownList from '../DropdownList'
import styles from './styles'

const itemToString = () => ''

export class TypeaheadMultiselect extends Component {
  constructor() {
    super()

    this.state = {
      isInputFocused: false
    }
  }

  onSelect = selectedItem => {
    const { selectedIds, onSelected, entityKey } = this.props
    let newSelectedIds
    if (selectedIds.indexOf(selectedItem[entityKey]) > -1) {
      newSelectedIds = selectedIds.filter(id => id !== selectedItem[entityKey])
    } else {
      newSelectedIds = [...selectedIds, selectedItem[entityKey]]
    }

    onSelected(newSelectedIds)
    this.input.focus()
  }

  onInputFocus = () => {
    this.setState({
      isInputFocused: true
    })
  }

  onInputBlur = () => {
    this.setState({
      isInputFocused: false
    })
  }

  render() {
    const {
      classes,
      items,
      ItemComponent,
      filter,
      selectedIds,
      label,
      entityKey
    } = this.props
    const { isInputFocused } = this.state

    return (
      <Downshift
        onSelect={this.onSelect}
        itemToString={itemToString}
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
              <div className={classes.inputContainer}>
                <TextField
                  inputRef={input => (this.input = input)}
                  InputLabelProps={{
                    shrink: isInputFocused || selectedIds.length > 0
                  }}
                  {...getInputProps({
                    placeholder: `${selectedIds.length} Selected`,
                    onBlur: this.onInputBlur,
                    onFocus: this.onInputFocus,
                    fullWidth: true,
                    label,
                    InputProps: {
                      classes: {
                        input: classes.input
                      }
                    }
                  }) }
                />
              </div>
              <div className={classes.listContainer}>
                {!isOpen ? null : (
                  <DropdownList data-test-id="dropdown-list">
                    {items
                      .filter(item => filter(item, inputValue))
                      .map((item, index) => {
                        const isSelected =
                          selectedIds.indexOf(item[entityKey]) > -1
                        const isHighlighted = index === highlightedIndex
                        return (
                          <ItemComponent
                            item={item}
                            isSelected={isSelected}
                            key={item[entityKey]}
                            isHighlighted={isHighlighted}
                            {...getItemProps({
                              item
                            }) }
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

TypeaheadMultiselect.propTypes = {
  items: PropTypes.array.isRequired,
  entityKey: PropTypes.string.isRequired,
  selectedIds: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  onSelected: PropTypes.func.isRequired,
  ItemComponent: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.object
}

TypeaheadMultiselect.defaultProps = {
  classes: {}
}

export default withStyles(styles)(TypeaheadMultiselect)
