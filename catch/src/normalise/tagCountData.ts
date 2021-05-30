import { CATEGORY_MAP, DataPropKeys, tagCountCategories, TagCountDataProp } from './normalise'
import {
  normaliseMilliseconds,
  normaliseTimestamps,
  normaliseCounts,
  normaliseBytes,
  normaliseTags,
  normaliseDurations,
} from './normaliseUtils'

const tagCountData = (data: any) => {
  return tagCountCategories.reduce((results, category) => {
    const categoryMap: TagCountDataProp | {} = CATEGORY_MAP[category] || {}

    results[category] = {}

    Object.keys(categoryMap).forEach((dataPropsKey: DataPropKeys) => {
      let valuesByCategory = {}
      switch (dataPropsKey) {
        case 'tags':
          normaliseTags(categoryMap, data, valuesByCategory)
          break
        case 'timestamps':
          normaliseTimestamps(categoryMap, data, valuesByCategory)
          break
        case 'milliseconds':
          normaliseMilliseconds(categoryMap, data, valuesByCategory)
          break
        case 'counts':
          normaliseCounts(categoryMap, data, valuesByCategory)
          break
        case 'bytes':
          normaliseBytes(categoryMap, data, valuesByCategory)
          break
        case 'durations':
          normaliseDurations(categoryMap, data, valuesByCategory)
          break
        default:
      }

      results[category][dataPropsKey] = valuesByCategory
    })

    return results
  }, {})
}

export default tagCountData
