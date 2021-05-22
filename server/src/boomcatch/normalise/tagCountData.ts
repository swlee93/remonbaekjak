import { Category, NORMALISATION_MAP, NormalisedDataProp } from './normalise'
import {
  normaliseDurations,
  normaliseTimestamps,
  normaliseCounts,
  normaliseSizes,
  normaliseTags,
} from './normaliseUtils'

const tagCountCategories: Array<Category> = ['browser', 'hardware', 'timers']
const tagCountData = (data: any) => {
  return tagCountCategories.reduce((results, category) => {
    const map: NormalisedDataProp | {} = NORMALISATION_MAP[category] || {}

    results[category] = {}
    // bucket

    Object.keys(map).forEach((dataPropsKey) => {
      let valuesByCategory = {}
      switch (dataPropsKey) {
        case 'timestamps':
          normaliseTimestamps(map, data, valuesByCategory)
          break
        case 'durations':
          normaliseDurations(map, data, valuesByCategory)
          break
        case 'counts':
          normaliseCounts(map, data, valuesByCategory)
          break
        case 'sizes':
          normaliseSizes(map, data, valuesByCategory)
          break
        case 'tags':
          normaliseTags(map, data, valuesByCategory)
          break
        default:
      }

      results[category][dataPropsKey] = valuesByCategory
    })

    return results
  }, {})
}

export default tagCountData
