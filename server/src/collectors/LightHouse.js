const { sleep } = require('../utils')

class LightHouse {
  task
  constructor({ task }) {
    this.task = task
  }
  do = async () => {
    await sleep(() => {
      console.log('LightHouse.do', this.task.id, Date.now())
    })
  }
}

module.exports = LightHouse
