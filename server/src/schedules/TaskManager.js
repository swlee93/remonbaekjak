const cron = require('node-cron')

class TaskManager {
  taskLoader
  tasks = { cursor: 0, list: [] }
  constructor({ prisma }) {
    this.taskLoader = cron.schedule('*/5 * * * * *', () => {
      try {
        this.setTasks([Date.now()])

        console.log('Running Cron Main Job?', this.getTasks())
      } catch (error) {
        console.error(error)
      }
    })
  }

  getTasks = () => this.tasks

  setTasks = (list = [], cursor = 0) => {
    this.tasks.list = list
    this.tasks.cursor = cursor
  }
}

let instance
module.exports = {
  TaskManager: {
    createInstance: (props) => {
      if (!instance) {
        instance = new TaskManager(props)
        Object.freeze(instance)
      }
      return instance
    },
    getInstance: (props) => {
      return instance
    },
  },
}
