import React, { Component } from "react";
import TextField from "material-ui/TextField";
import Check from "material-ui-icons/Check";
import Close from "material-ui-icons/Close";
import { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import Downshift from "downshift";
import { withStyles } from "material-ui/styles";
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
      isInputFocused: false
    };
  }

  onChange = e => {
    const { selected, onSelected } = this.props;
    let newSelected;
    if (selected.indexOf(e) > -1) {
      newSelected = selected.filter(s => s.id !== e.id);
    } else {
      newSelected = [...selected, e];
    }

    onSelected(newSelected);
    this.input.focus();
  };

  onInputFocus = () => {
    this.setState({
      isInputFocused: true
    });
  };

  onInputBlur = () => {
    this.setState({
      isInputFocused: false
    });
  };

  render() {
    const {
      classes,
      items,
      ItemRenderer,
      filter,
      selected,
      label
    } = this.props;
    const { isInputFocused } = this.state;

    return (
      <Downshift
        onChange={this.onChange}
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
                  InputLabelProps={{
                    shrink: isInputFocused || selected.length > 0
                  }}
                  {...getInputProps({
                    placeholder: `${selected.length} Items Selected`,
                    onBlur: this.onInputBlur,
                    onFocus: this.onInputFocus,
                    label,
                    InputProps: {
                      classes: {
                        input: classes.input
                      }
                    }
                  })}
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
  selected: PropTypes.array.isRequired,
  onSelected: PropTypes.func.isRequired,
  ItemRenderer: PropTypes.func,
  filter: PropTypes.func.isRequired,
  displayField: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

MultiselectTypeahead.defaultProps = {
  ItemRenderer: DefaultItemRenderer
};

export default withStyles(styles)(MultiselectTypeahead);
