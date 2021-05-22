import { Mapper } from '../mapper'
import { printMetric } from '../mapperUtils'

export type TagsData = {
  tags: {}
}
const escape = (value: string | number) => {
  return value.toString().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_')
}
const tags: Mapper<TagsData> = (prefix, data) => {
  return Object.entries(data.tags || {}).reduce((metrics, [tagName, tagValue]: any) => {
    return metrics + printMetric(`${prefix}tag.${tagName}.`, escape(tagValue), 1, 'c') + '\n'
  }, '')
}

export default tags
