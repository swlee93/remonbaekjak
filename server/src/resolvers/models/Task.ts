async function getTasks(parent, args, context) {
  const userId = context?.userId
  console.log('getTasks', userId)
  return await context.prisma.task.findMany({
    where: {
      userId,
    },
  })
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
