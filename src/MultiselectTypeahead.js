import React, { Component } from "react";
import TextField from "material-ui/TextField";
import Check from "material-ui-icons/Check";
import Close from "material-ui-icons/Close";
import { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import Downshift from "downshift";
import { withStyles } from "material-ui/styles";
import SelectedItemsDropdown from "./SelectedItemsDropdown";
import DropdownList from "./DropdownList";
import PropTypes from "prop-types";

const itemToString = () => "";

const styles = {
  inputContainer: {
    position: "relative",
    display: "inline-block"
  },
  listContainer: {
    width: "300px"
  },
  input: {
    paddingRight: `28px`
  },
  selectedToggle: {
    position: "absolute",
    zIndex: 1000,
    bottom: 0,
    right: 0
  },
  selectedList: {
    display: "absolute"
  },
  selectedItem: {
    backgroundColor: "gray"
  }
};

const DefaultItemRenderer = ({ item, isSelected, isHighlighted, ...rest }) => {
  return (
    <ListItem divider button {...rest}>
      <ListItemText primary={item.name} />
      {(isSelected || isHighlighted) && (
        <ListItemIcon>
          {isSelected ? isHighlighted ? <Close /> : <Check /> : <Check />}
        </ListItemIcon>
      )}
    </ListItem>
  );
};

class MultiselectTypeahead extends Component {
  constructor() {
    super();

    this.turnOffSelected = [];

    this.state = {
      selected: [],
      isMenuOpen: true
    };
  }

  onChange = e => {
    const { selected } = this.state;
    let newSelected;
    if (selected.indexOf(e) > -1) {
      newSelected = selected.filter(s => s.id !== e.id);
    } else {
      newSelected = [...selected, e];
    }

    this.setState(
      {
        selected: newSelected
      },
      () => {
        this.input.focus();
      }
    );
  };

  onRemoveSelected = itemToRemove => {
    const { selected } = this.state;
    const newSelected = selected.filter(item => item.id !== itemToRemove.id);

    this.setState(
      {
        selected: newSelected,
        isMenuOpen: newSelected.length > 0
      },
      state => {
        if (this.state.selected.length === 0) {
          this.input.focus();
        }
      }
    );
  };

  onRemoveAllSelected = () => {
    this.setState(
      {
        selected: [],
        isMenuOpen: false
      },
      () => {
        this.input.focus();
      }
    );
  };

  onMenuOpen = () => {
    this.setState(state => ({
      isMenuOpen: !state.isMenuOpen
    }));
  };

  render() {
    const { classes, items, ItemRenderer, filter } = this.props;
    const { selected, isMenuOpen } = this.state;
    const hasSelected = selected.length > 0;

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
                  <DropdownList>
                    {items
                      .filter(item => filter(item, inputValue))
                      .map((item, index) => {
                        const isSelected =
                          selected.map(s => s.id).indexOf(item.id) > -1;
                        const isHighlighted = index === highlightedIndex;
                        return (
                          <ItemRenderer
                            item={item}
                            isSelected={isSelected}
                            isHighlighted={isHighlighted}
                            {...getItemProps({
                              item,
                              key: item.id
                            })}
                          />
                        );
                      })}
                  </DropdownList>
                )}
              </div>
            </div>
          );
        }}
      </Downshift>
    );
  }
}

MultiselectTypeahead.propTypes = {
  items: PropTypes.array.isRequired,
  ItemRenderer: PropTypes.func,
  filter: PropTypes.func.isRequired
};

MultiselectTypeahead.defaultProps = {
  ItemRenderer: DefaultItemRenderer
};

export default withStyles(styles)(MultiselectTypeahead);
