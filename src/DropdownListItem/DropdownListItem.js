import React from 'react'
import PropTypes from 'prop-types'
import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List'
import Check from 'material-ui-icons/Check'
import Close from 'material-ui-icons/Close'

export const DropdownListItem = ({
  item,
  isSelected,
  isHighlighted,
  ...rest
}) => {
  return (
    <ListItem divider button {...rest}>
      <ListItemText primary={item.display} />
      {(isSelected || isHighlighted) && (
        <ListItemIcon>
          {isSelected ? isHighlighted ? <Close /> : <Check /> : <Check />}
        </ListItemIcon>
      )}
    </ListItem>
  )
}

DropdownListItem.propTypes = {
  item: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isHighlighted: PropTypes.bool.isRequired
}

export default DropdownListItem
