import cron from 'node-cron'

import { updateTaskState } from '../resolvers/models/Task'

class TaskManager {
  tasks = { data: [], timestamp: Date.now() }
  schedule
  state = {
    waits: [],
    doing: { task: undefined, startedAt: 0 },
    done: { task: undefined, endedAt: 0 },
  }
  db
  pubsub
  collector = {}

  constructor({ prisma, pubsub, collector }) {
    if (!prisma) return

    this.db = prisma.task
    this.pubsub = pubsub
    this.collector = collector

    this.schedule = cron.schedule(
      '*/5 * * * * *',
      async () => {
        await this.db
          .findMany({
            include: {
              tags: true, // Return all fields
            },
          })
          .then((result) => {
            this.setTasks(result)
          })
          .catch((error) => {
            console.error(error)
          })
      },
      {},
    )
  }

  getTasks = () => this.tasks
  getTaskBy = ({ taskId }) => this.tasks.data.find(({ id }) => taskId == id)

  setTasks = (data = [], timestamp = Date.now()) => {
    this.tasks.data = data
    this.tasks.timestamp = timestamp
  }

  setState = (newTask) => {
    const done = this.state.doing.task
    const now = Date.now()
    this.state.done = { task: done, endedAt: now }
    this.state.doing = { task: newTask, startedAt: now }
    this.state.waits = this.tasks.data.filter((tsk) => tsk.id !== newTask.id)

    updateTaskState.publish({ pubsub: this.pubsub, taskState: this.state })
  }

  getState = () => this.state

  getStateOf = (taskId) => {
    if (this.state.doing.task.id === taskId) {
      return 'doing'
    } else if (this.state.done.task.id === taskId) {
      return 'done'
    } else {
      return 'wait'
    }
  }

  run = async () => {
    await (async function doCollect(self) {
      const { tasks, collector, setState } = self
      await tasks.data.reduce(async (turn, task) => {
        await turn
        const { type } = task
        const Collector = collector[type]

        const runner = new Collector({ task })
        setState(task)
        return runner.do()
      }, Promise.resolve())
    })(this)

    await setTimeout(async () => {
      await this.run()
    }, 0)
  }
}

let instance
export default {
  createInstance: (props) => {
    if (!instance && props.prisma) {
      instance = new TaskManager(props)
      /**
       * singleton
       */
      Object.freeze(instance)
    }

    return instance
  },
  getInstance: () => {
    return instance
  },
}
