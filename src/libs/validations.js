export function deepEqual (value1, value2) {
  if (typeof value1 !== typeof value2) return false
  if (typeof value1 !== 'object') {
    return value1 === value2
  } else {
    if (value1 === null || value2 === null) {
      return value1 === value2
    }
    if (Object.keys(value1).length !== Object.keys(value2).length) { return false }
    for (const property in value1) {
      const isSame = deepEqual(value1[property], value2[property])
      if (!isSame) return false
    }
    return true
  }
}
