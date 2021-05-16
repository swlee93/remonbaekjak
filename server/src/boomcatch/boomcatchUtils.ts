import check from 'check-types'

export const base36Encode = (string) => {
  if (!string) return 'unknown'

  return Array.prototype.map.call(string, (character) => character.charCodeAt(0).toString(36)).join('')
}

export const normalisePrefix = (prefix) => {
  if (check.nonEmptyString(prefix)) {
    return prefix[prefix.length - 1] === '.' ? prefix : prefix + '.'
  }
  return ''
}
