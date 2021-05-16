import { getOptionalDatum, getOptionalSum } from './normaliseUtils'
import check from 'check-types'

const normaliseRtData = (data: any): any => {
  let start, timeToFirstByte, timeToLastByte, timeToLoad

  start = getOptionalDatum(data, 'rt.tstart')
  timeToFirstByte = getOptionalDatum(data, 't_resp')
  timeToLastByte = getOptionalSum(data, 't_resp', 't_page')
  timeToLoad = getOptionalDatum(data, 't_done')

  check.assert.maybe.positive(start)
  check.assert.maybe.number(timeToFirstByte)
  check.assert.not.negative(timeToFirstByte)
  check.assert.maybe.positive(timeToLastByte)
  check.assert.maybe.positive(timeToLoad)

  if (check.positive(timeToFirstByte) || check.positive(timeToLastByte) || check.positive(timeToLoad)) {
    return {
      timestamps: {
        start: start,
      },
      events: {},
      durations: {
        firstbyte: timeToFirstByte,
        lastbyte: timeToLastByte,
        load: timeToLoad,
      },
      url: data.r,
    }
  }
}

export default normaliseRtData
