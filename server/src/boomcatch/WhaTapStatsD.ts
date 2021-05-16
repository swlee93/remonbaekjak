import normalise from './normalise'
import check from 'check-types'
import { base36Encode, normalisePrefix } from './boomcatchUtils'

/**
 * printMetric
 * @return StatsD
 * @example prefix.name:value|Unit
 */
type Metric = string
type Unit = 'ms'
const printMetric = (prefix: string, name: string, value: number, unit: Unit = 'ms') => {
  if (value <= 0) return ''
  return prefix + name + ':' + value + `|${unit}` + '\n'
}

type NormalizedData = EventsData | DurationsData | RestimingMetricsData
type Mapper<Data = NormalizedData> = (prefix: string | '', data: Data, referer?: string | '') => Metric

/**
 * 기본 Mapper
 */
const mapMetrics = (prefix, data): string => mapEvents(prefix, data) + mapDurations(prefix, data)

interface EventsData {
  events: {}
}
const mapEvents: Mapper<EventsData> = (prefix, data) => {
  return Object.entries(data.events).reduce((metrics, [metric, datum]: any) => {
    if (check.not.object(datum)) return metrics

    return metrics + printMetric(prefix, metric, datum.end - datum.start)
  }, '')
}

interface DurationsData {
  durations: {}
}
const mapDurations: Mapper<DurationsData> = (prefix, data) => {
  return Object.entries(data.durations).reduce((metrics, [metric, datum]: any) => {
    if (check.not.number(datum)) return metrics

    return metrics + printMetric(prefix, metric, datum)
  }, '')
}

/**
 * 리소스 Mapper
 */
type Resource = {
  type: string
  name: string
}
type RestimingMetricsData = Array<Resource>
const mapRestimingMetrics: Mapper<RestimingMetricsData> = (prefix, data, referer): string => {
  return data.reduce((metrics, resource, index) => {
    if (!resource) return metrics

    return (
      metrics +
      mapMetrics(
        `${[prefix + base36Encode(referer), index, resource.type, base36Encode(resource.name)].join('.')}.`,
        resource,
      )
    )
  }, '')
}

/**
 * @requires WhaTapStatsD.initialise
 * @see https://www.npmjs.com/package/boomcatch/v/1.0.0
 */
export const initialise = (options) => (data, referer) => {
  // normalise
  const prefix = normalisePrefix(options.prefix)
  const normalized = normalise(data)

  return Object.entries(normalized).reduce((metrics, [category, categoryData]: any) => {
    let mapper: Mapper

    switch (category) {
      case 'restiming':
        mapper = mapRestimingMetrics
        break
      default:
        mapper = mapMetrics
    }

    if (categoryData) {
      metrics += mapper(`${prefix}${category}.`, categoryData, referer)
    }

    return metrics
  }, '')
}

/**
 * @requires WhaTapStatsD.separator
 */
export const separator = '\n'
