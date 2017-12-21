import React, { Component } from "react";
import { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import Downshift from "downshift";
import { AddCircle, Close } from "material-ui-icons";
import IconButton from "material-ui/IconButton";
import PropTypes from "prop-types";
import DropdownList from "./DropdownList";

const removeAllItem = {
  id: -1,
  name: "Remove All Items"
};

class SelectedItemsDropdown extends Component {
  constructor() {
    super();

    this.state = {
      isMenuOpen: false
    };
  }

  removeSelected = itemToRemove => {
    if (itemToRemove.id === -1 || this.props.selected.length === 1) {
      this.removeAllItems();
    } else {
      this.props.onRemoveItem(itemToRemove);
    }
  };

  removeAllItems = () => {
    this.setState(
      {
        isMenuOpen: false
      },
      () => {
        this.props.onRemoveAllItems();
      }
    );
  };

  closeList = () => {
    this.setState({
      isMenuOpen: false
    });
  };

  toggleList = () => {
    console.log("toggle list");
    this.setState(state => ({
      isMenuOpen: !state.isMenuOpen
    }));
  };

  handleKeyDown = ({ key }) => {
    const { isMenuOpen } = this.state;
    if (key === "ArrowDown" && !isMenuOpen) {
      this.setState({
        isMenuOpen: true
      });
      return;
    }

    if (key === "Escape" && isMenuOpen) {
      this.setState({
        isMenuOpen: false
      });
    }
  };

  render() {
    const { isMenuOpen } = this.state;
    const { classes, selected, disabled, displayField } = this.props;
    const selectedWithItems = [removeAllItem, ...selected];

    const isOpen = !disabled && isMenuOpen;

    return (
      <Downshift
        onChange={this.removeSelected} //maybe use onSelect instead
        selectedItem=""
        itemToString={() => ""}
        isOpen={isMenuOpen}
        onOuterClick={this.closeList}
        defaultHighlightedIndex={0}
      >
        {({ getItemProps, getButtonProps, highlightedIndex }) => {
          return (
            <span onKeyDown={this.handleKeyDown}>
              <IconButton
                {...getButtonProps({
                  onClick: this.toggleList,
                  disabled
                })}
              >
                <AddCircle />
              </IconButton>
              {!isOpen ? null : (
                <DropdownList classes={{ root: classes.selectedList }}>
                  {selectedWithItems.map((item, index) => {
                    const isHighlighted = highlightedIndex === index;
                    const displayName =
                      item.id === -1 ? item.name : item[displayField];
                    return (
                      <ListItem
                        divider
                        {...getItemProps({
                          item,
                          key: item.id
                        })}
                      >
                        <ListItemText primary={displayName} />
                        {isHighlighted && (
                          <ListItemIcon>
                            <Close key={item.id} />
                          </ListItemIcon>
                        )}
                      </ListItem>
                    );
                  })}
                </DropdownList>
              )}
            </span>
          );
        }}
      </Downshift>
    );
  }
}

SelectedItemsDropdown.propTypes = {
  classes: PropTypes.object,
  selected: PropTypes.array.isRequired,
  onRemoveAllItems: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  displayField: PropTypes.string.isRequired
};

SelectedItemsDropdown.defaultProps = {
  classes: {}
};

export default SelectedItemsDropdown;
