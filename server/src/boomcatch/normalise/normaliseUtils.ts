import check from 'check-types'

export const getOptionalDatum = (data: any, key: any): any => {
  if (data[key]) {
    return parseFloat(data[key])
  }
}

export const getOptionalSum = (data: any, aKey: any, bKey: any): any => {
  if (data[aKey] && data[bKey]) {
    return parseInt(data[aKey]) + parseInt(data[bKey])
  }
}

export const normaliseTimestamps = (map, data, buckets = {}) => {
  return map.timestamps.reduce((result, timestamp) => {
    let value, assert

    if (data[timestamp.key]) {
      value = parseInt(data[timestamp.key])
    }

    assert = timestamp.optional !== false ? check.assert.maybe : check.assert
    assert.positive(value)

    if (value) {
      result[timestamp.name] = value
    }

    return result
  }, buckets)
}

export const normaliseCounts = (map, data, buckets = {}) => {
  return map.counts.reduce((result, count) => {
    let value, assert

    if (data[count.key]) {
      value = parseInt(data[count.key])
    }
    try {
      assert = count.optional !== false ? check.assert.maybe : check.assert
      assert.number(value)
    } catch (error) {
      console.error('data[count.key]', count.key, value, data)
    }

    if (value) {
      result[count.name] = value
    }

    return result
  }, buckets)
}
export const normaliseSizes = (map, data, buckets = {}) => {
  return map.sizes.reduce((result, count) => {
    let value, assert

    if (data[count.key]) {
      value = parseInt(data[count.key])
    }
    try {
      assert = count.optional !== false ? check.assert.maybe : check.assert
      assert.number(value)
    } catch (error) {
      console.error(error)
    }

    if (value) {
      result[count.name] = value
    }

    return result
  }, buckets)
}

export const normaliseEvents = (map, data, buckets = {}) => {
  return map.events.reduce((result, event) => {
    let start, end, assert

    if (data[event.start] && data[event.end]) {
      start = parseFloat(data[event.start])
      end = parseFloat(data[event.end])
    }

    assert = event.optional !== false ? check.assert.maybe : check.assert
    assert.number(start)
    check.assert.not.negative(start)
    assert.number(end)
    check.assert.not.negative(end)

    if (check.number(start) && check.number(end)) {
      result[event.name] = {
        start: start,
        end: end,
      }
    }

    return result
  }, buckets)
}

export const normaliseDurations = (map, data, startKey, buckets = {}) => {
  const start = parseFloat(data[startKey])

  return map.durations.reduce((result, duration) => {
    let value, assert

    if (data[duration.end]) {
      value = parseFloat(data[duration.end]) - start
    }

    assert = duration.optional !== false ? check.assert.maybe : check.assert
    assert.number(value)
    check.assert.not.negative(value)

    if (value) {
      result[duration.name] = value
    }

    return result
  }, buckets)
}
