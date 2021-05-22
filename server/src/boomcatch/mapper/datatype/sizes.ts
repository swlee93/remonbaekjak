import check from 'check-types'
import { Mapper } from '../mapper'
import { printMetric } from '../mapperUtils'

export type SizesData = {
  sizes: {}
}
const sizes: Mapper<SizesData> = (prefix, data) => {
  return Object.entries(data.sizes || {}).reduce((metrics, [metric, datum]: any) => {
    if (check.not.number(datum)) return metrics

    return metrics + printMetric(prefix, metric, datum, 'c') + '\n'
  }, '')
}

export default sizes
