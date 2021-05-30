import check from 'check-types'
import { Mapper } from '../mapper'
import { printMetric } from '../mapperUtils'

export type EventsData = {
  events: {}
}
const events: Mapper<EventsData> = (prefix, data) => {
  return Object.entries(data.events || {}).reduce((metrics, [metric, datum]: any) => {
    if (check.not.object(datum)) return metrics

    return metrics + printMetric(prefix, metric, datum.end - datum.start) + '\n'
  }, '')
}

export default events
