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
      const reportHtml = runnerResult.report
      const datenow = Date.now()
      const reportName = 'filedb/lighthouse/report/' + this.task.id + '/' + datenow + '.json'
      const performanceName = 'filedb/lighthouse/performance/' + this.task.id + '/' + datenow + '.json'
      Promise.all([
        fse.outputFile(reportName, reportHtml),
        fse.outputJSON(performanceName, runnerResult.lhr.categories.performance),
      ]).catch((err) => {
        console.error(err)
      })

      // `.lhr` is the Lighthouse Result as a JS object
      console.log('Report is done for', runnerResult.lhr.finalUrl)
      console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100)

      await chrome.kill()
    })()
    await sleep(() => {
      console.log('LightHouse.done', this.task.id, Date.now())
    }, 5000)
  }
}

module.exports = LightHouse
