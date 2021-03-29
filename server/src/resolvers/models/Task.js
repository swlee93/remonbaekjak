async function getTasks(parent, args, context) {
  return await context.prisma.task.findMany()
  //   context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy()
}

async function createTask(parent, args, context, info) {
  const { userId } = context
  const { name, description = '', type = process.env.DEFAULT_TASK_TYPE, createdBy } = args

  const created = await context.prisma.task.create({
    data: {
      name,
      description,
      type,
      createdBy: createdBy || userId || process.env.DEFAULT_TASK_CREATEDBY,
    },
  })

  return created
}

module.exports = { getTasks, createTask }
