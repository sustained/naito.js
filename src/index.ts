
export function arraySome<T>(arr: T[], fn: (element: T, index: number, array: T[]) => boolean, thisArg: any = arr) {
  fn = fn.bind(thisArg)
  return arr.reduce((carry, item, index, arr) => {
    return Boolean(fn(item, index, arr)) || carry
  }, false)
}

export function arrayEvery<T>(arr: T[], fn: (element: T, index: number, array: T[]) => boolean, thisArg: any = arr) {
  fn = fn.bind(thisArg)
  return arr.reduce((carry, item, index, array) => {
    return Boolean(fn(item, index, array)) && carry
  }, true)
}
export function arrayMap<T, U>(arr: T[], fn: (element: T, index: number, array: T[]) => U, thisArg: any = arr) {
  fn = fn.bind(thisArg)
  return arr.reduce((carry, item, index, array) => {
    carry.push(fn(item, index, array))
    return carry;
  }, [] as U[])
}

export function arrayForEach<T>(arr: T[], fn: (element: T, index: number, array: T[]) => void, thisArg: any = arr) {
  fn = fn.bind(thisArg)
  arr.reduce((_, item, index, array) => {
    fn(item, index, array)
    return _ // typescript needs this cos it big dumb dumb (or I big dumb dumb)
  }, undefined)
}

export function arrayIncludes<T>(arr: T[], needle: T, fromIndex = 0) {
  return arraySome(arr, (item, index) => {
    if (index < fromIndex) return false
    if (isNaN(item as any) && isNaN(needle as any)) {
      return true
    }
    return item === needle
  })
}

export function arraySlice<T>(array: T[], start = 0, stop = Infinity) {
  start = (array.length + (start % array.length))
  stop = Math.abs(stop) === Infinity ? stop : (array.length + (stop % array.length))

  return array.reduce((carry, item, index) => {
    if (index >= start && index <= stop) {
      carry.push(item)
    }
    return carry
  }, [] as T[])
}

export function arrayFlat<T>(array: (T | T[])[], depth = 1): (T | T[])[] {
  return array.reduce((output, item) => {
    if (Array.isArray(item) && depth >= 1) {
      output.push(...arrayFlat(item, depth - 1))
    } else {
      output.push(item)
    }
    return output
  }, [] as (T | T[])[])
}

export function arrayFlatMap<T, U>(array: T[], mapFn: (element: T, index: number, array: T[]) => U | U[], thisArg: any = array): U[] {
  mapFn = mapFn.bind(thisArg)
  return array.reduce((output, item, index, array) => {
    const result = mapFn(item, index, array)
    if (Array.isArray(result)) {
      output.push(...result)
    } else {
      output.push(result)
    }
    return output
  }, [] as U[])
}

export function arrayZip<T>(arrGroup: T[][]) {
  const maxLength = arrGroup.reduce((max, arr) => Math.max(max, arr.length), 0)

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
          }, [] as any[])
      )
      return carry
    }, [] as any[])
}

// Bonus
// export const arrayIntersection = (arrGroup) => arrGroup.reduce((item, index) => index ? item : arrayFilter(item, item => arrayEvery(arraySlice(arrGroupitem, 1), (internalArray) => arrayIncludes(internalArray, item)), null))
export function arrayUnion<T>(arrGroup: T[][]) {
  return [
    ...arrGroup.reduce(
      (carry, arr) => arrayForEach(arr, (item) => carry.add(item)) as undefined || carry,
      new Set<any>()
    )
  ]
}
