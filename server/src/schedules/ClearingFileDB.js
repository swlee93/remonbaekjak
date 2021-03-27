const cron = require('node-cron')
const TaskManager = require('./TaskManager')
const fse = require('fs-extra')

const FILEDB_PATH = 'filedb'
const getLightHousePathBy = (taskSubType, taskId) => [FILEDB_PATH, 'lighthouse', taskSubType, taskId].join('/')

class ClearingFileDB {
  taskManager
  schedule

  remove = (taskSubType, taskId, expire) => {
    const dbpath = getLightHousePathBy(taskSubType, taskId)

    if (fse.pathExistsSync(dbpath)) {
      const fiels = fse.readdirSync(dbpath)
      if (fiels) {
        fiels.forEach((filename) => {
          const timestamp = parseInt(filename)
          if (expire > timestamp) {
            fse.removeSync(dbpath + '/' + filename)
          }
        })
      }
    }
  }
  constructor() {
    this.taskManager = TaskManager.getInstance()
    this.schedule = cron.schedule('*/5 * * * * *', async () => {
      const tasks = this.taskManager.getTasks()
      const expire = Date.now() - parseInt(process.env.DEFAULT_EXPIRE)
      tasks.data.forEach((task) => {
        this.remove('performance', task.id, expire)
        this.remove('report', task.id, expire)
      })
    })
  }
}

let instance
module.exports = {
  createInstance: (props) => {
    if (!instance) {
      instance = new ClearingFileDB(props)
      Object.freeze(instance)
    }
    return instance
  },
  getInstance: (props) => {
    return instance
  },
}
