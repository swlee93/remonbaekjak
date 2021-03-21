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

module.exports = { getTasks, createTask }
