const { sleep } = require('../utils')
const { FILEDB_PATH } = require('../constants')
const fse = require('fs-extra')

const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const { getLightHouseReportIndexData } = require('./collectorsUtils')

class LightHouse {
  task
  constructor({ task }) {
    this.task = task
  }
  do = async () => {
    await (async () => {
      const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })
      const options = { logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port }

      // 원본 데이터
      const runnerResult = await lighthouse(this.task.name || 'https://example.com', options)
      const report = runnerResult.report
      const score = runnerResult.lhr.categories.performance.score * 100
      const reportIndexData = getLightHouseReportIndexData(report, score)

      // 파일명
      const taskId = this.task.id
      const timestamp = Date.now()
      const startOfDate = new Date().setHours(0, 0, 0, 0)

      const reportName = FILEDB_PATH.REPORT + '/' + taskId + '/' + timestamp + '.json'
      const reportIndexName = FILEDB_PATH.REPORT_INDEX + '/' + taskId + '/' + timestamp + '.json'
      const performanceName = FILEDB_PATH.METRICS + '/' + taskId + '/' + startOfDate + '.csv'

      // 데이터 저장
      Promise.all([
        fse.outputFileSync(reportName, report),
        fse.readJsonSync(reportName),
        fse.outputJSONSync(reportIndexName, reportIndexData),
      ])
        .then(([_, report]) => {
          const isExist = fse.pathExistsSync(performanceName)
          const metrics = report.audits.metrics.details || {}

          const metricsItems = metrics.items || []
          const csv = metricsItems.reduce(
            (acc, items) => {
              Object.entries(items).forEach(([key, value]) => {
                acc.header.push(key)
                acc.values.push(value)
              })
              return acc
            },
            { header: ['time', 'taskId', 'score'], values: [timestamp, taskId, score] },
          )

          if (isExist) {
            fse.appendFile(performanceName, '\n' + csv.values.join(','))
          } else {
            fse.outputFile(performanceName, [csv.header.join(','), csv.values.join(',')].join('\n'))
          }
        })
        .catch((err) => {
          console.error(err)
        })

      await chrome.kill()
    })()
    await sleep(() => {
      console.log('LightHouse.done', this.task.id, Date.now())
    }, process.env.LIGHTHOUSE_SLEEP_INTERVAL_BETWEEN_TASK)
  }
}

module.exports = LightHouse
