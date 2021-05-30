import check from 'check-types'
import { Mapper, Metric, Unit } from './mapper'
import JSURL from 'jsurl'

const printMS: Mapper = (prefix, data) => {
  return Object.entries(data || {}).reduce((metrics, [metric, datum]: any) => {
    if (check.not.number(datum)) return metrics
    return metrics + printMetric(prefix, metric, datum) + '\n'
  }, '')
}

const printC: Mapper = (prefix, data) => {
  return Object.entries(data || {}).reduce((metrics, [metric, datum]: any) => {
    if (check.not.number(datum)) return metrics

    return metrics + printMetric(prefix, metric, datum, 'c') + '\n'
  }, '')
}

// const escape = (value: string | number) => {
//   return value.toString().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')
// }
const tags: Mapper = (prefix, data) => {
  return Object.entries(data || {}).reduce((metrics, [tagName, tagValue]: any) => {
    return metrics + printMetric(`${prefix}tag.${tagName}.`, JSURL.stringify(tagValue), 1, 'c') + '\n'
  }, '')
}

const base36Encode = (string) => {
  if (!string) return 'unknown'
  return Array.prototype.map.call(string, (character) => character.charCodeAt(0).toString(36)).join('')
}

const printMetric = (prefix: string, name: string, value: number, unit: Unit = 'ms'): Metric => {
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

export const metrics = (prefix, data): Metric =>
  tags(prefix, data.tags) +
  printC(prefix, data.counts) +
  printC(prefix, data.bytes) +
  printMS(prefix, data.timestamps) +
  printMS(prefix, data.durations) +
  printMS(prefix, data.milliseconds)
