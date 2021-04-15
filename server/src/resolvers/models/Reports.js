const { TASK_TYPE, FILEDB_PATH } = require('../../constants')
const { getTargetFileList } = require('../resolveUtils')
const fse = require('fs-extra')

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

const getReportInfos = async (parent, args, context, info) => {
  const now = Date.now()
  const { taskType, taskId, stime = now - 86400000, etime = now, first = 5, after = 0 } = args

  switch (taskType) {
    case TASK_TYPE.LIGHTHOUSE:
    default:
      const { taskManager } = context
      const list = getTargetFileList(FILEDB_PATH.REPORT_INDEX, taskId, 'json', {
        stime,
        etime,
        reverse: true,
      })
      const index = after ? list.findIndex((item) => item.timestamp === after) : 0
      console.log('list', list, after, index)
      const offset = index + 1
      const files = list.slice(offset, offset + first)
      const last = files[files.length - 1]

      return {
        pageInfo: {
          endCursor: last.timestamp,
          hasNextPage: offset + first < list.length,
        },
        edges: await files.map(({ path, timestamp, taskId: tId }) => {
          const task = taskManager.getTaskBy({ taskId: tId })
          const data = fse.readJsonSync(path) || {}
          return { cursor: timestamp, node: { task, timestamp, data } }
        }),
      }
  }
}

module.exports = { getReportInfos, getReportInfoByTimestamp }
