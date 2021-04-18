async function getTasks(parent, args, context) {
  return await context.prisma.task.findMany()
}

async function createTask(parent, args, context, info) {
  const { name, description = '', type = process.env.DEFAULT_TASK_TYPE } = args
  const userId = context?.userId

  const created = await context.prisma.task.create({
    data: {
      name,
      description,
      type,
      // userId,
      user: { connect: { id: userId } },
    },
  })

  return created
}

export { getTasks, createTask }
