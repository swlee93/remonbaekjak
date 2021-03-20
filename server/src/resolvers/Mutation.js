const { createTask } = require('./models/Task')

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const { APP_SECRET } = require('../utils')
// async function post(parent, args, context, info) {
//   const { userId } = context

//   const newLink = await context.prisma.link.create({
//     data: {
//       url: args.url,
//       description: args.description,
//       postedBy: { connect: { id: userId } },
//     },
//   })
//   context.pubsub.publish('NEW_LINK', newLink)

//   return newLink
// }

// async function signup(parent, args, context, info) {
//   const password = await bcrypt.hash(args.password, 10)
//   const user = await context.prisma.user.create({
//     data: { ...args, password },
//   })

//   const token = jwt.sign({ userId: user.id }, APP_SECRET)

//   return {
//     token,
//     user,
//   }
// }

// async function login(parent, args, context, info) {
//   const user = await context.prisma.user.findUnique({
//     where: { email: args.email },
//   })
//   if (!user) {
//     throw new Error('No such user found')
//   }

//   const valid = await bcrypt.compare(args.password, user.password)
//   if (!valid) {
//     throw new Error('Invalid password')
//   }

//   const token = jwt.sign({ userId: user.id }, APP_SECRET)

//   return {
//     token,
//     user,
//   }
// }

// async function vote(parent, args, context, info) {
//   const { userId } = context
//   const vote = await context.prisma.vote.findUnique({
//     where: {
//       linkId_userId: {
//         linkId: Number(args.linkId),
//         userId: userId,
//       },
//     },
//   })

//   if (Boolean(vote)) {
//     throw new Error(`Already voted for link: ${args.linkId}`)
//   }

//   const newVote = context.prisma.vote.create({
//     data: {
//       user: { connect: { id: userId } },
//       link: { connect: { id: Number(args.linkId) } },
//     },
//   })
//   context.pubsub.publish('NEW_VOTE', newVote)

//   return newVote
// }
// /**
//  * @name subscribe
//  * @param {*} parent
//  * @param {*} args
//  * @param {*} context
//  * @param {*} info
//  */
// async function subscribe(parent, args, context, info) {
//   const { subjectId } = args
//   const { name, description } = context
//   const subject = await context.prisma.subject.findUnique({
//     where: {
//       subjectId: {
//         subjectId: Number(subjectId),
//       },
//     },
//   })

//   if (Boolean(subject)) {
//     throw new Error(`Already subscribed for subject: ${subjectId}`)
//   }

//   const observer = context.prisma.observer.create({
//     data: {
//       subject: { connect: { id: subjectId } },
//       name,
//       description,
//     },
//   })
//   context.pubsub.publish('SUBSCRIBE_DEFAULT', observer)

//   return observer
// }

// async function createSubject(parent, args, context, info) {
//   const { userId } = context
//   const { name, description } = args
//   console.log('createSubject', name, description, userId)
//   const subject = await context.prisma.subject.create({
//     data: {
//       name,
//       description,
//       createdById: userId || 'GUEST',
//     },
//   })
//   context.pubsub.publish('CREATE_SUBJECT', subject)

//   return subject
// }

module.exports = {
  createTask,
  // post,
  // signup,
  // login,
  // vote,
  // subscribe,
  // createSubject,
}
