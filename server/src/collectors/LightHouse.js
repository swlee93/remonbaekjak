const { sleep } = require('../utils')

const fse = require('fs-extra')

const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

class LightHouse {
  task
  constructor({ task }) {
    this.task = task
  }
  do = async () => {
    await (async () => {
      const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })
      const options = { logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port }
      const runnerResult = await lighthouse(this.task.name || 'https://example.com', options)

      // `.report` is the HTML report as a string
      const reportJson = runnerResult.report
      const now = Date.now()
      const startOfDate = new Date().setHours(0, 0, 0, 0)

      const reportName = 'filedb/lighthouse/report/' + this.task.id + '/' + now + '.json'
      const performanceName = 'filedb/lighthouse/performance/' + this.task.id + '/' + startOfDate + '.csv'

      Promise.all([fse.outputFileSync(reportName, reportJson), fse.readJsonSync(reportName)])
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
            { header: ['time'], values: [now] },
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
    }, 5000)
  }
}

module.exports = LightHouse
