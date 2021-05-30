import check from 'check-types'
import { Mapper } from '../mapper'
import { printMetric } from '../mapperUtils'

export type DurationsData = {
  durations: {}
}
const durations: Mapper<DurationsData> = (prefix, data) => {
  return Object.entries(data.durations || {}).reduce((metrics, [metric, datum]: any) => {
    if (check.not.number(datum)) return metrics

    return metrics + printMetric(prefix, metric, datum) + '\n'
  }, '')
}

export default durations
