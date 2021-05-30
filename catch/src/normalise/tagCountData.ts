import { GLOBAL_DATA, CATEGORY_MAP, DataPropKeys, tagCountCategories, TagCountDataProp } from './normalise'
import {
  normaliseMilliseconds,
  normaliseTimestamps,
  normaliseCounts,
  normaliseBytes,
  normaliseTags,
  normaliseDurations,
} from './normaliseUtils'

const injectGlobalProps = (categoryProps: TagCountDataProp): TagCountDataProp => {
  return Object.entries(categoryProps).reduce((injected, [propKey, props]) => {
    injected[propKey] = [...(GLOBAL_DATA[propKey] || []), ...props]
    return injected
  }, {})
}

const tagCountData = (data: any) => {
  return tagCountCategories.reduce((results, category) => {
    const categoryProps: TagCountDataProp = CATEGORY_MAP[category] || {}
    const props: TagCountDataProp = injectGlobalProps(categoryProps)

    results[category] = {}

    Object.keys(props).forEach((dataPropsKey: DataPropKeys) => {
      let bucket = {}
      switch (dataPropsKey) {
        case 'tags':
          normaliseTags(props, data, bucket)
          break
        case 'timestamps':
          normaliseTimestamps(props, data, bucket)
          break
        case 'milliseconds':
          normaliseMilliseconds(props, data, bucket)
          break
        case 'counts':
          normaliseCounts(props, data, bucket)
          break
        case 'bytes':
          normaliseBytes(props, data, bucket)
          break
        case 'durations':
          normaliseDurations(props, data, bucket)
          break
        default:
      }

      results[category][dataPropsKey] = bucket
    })

    return results
  }, {})
}

export default tagCountData
