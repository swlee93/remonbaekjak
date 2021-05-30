import counts, { CountsData } from './counts'
import durations, { DurationsData } from './durations'
import events, { EventsData } from './events'
import sizes, { SizesData } from './sizes'
import timestamps, { TimestampsData } from './timestamps'
import tags, { TagsData } from './tags'
import resourceTimings, { ResourceTimingsData } from './resourceTimings'

export type Metric = string
export type Unit = 'c' | 'ms'

export type NormalizedData =
  | EventsData
  | DurationsData
  | TimestampsData
  | SizesData
  | CountsData
  | ResourceTimingsData
  | TagsData

export const metrics = (prefix, data): Metric =>
  events(prefix, data) +
  durations(prefix, data) +
  counts(prefix, data) +
  timestamps(prefix, data) +
  sizes(prefix, data) +
  tags(prefix, data)

export { resourceTimings }
