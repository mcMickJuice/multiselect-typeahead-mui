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

  onRemoveSelected = itemToRemove => {
    if (itemToRemove.id === -1) {
      this.props.onRemoveAllItems();
    } else {
      this.props.onRemoveItem(itemToRemove);
    }
  };

  onRemoveAllItems = () => {
    this.props.onRemoveAllItems();
  };

  toggleList = () => {
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
    const { classes, selected, disabled } = this.props;
    const selectedWithItems = [removeAllItem, ...selected];

    const isOpen = !disabled && isMenuOpen;

    return (
      <Downshift
        onChange={this.onRemoveSelected}
        onStateChange={this.onStateChange}
        selectedItem=""
        itemToString={() => ""}
        isOpen={isMenuOpen}
        onOuterClick={this.toggleList}
      >
        {({ getItemProps, getButtonProps, highlightedIndex }) => {
          return (
            <span onKeyDown={this.handleKeyDown}>
              <IconButton
                {...getButtonProps({ onClick: this.toggleList, disabled })}
              >
                <AddCircle />
              </IconButton>
              {!isOpen ? null : (
                <DropdownList classes={{ root: classes.selectedList }}>
                  {selectedWithItems.map((item, index) => {
                    const isHighlighted = highlightedIndex === index;
                    return (
                      <ListItem
                        button
                        divider
                        {...getItemProps({
                          item,
                          key: item.id
                        })}
                      >
                        <ListItemText primary={item.name} />
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
  disabled: PropTypes.bool
};

SelectedItemsDropdown.defaultProps = {
  classes: {}
};

export default SelectedItemsDropdown;
