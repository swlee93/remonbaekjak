const { TASK_TYPE, FILEDB_PATH } = require('../../constants')
const { getTargetFileList } = require('../resolveUtils')
const fse = require('fs-extra')

const ensureJson = (data) => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch (erro) {
      return {}
    }
  }
  return data
}

const getLightHouseReportAuditSummary = (original = {}, score = 0) => {
  const data = ensureJson(original)
  const { audits } = data

  let summary = { audits: {}, score }
  if (audits) {
    Object.entries(audits).forEach(
      ([key, { title, score, numericValue, numericUnit, displayValue, scoreDisplayMode }]) => {
        if (scoreDisplayMode === 'numeric') {
          summary.audits[key] = { title, score, numericValue, numericUnit, displayValue }
        }
      },
    )
  }

  return summary
}

const getReportInfoByTimestamp = async (parent, args, context, info) => {
  const { taskType, timestamp: argTimestamp, taskId: argTaskId } = args
  const { taskManager } = context

  switch (taskType) {
    case TASK_TYPE.LIGHTHOUSE:
    default:
      const files = getTargetFileList(FILEDB_PATH.REPORT, argTaskId, 'json')

      return await files.reduce((acc, { path, name, timestamp, taskId }) => {
        if (timestamp === argTimestamp && !acc.timestamp) {
          const task = taskManager.getTaskBy({ taskId })
          const data = fse.readJsonSync(path) || {}
          // push
          return { task, timestamp, data }
        }
        return acc
      }, {})
  }
}

const getReportInfo = async (parent, args, context, info) => {
  const { taskType, stime = Date.now() - 86400000, etime = Date.now() } = args

  switch (taskType) {
    case TASK_TYPE.LIGHTHOUSE:
    default:
      const { taskManager } = context
      const files = getTargetFileList(FILEDB_PATH.REPORT_SUMMARY, undefined, 'json')

      return await files.reduce((acc, { path, name, timestamp, taskId }) => {
        if (stime < timestamp && etime > timestamp) {
          const task = taskManager.getTaskBy({ taskId })
          const data = fse.readJsonSync(path) || {}
          // push
          acc.push({ task, timestamp, data })
        }

        return acc
      }, [])
  }
}

module.exports = { getReportInfo, getReportInfoByTimestamp, getLightHouseReportAuditSummary }
