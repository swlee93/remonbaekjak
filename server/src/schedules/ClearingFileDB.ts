import cron from 'node-cron'
import TaskManager from './TaskManager'
import fse from 'fs-extra'

const FILEDB_PATH = 'filedb'

const getLightHousePathBy = (taskSubType, taskId) => [FILEDB_PATH, 'lighthouse', taskSubType, taskId].join('/')

class ClearingFileDB {
  taskManager

  constructor() {
    this.taskManager = TaskManager.getInstance()
  }

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

  run = () => {
    cron.schedule(
      '*/5 * * * * *',
      async () => {
        const tasks = this.taskManager.getTasks()
        const expire = Date.now() - parseInt(process.env.DEFAULT_EXPIRE)
        tasks.data.forEach((task) => {
          this.remove('performance', task.id, expire)
          this.remove('report', task.id, expire)
        })
      },
      {},
    )
  }
}

let instance
export default {
  createInstance: () => {
    if (!instance) {
      instance = new ClearingFileDB()
      Object.freeze(instance)
    }
    return instance
  },
  getInstance: () => {
    return instance
  },
}
