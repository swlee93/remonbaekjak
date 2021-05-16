import { normaliseCategory } from './normalise'

const restimingData = (data) => {
  let result

  if (data.restiming) {
    result = []

    Object.keys(data.restiming).forEach((key) => {
      let datum = normaliseCategory('restiming', data.restiming[key], 'rt_st')

      if (datum) {
        datum.name = data.restiming[key].rt_name
        datum.type = data.restiming[key].rt_in_type
      }

      result.push(datum)
    })

    return result
  }
}

export default restimingData
