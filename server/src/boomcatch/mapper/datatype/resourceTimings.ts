import { base36Encode } from '../../boomcatchUtils'
import { Mapper } from '../mapper'
import { metrics } from '.'

type Resource = {
  type: string
  name: string
}

export type ResourceTimingsData = Array<Resource>

const resourceTimings: Mapper<ResourceTimingsData> = (prefix, data, referer): string => {
  return data.reduce((result, resource, index) => {
    if (!resource) return result

    return (
      result +
      metrics(
        `${[prefix + base36Encode(referer), index, resource.type, base36Encode(resource.name)].join('.')}.`,
        resource,
      )
    )
  }, '')
}

export default resourceTimings
