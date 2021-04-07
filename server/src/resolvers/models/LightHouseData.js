const fse = require('fs-extra')
const csv = require('csvtojson')

const getTargetFileList = (root, dir, extention) => {
  let files = []
  if (dir) {
    const path = `${root}/${dir}`
    let pathFiles = []
    if (fse.pathExistsSync(path)) {
      pathFiles = fse.readdirSync(path)
    }
    pathFiles.forEach((pathFile) => {
      const [name] = pathFile.split(`.${extention}`)
      files.push({ path: `${path}/${pathFile}`, name })
    })
  } else {
    // dir 없는 경우 => 전체 dir 읽기
    if (fse.pathExistsSync(root)) {
      const rootfolders = fse.readdirSync(root)
      files = rootfolders.reduce((acc, rootfolder) => {
        const rootpath = `${root}/${rootfolder}`
        let rootpathFiles = []
        if (fse.pathExistsSync(rootpath)) {
          rootpathFiles = fse.readdirSync(rootpath)
        }
        rootpathFiles.forEach((subfile) => {
          const [name] = subfile.split(`.${extention}`)
          acc.push({ path: `${rootpath}/${subfile}`, name })
        })
        return acc
      }, [])
    }
  }
  return files
}

const readLightHouseReportData = async (taskId, stime = Date.now() - 86400000, etime = Date.now()) => {
  let files = getTargetFileList('filedb/lighthouse/report', taskId, 'json')

  return await files.reduce((acc, { path, name }) => {
    const timestamp = Number(name)

    if (stime < timestamp && etime > timestamp) {
      let data = fse.readFileSync(path).toString()
      acc.push({ data, timestamp })
    }

    return acc
  }, [])
}

const readLightHouseMetricsData = async (taskId, stime = Date.now() - 86400000, etime = Date.now(), includeColumns) => {
  let files = getTargetFileList('filedb/lighthouse/performance', taskId, 'csv')
  let results = []
  await files.reduce(async (acc, { path, name }) => {
    await acc
    const timestamp = Number(name)

    if (stime < timestamp && etime > timestamp) {
      return csv({ includeColumns: includeColumns ? new RegExp(`time|taskId|${includeColumns}`) : undefined })
        .fromFile(path)
        .then(async (result) => {
          results = [...results, ...result]
        })
    }
    return acc
  }, Promise.resolve())

  return results
}

const getLightHouseReportInfo = async (parent, args, context, info) => {
  const { stime = Date.now() - 86400000, etime = Date.now() } = args
  const { taskManager } = context
  const reportpath = 'filedb/lighthouse/report'
  let taskIds = []
  if (fse.pathExistsSync(reportpath)) {
    taskIds = fse.readdirSync(reportpath)
  }

  return await taskIds.reduce((acc, taskId) => {
    const filepath = `${reportpath}/${taskId}`
    let files = []
    if (fse.pathExistsSync(filepath)) {
      files = fse.readdirSync(filepath)
    }
    files.forEach((filename) => {
      const timestamp = Number(filename.split('.')[0])

      if (stime < timestamp && etime > timestamp) {
        const task = taskManager.getTaskBy({ taskId })
        acc.push({ task, timestamp })
      }
    })

    return acc
  }, [])
}

const getLightHouseData = (parent, args, context, info) => {
  const { taskId, subtype, stime, etime, includeColumns } = args

  switch (subtype) {
    case 'report':
      return Promise.resolve(readLightHouseReportData(taskId, stime, etime)).then((report) => ({
        report,
      }))

    case 'performance':
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

module.exports = { getLightHouseData, getLightHouseReportInfo }
