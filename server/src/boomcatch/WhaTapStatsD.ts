import check from 'check-types'
import normalise from './normalise'

function normalisePrefix(prefix) {
  if (check.unemptyString(prefix)) {
    if (prefix[prefix.length - 1] === '.') {
      return prefix
    }

    return prefix + '.'
  }

  return ''
}

function map(prefix, data, referer) {
  var result = ''

  data = normalise(data)

  Object.keys(data).forEach(function (category) {
    var mapper

    if (category === 'restiming') {
      mapper = mapRestimingMetrics
    } else {
      mapper = mapMetrics
    }

    if (data[category]) {
      result += mapper(prefix + category + '.', data[category], referer)
    }
  })

  return result
}

function mapRestimingMetrics(prefix, data, referer) {
  return data
    .map(function (resource, index) {
      if (!resource) {
        return ''
      }

      return mapMetrics(
        [prefix + base36Encode(referer), index, resource.type, base36Encode(resource.name)].join('.') + '.',
        resource,
      )
    })
    .join('')
}

function base36Encode(string) {
  if (!string) {
    return 'unknown'
  }

  return Array.prototype.map
    .call(string, function (character) {
      return character.charCodeAt(0).toString(36)
    })
    .join('')
}

function mapMetrics(prefix, data) {
  return mapEvents(prefix, data) + mapDurations(prefix, data)
}

function mapEvents(prefix, data) {
  return Object.keys(data.events)
    .map(function (metric) {
      var datum = data.events[metric]

      if (check.object(datum)) {
        return mapMetric(prefix, metric, datum.end - datum.start)
      }

      return ''
    })
    .join('')
}

function mapMetric(prefix, name, value) {
  if (value <= 0) {
    return ''
  }

  return prefix + name + ':' + value + '|ms' + '\n'
}

function mapDurations(prefix, data) {
  return Object.keys(data.durations)
    .map(function (metric) {
      var datum = data.durations[metric]

      if (check.number(datum)) {
        return mapMetric(prefix, metric, datum)
      }

      return ''
    })
    .join('')
}

export default {
  initialise: function (options) {
    return map.bind(null, normalisePrefix(options.prefix))
  },
  separator: '\n',
}
