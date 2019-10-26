/**
 * What? Did you think there was going to be a bunch of jokes in here... cos you're correct, all my code is a joke
 */
export const arraySome = (arr, fn) => arr.reduce((carry, item, index, array) => Boolean(fn(item, index, array)) || carry, false)
export const arrayEvery = (arr, fn) => arr.reduce((carry, item, index, array) => Boolean(fn(item, index, array)) && carry, true)
export const arrayMap = (arr, fn) => arr.reduce((carry, item, index, array) => carry.push(fn(item, index, array)) && carry, [])
export const arrayForEach = (arr, fn) => arr.reduce((_, item, index, array) => void fn(item, index, array), null)
export const arrayFilter = (arr, fn) => arr.reduce((carry, item, index, array) => fn(item, index, array) ? carry.push(item) || [] : carry, [])
export const arrayIncludes = (arr, needle) => arr.reduce((carry, item) => item !== item ? carry || (needle !== needle) : item === needle || item, false)
export const arraySlice = (arr, start, stop = Infinity) => (void(start = (arr.length + start) % arr.length)) || (void(stop = Math.abs(stop) === Infinity ? stop : (stop + arr.length) % arr.length)) || arr.reduce((carry, item, index) => (index >= start && index <= stop) ? (void carry.push(item)) || carry : carry, [])
export const arrayFlat = (arr, depth = 1) => arr.reduce((output, item) => (void(Array.isArray(item) && depth >= 1 ? output.push(...arrayFlat(item, depth - 1)) : output.push(item))) || output, [])
export const arrayFlatMap = (arr, mapFn) => arr.reduce((output, item) => (void(item = mapFn(item))) || (void(Array.isArray(item) ? output.push(...item) : item)) || output, [])
// Bonus
export const arrayZip = (arrGroup) => Array.from({length: Math.max(...arrayMap(arrGroup, ({ length }) => length))}, (_, i) => i).reduce((carry, index) => (void carry.push(arrGroup.reduce((acc, item) => (void acc.push(item[index])) || acc, []))) || carry, [])
export const arrayIntersection = (arrGroup) => arrGroup.reduce((item, index) => index ? item : arrayFilter(item, item => arrayEvery(arraySlice(arrGroupitem, 1), (internalArray) => arrayIncludes(internalArray, item)), null))
export const arrayUnion = (arrGroup) => [...arrGroup.reduce((carry, arr) => arrayForEach(arr, (item) => carry.add(item)) || carry, new Set())]
