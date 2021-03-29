const fse = require('fs-extra')

const readLightHouseReportData = async (taskId, stime = Date.now() - 86400000, etime = Date.now()) => {
  const reportpath = 'filedb/lighthouse/report/' + taskId

  let files = []
  if (fse.pathExistsSync(reportpath)) {
    files = fse.readdirSync(reportpath)
  }

  return await files.reduce((acc, filename) => {
    const timestamp = filename.split('.')[0]
    const reportfile = reportpath + '/' + timestamp + '.json'

    if (stime < timestamp && etime > timestamp) {
      let data = fse.readFileSync(reportfile).toString()
      acc.push({ data, timestamp: Number(timestamp) })
    }

    return acc
  }, [])
}

const readLightHouseMetricsData = (taskId, stime = Date.now() - 86400000, etime = Date.now()) => {
  const performancepath = 'filedb/lighthouse/performance/' + taskId
  let files = []
  if (fse.pathExistsSync(performancepath)) {
    files = fse.readdirSync(performancepath)
  }

  return files.reduce((acc, filename) => {
    const timestamp = filename.split('.')[0]
    const performancefile = performancepath + '/' + timestamp + '.csv'

    if (stime < timestamp && etime > timestamp) {
      const data = fse.readFileSync(performancefile).toString()
      acc.push({ data, timestamp: Number(timestamp) })
    }

    return acc
  }, [])
}

const getLightHouseData = (parent, args, context, info) => {
  const { taskId, subtype, stime, etime } = args

  switch (subtype) {
    case 'report':
      return Promise.resolve(readLightHouseReportData(taskId, stime, etime)).then((report) => ({
        report,
      }))

    case 'performance':
      return Promise.resolve(readLightHouseMetricsData(taskId, stime, etime)).then((performance) => ({
        performance,
      }))

    default:
      return Promise.all([
        () => readLightHouseReportData(taskId, stime, etime),
        () => readLightHouseMetricsData(taskId, stime, etime),
      ]).then(([report, performance]) => ({
        report,
        performance,
      }))
  }
}

module.exports = { getLightHouseData }
