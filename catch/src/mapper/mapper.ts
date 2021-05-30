import { normalisePrefix } from '../utils'
import normalise from '../normalise'

import { platify, metrics } from './mapperUtils'

export type Metric = string
export type Unit = 'ms' | 'c'
export type Mapper<Data = any> = (prefix: string | '', data: Data, referer?: string | '') => Metric

export const initialise = (options) => (data: any, referer: string, userAgent: string, remoteAddress: string) => {
  // normalise
  const prefix = normalisePrefix(options.prefix)
  const platten = platify(data, referer, userAgent, remoteAddress)
  const normalized = normalise(platten)

  return Object.entries(normalized).reduce((result, [category, categoryData]: any) => {
    if (categoryData) {
      result += metrics(`${prefix}${category}.`, categoryData)
    }

    return result
  }, '')
}

export const separator = '\n'
