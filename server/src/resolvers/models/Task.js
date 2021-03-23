const fse = require('fs-extra')

async function getTasks(parent, args, context) {
  return await context.prisma.task.findMany()
  //   context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy()
}

async function createTask(parent, args, context, info) {
  const { userId } = context

  const created = await context.prisma.task.create({
    data: {
      name: args.name,
      description: args.description || '',
      type: args.type || process.env.DEFAULT_TASK_TYPE,
      createdBy: args.createdBy || userId || process.env.DEFAULT_TASK_CREATEDBY,
    },
  })

  return created
}

async function getLightHouseData(parent, args, context, info) {
  const reportpath = 'filedb/lighthouse/report/' + args.taskId
  const performancepath = 'filedb/lighthouse/performance/' + args.taskId
  let files = []

  if (fse.pathExistsSync(reportpath)) {
    files = fse.readdirSync(reportpath)
  }
  const results = await files.reduce((acc, filename) => {
    const timestamp = filename.split('.')[0]
    const reportfile = reportpath + '/' + timestamp + '.json'
    const performancefile = performancepath + '/' + timestamp + '.json'
    try {
      const report = fse.readFileSync(reportfile).toString()
      const performance = fse.readFileSync(performancefile).toString()
      acc.push({ report, performance, timestamp: Number(timestamp) })
    } catch (error) {
      console.log('error', error)
    }

    return acc
  }, [])
  return results
}

module.exports = { getTasks, createTask, getLightHouseData }
