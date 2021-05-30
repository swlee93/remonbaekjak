import check from 'check-types'

export const normalisePrefix = (prefix) => {
  if (check.nonEmptyString(prefix)) {
    return prefix[prefix.length - 1] === '.' ? prefix : prefix + '.'
  }
  return ''
}
