import { sleep } from '../utils'
import { FILEDB_PATH } from '../constants'
import fse from 'fs-extra'

import lighthouse from 'lighthouse'
const chromeLauncher = require('chrome-launcher')

import { getLightHouseReportIndexData } from './collectorsUtils'

class LightHouse {
  task
  constructor({ task }) {
    this.task = task
  }
  do = async () => {
    await (async () => {
      if (!chromeLauncher) {
        throw '!chromeLauncher'
      }

      const lhRequestUrl = this.task?.tags?.find((tag) => tag.key === 'lh_request_url')?.value
      if (!lhRequestUrl) {
        throw '!lhRequestUrl'
      }
      
      const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })
      const options = { logLevel: '', output: 'json', onlyCategories: ['performance'], port: chrome.port }

      // 원본 데이터
      const runnerResult = await lighthouse(lhRequestUrl, options)
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
      .catch((error) => {
        console.error('LightHouse.error', error?.code || error)
      })
      .finally(() => {
        console.log('LightHouse.done', this.task.id, Date.now())
      })
    // 과도한 요청 방지 차원에서 sleep
    await sleep(() => {}, Number(process.env.LIGHTHOUSE_SLEEP_INTERVAL_BETWEEN_TASK))
  }
}

export default LightHouse
