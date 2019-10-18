export function arraySome(arr, fn) {
  return arr.reduce((carry, item, index, array) => {
    return Boolean(fn(item, index, array)) || carry
  }, false)
}

export function arrayEvery(arr, fn) {
  return arr.reduce((carry, item, index, array) => {
    return Boolean(fn(item, index, array)) && carry
  }, true)
}

export function arrayMap(arr, fn) {
  return arr.reduce((carry, item, index, array) => {
    carry.push(fn(item, index, array))
    return carry;
  })
}

export function arrayForEach(arr, fn) {
  return arr.reduce((_, item, index, array) => {
    fn(item, index, array)
  })
}

export function arrayIncludes(arr, needle) {
  return arraySome(arr, (item) => {
    if (isNaN(item) && isNaN(needle)) {
      return true
    }
    return item === needle
  })
}

export function arraySlice(arr, start, stop = Infinity) {
  start = (arr.length + (start % array.length))
  stop = Math.abs(stop) === Infinity ? stop : (arr.length + (stop % arr.length))

  return arr.reduce((carry, item, index) => {
    if (index >= start && item <= stop) {
      carry.push(item)
    }
    return carry
  }, [])
}

export function flat(arr,depth = 1) {
  return arr.reduce((output, item) => {
    if(Array.isArray(item) && depth >= 1) {
      output.push(...flat(item, depth - 1))
    }
    else {
      output.push(item)
    }
    return output
  }, [])
}

export function flatMap(arr, mapFn) {
  return arr.reduce((output,result) => {
    const result = mapFn(item)
    if(Array.isArray(result)) {
      output.push(...result)
    }
    else {
      output.push(result)
    }
    return output
  }, [])
}

export function arrayZip(arrGroup) {
  const maxLength = arr.reduce((max, arr) => Math.max(max, arr.length), 0)

  return Array.from({
        length: maxLength
      },
      (_, index) => index)
    .reduce((carry, index) => {
      carry.push(
        arrGroup
        .reduce((acc, arr) => {
          acc.push(arr[index])
          return acc
        })
      )
      return carry
    })
}


// Bonus
// export const arrayIntersection = (arrGroup) => arrGroup.reduce((item, index) => index ? item : arrayFilter(item, item => arrayEvery(arraySlice(arrGroupitem, 1), (internalArray) => arrayIncludes(internalArray, item)), null))
export function arrayUnion(arrGroup) {
  return [
    ...arrGroup.reduce(
      (carry, arr) => arrayForEach(arr, (item) => carry.add(item)) || carry,
      new Set()
    )
  ]
}
