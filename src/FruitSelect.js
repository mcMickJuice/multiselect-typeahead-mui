import React, { Component } from 'react'
import TypeaheadSelect from './TypeaheadSelect'
import DropdownListItem from './DropdownListItem'

const fruits = [
  { id: 1, display: 'Bananas' },
  { id: 2, display: 'Apples' },
  { id: 3, display: 'Plantains' },
  { id: 4, display: 'Oranges' },
  { id: 5, display: 'Coconuts' },
  { id: 6, display: 'Zebra Mussels' }
]

const fruitFilter = (item, inputValue) => {
  const lowerCaseValue = inputValue.toLowerCase()
  return item.display.toLowerCase().indexOf(lowerCaseValue) > -1
}

class FruitSelect extends Component {
  constructor() {
    super()

    this.handleFruitSelect = this.handleFruitSelect.bind(this)

    this.state = {
      selectedFruit: undefined
    }
  }

  handleFruitSelect(fruit) {
    console.log('fruit selected', fruit)
    this.setState({
      selectedFruit: fruit
    })
  }

  render() {
    const { selectedFruit } = this.state

    return (
      <TypeaheadSelect
        items={fruits}
        displayKey="display"
        entityKey="id"
        onSelected={this.handleFruitSelect}
        ItemComponent={DropdownListItem}
        filter={fruitFilter}
        label="Fruit!"
        selected={selectedFruit}
      />
    )
  }
}

export default FruitSelect
