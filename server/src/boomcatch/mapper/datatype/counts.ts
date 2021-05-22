import check from 'check-types'
import { Mapper } from '../mapper'
import { printMetric } from '../mapperUtils'

export type CountsData = {
  counts: {}
}
const counts: Mapper<CountsData> = (prefix, data) => {
  return Object.entries(data.counts || {}).reduce((metrics, [metric, datum]: any) => {
    if (check.not.number(datum)) return metrics

    return metrics + printMetric(prefix, metric, datum, 'c') + '\n'
  }, '')
}

export default counts
