import { normalisePrefix } from '../boomcatchUtils'
import normalise from '../normalise'
import { Metric, NormalizedData, metrics, resourceTimings } from './datatype'
import { platify } from './mapperUtils'

export type Mapper<Data = NormalizedData> = (prefix: string | '', data: Data, referer?: string | '') => Metric

export const initialise = (options) => (data: any, referer: string, userAgent: string, remoteAddress: string) => {
  // normalise
  const prefix = normalisePrefix(options.prefix)
  const platten = platify(data, referer, userAgent, remoteAddress)
  const normalized = normalise(platten)

  return Object.entries(normalized).reduce((result, [category, categoryData]: any) => {
    let mapper: Mapper

    switch (category) {
      case 'restiming':
        mapper = resourceTimings
        break
      default:
        mapper = metrics
    }

    if (categoryData) {
      result += mapper(`${prefix}${category}.`, categoryData, referer)
    }

    return result
  }, '')
}

export const separator = '\n'
