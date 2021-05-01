import { Prisma } from '.prisma/client'

async function getTasks(parent, args, context) {
  const userId = context?.userId
  return await context.prisma.task.findMany({
    where: {
      userId,
    },
    include: {
      tags: true, // Return all fields
    },
  })
}

async function createTask(parent, args, context, info) {
  const { name = '', description = '', type = process.env.DEFAULT_TASK_TYPE, tags = [] } = args
  const userId = context?.userId
  let task: Prisma.TaskCreateInput = {
    name,
    description,
    type,
    tags: {
      create: tags,
    },
    user: { connect: { id: userId } },
  }
  return await context.prisma.task.create({ data: task })
}

async function deleteTask(parent, args, context, info) {
  const { id } = args

  const deleted = await context.prisma.task.delete({
    where: {
      id,
    },
  })

  return deleted
}

export { getTasks, createTask, deleteTask }
