import check from 'check-types'
import { Mapper } from '../mapper'
import { printMetric } from '../mapperUtils'

export type TimestampsData = {
  timestamps: {}
}
const timestamps: Mapper<TimestampsData> = (prefix, data) => {
  return Object.entries(data.timestamps || {}).reduce((metrics, [metric, datum]: any) => {
    if (check.not.number(datum)) return metrics

    return metrics + printMetric(prefix, metric, datum, 'c') + '\n'
  }, '')
}

export default timestamps
