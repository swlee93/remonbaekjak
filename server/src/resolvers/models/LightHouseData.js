const fse = require('fs-extra')
const csv = require('csvtojson')
const { getTargetFileList } = require('../resolveUtils')
const { FILEDB_PATH, TASK_DATATYPE } = require('../../constants')

const readLightHouseReportData = async (taskId, stime = Date.now() - 86400000, etime = Date.now()) => {
  let files = getTargetFileList(FILEDB_PATH.REPORT, taskId, 'json')

  return await files.reduce((acc, { path, name, timestamp }) => {
    if (stime < timestamp && etime > timestamp) {
      let data = fse.readFileSync(path).toString()
      acc.push({ data, timestamp })
    }
    return acc
  }, [])
}

const readLightHouseMetricsData = async (taskId, stime = Date.now() - 86400000, etime = Date.now(), includeColumns) => {
  let files = getTargetFileList(FILEDB_PATH.METRICS, taskId, 'csv')
  let results = []

  await files.reduce(async (acc, { path, name, timestamp }) => {
    await acc

    if (stime < timestamp && etime > timestamp) {
      return csv({ includeColumns: includeColumns ? new RegExp(`time|taskId|${includeColumns}`) : undefined })
        .fromFile(path)
        .then(async (result) => {
          results = [...results, ...result]
        })
    }
    return acc
  }, Promise.resolve())

  return results.sort((a, b) => (a.time || 0) - (b.time || 0))
}

const getLightHouseData = (parent, args, context, info) => {
  const { taskId, subtype, stime, etime, includeColumns } = args

  switch (subtype) {
    case TASK_DATATYPE.report:
      return Promise.resolve(readLightHouseReportData(taskId, stime, etime)).then((report) => ({
        report,
      }))

    case TASK_DATATYPE.performance:
      return Promise.resolve(readLightHouseMetricsData(taskId, stime, etime, includeColumns)).then((performance) => ({
        performance,
      }))

    default:
      return Promise.all([
        () => readLightHouseReportData(taskId, stime, etime),
        () => readLightHouseMetricsData(taskId, stime, etime, includeColumns),
      ]).then(([report, performance]) => ({
        report,
        performance,
      }))
  }
}

module.exports = { getLightHouseData }
