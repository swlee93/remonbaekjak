const cron = require('node-cron')

class TaskManager {
  tasks = { data: [], timestamp: Date.now() }
  schedule
  db
  collector = {}

  constructor({ prisma, collector }) {
    if (!prisma) return

    this.db = prisma.task
    this.collector = collector
    this.schedule = cron.schedule('*/5 * * * * *', async () => {
      await this.db
        .findMany()
        .then((result) => {
          this.setTasks(result)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }

  getTasks = () => this.tasks

  setTasks = (data = [], timestamp = Date.now()) => {
    console.log('[TaskManager] setTasks', new Date(timestamp))
    this.tasks.data = data
    this.tasks.timestamp = timestamp
  }

  run = async () => {
    await (async function doCollect(tasks, collector) {
      await tasks.reduce(async (turn, task) => {
        await turn
        const { type } = task
        const Collector = collector[type]

        const runner = new Collector({ task })
        return runner.do()
      }, Promise.resolve())
    })(this.tasks.data, this.collector)

    await setTimeout(async () => {
      await this.run()
    }, 0)
  }
}

let instance
module.exports = {
  createInstance: (props) => {
    if (!instance && props.prisma) {
      instance = new TaskManager(props)
      /**
       * singleton
       */
      Object.freeze(instance)
    }
    // run
    instance.run()
    return instance
  },
  getInstance: (props) => {
    return instance
  },
}
