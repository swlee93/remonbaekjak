import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { APP_SECRET } from '../../utils'

export async function getUser(parent, args, context, info) {
  const userId = jwt.verify(args.token, APP_SECRET)?.userId

  const user = await context.prisma.user.findUnique({
    where: { id: userId },
  })
  if (!user) {
    throw new Error('No such user found')
  }
  return user
}

export async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({
    data: { ...args, password },
  })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

export async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}
