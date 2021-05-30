import check from 'check-types'

const maybe = check.assert.maybe
const isNumber = maybe.number

export const normaliseTimestamps = (map, data, buckets = {}) => {
  return map.timestamps.reduce((result, prop) => {
    let value // do not initialize

    if (data[prop.key]) {
      value = parseInt(data[prop.key])
    }

    if (isNumber(value)) {
      result[prop.name] = value
    }

    return result
  }, buckets)
}

export const normaliseCounts = (map, data, buckets = {}) => {
  return map.counts.reduce((result, prop) => {
    let value = 0

    if (data[prop.key]) {
      value = parseInt(data[prop.key])
    }

    if (isNumber(value)) {
      result[prop.name] = value
    }

    return result
  }, buckets)
}
export const normaliseBytes = (map, data, buckets = {}) => {
  return map.bytes.reduce((result, prop) => {
    let value = 0

    if (data[prop.key]) {
      value = parseInt(data[prop.key])
    }

    if (isNumber(value)) {
      result[prop.name] = value
    }

    return result
  }, buckets)
}
export const normaliseTags = (map, data, buckets = {}) => {
  return map.tags.reduce((result, tag) => {
    let value

    if (data[tag.key]) {
      value = data[tag.key]
    }

    if (value) {
      result[tag.name] = value
    }

    return result
  }, buckets)
}

export const normaliseDurations = (map, data, buckets = {}) => {
  return map.durations.reduce((result, prop) => {
    let value // do not initialize

    if (data[prop.end] && data[prop.start]) {
      value = parseFloat(data[prop.end]) - parseFloat(data[prop.start])
    }

    if (isNumber(value)) {
      result[prop.name] = value
    }

    return result
  }, buckets)
}

export const normaliseMilliseconds = (map, data, buckets = {}) => {
  return map.milliseconds.reduce((result, prop) => {
    let value = 0

    if (data[prop.key]) {
      value = parseInt(data[prop.key])
    }

    if (isNumber(value)) {
      result[prop.name] = value
    }

    return result
  }, buckets)
}
