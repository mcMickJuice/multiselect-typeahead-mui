import React, { Component } from "react";
import MultiselectTypeahead from "./MultiselectTypeahead";
import { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import Check from "material-ui-icons/Check";
import Close from "material-ui-icons/Close";
import Avatar from "material-ui/Avatar";

const items = [
  {
    id: 1,
    fruit: "Bananas",
    imageUrl:
      "https://img.buzzfeed.com/buzzfeed-static/static/2015-03/6/14/enhanced/webdr06/enhanced-5904-1425669663-1.jpg?downsize=715:*&output-format=auto&output-quality=auto"
  },
  {
    id: 2,
    fruit: "Apples",
    imageUrl:
      "https://img.buzzfeed.com/buzzfeed-static/static/2015-03/6/14/enhanced/webdr06/enhanced-5904-1425669663-1.jpg?downsize=715:*&output-format=auto&output-quality=auto"
  },
  {
    id: 3,
    fruit: "Plantains",
    imageUrl:
      "https://img.buzzfeed.com/buzzfeed-static/static/2015-03/6/14/enhanced/webdr06/enhanced-5904-1425669663-1.jpg?downsize=715:*&output-format=auto&output-quality=auto"
  },
  {
    id: 4,
    fruit: "Oranges",
    imageUrl:
      "https://img.buzzfeed.com/buzzfeed-static/static/2015-03/6/14/enhanced/webdr06/enhanced-5904-1425669663-1.jpg?downsize=715:*&output-format=auto&output-quality=auto"
  },
  {
    id: 5,
    fruit: "Coconuts",
    imageUrl:
      "https://img.buzzfeed.com/buzzfeed-static/static/2015-03/6/14/enhanced/webdr06/enhanced-5904-1425669663-1.jpg?downsize=715:*&output-format=auto&output-quality=auto"
  },
  {
    id: 6,
    fruit: "Raspberries",
    imageUrl:
      "https://img.buzzfeed.com/buzzfeed-static/static/2015-03/6/14/enhanced/webdr06/enhanced-5904-1425669663-1.jpg?downsize=715:*&output-format=auto&output-quality=auto"
  }
];

const ItemRenderer = ({ item, isSelected, isHighlighted, ...rest }) => {
  return (
    <ListItem divider button {...rest}>
      <Avatar src={item.imageUrl} />
      <ListItemText primary={item.fruit} />
      {(isSelected || isHighlighted) && (
        <ListItemIcon>
          {isSelected ? isHighlighted ? <Close /> : <Check /> : <Check />}
        </ListItemIcon>
      )}
    </ListItem>
  );
};

const fruitFilter = (item, inputValue) => {
  return item.fruit.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
};

class FruitTypeahead extends Component {
  render() {
    return (
      <div>
        <h4>Fruit Typeahead</h4>
        <MultiselectTypeahead
          filter={fruitFilter}
          items={items}
          ItemRenderer={ItemRenderer}
        />
      </div>
    );
  }
}

export default FruitTypeahead;
