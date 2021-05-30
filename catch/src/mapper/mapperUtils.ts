import { Metric, Unit } from './datatype'

/**
 * @example prefix.name:value|Unit
 */
export const printMetric = (prefix: string, name: string, value: number, unit: Unit = 'ms'): Metric => {
  if (value <= 0) return ''
  return prefix + name + ':' + value + `|${unit}`
}

export const platify = (data: any = {}, referer: string, userAgent: string, remoteAddress: string) => {
  data.referer = referer
  data.userAgent = userAgent
  data.remoteAddress = remoteAddress
  if (typeof data.browser === 'object') {
    Object.entries(data.browser).forEach(([key, value]) => {
      data[`browser.${key}`] = value
    })
  }
  return data
}
