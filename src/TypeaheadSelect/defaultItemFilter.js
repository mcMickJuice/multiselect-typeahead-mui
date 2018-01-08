const defaultItemFilter = (item, inputValue) => {
  const lowerCaseValue = inputValue.toLowerCase()
  return item.display.toLowerCase().indexOf(lowerCaseValue) > -1
}

export default defaultItemFilter
