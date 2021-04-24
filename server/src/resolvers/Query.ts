import { getTasks } from './models/Task'
import { getLightHouseData } from './models/LightHouseData'
import { getSettings } from './models/Settings'
import { getReportInfos, getReportInfoByTimestamp } from './models/Reports'
import { getUser } from './models/User'

export default { getUser, getTasks, getLightHouseData, getSettings, getReportInfos, getReportInfoByTimestamp }
