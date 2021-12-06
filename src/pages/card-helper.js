
export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr
  
    const result = [...arr]
    let itemToAdd = payload
    if (removedIndex !== null) {
      console.log('removedIndex',removedIndex);
      itemToAdd = result.splice(removedIndex, 1)[0]
    }
  
    if (addedIndex !== null) {
      console.log('addedIndex',addedIndex);
      result.splice(addedIndex, 0, itemToAdd)
    }
    console.log('result',result);
    return result
  }
  