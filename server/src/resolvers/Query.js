// async function feed(parent, args, context, info) {
//   const where = args.filter
//     ? {
//         OR: [{ description: { contains: args.filter } }],
//       }
//     : {}

//   const subjects = await context.prisma.subjects.findMany({
//     where,
//     skip: args.skip,
//     take: args.take,
//     orderBy: args.orderBy,
//   })

//   const count = await context.prisma.link.count({ where })

//   return {
//     id: 'main-feed',
//     subjects,
//     count,
//   }
// }
const { getTasks } = require('./models/Task')

module.exports = { getTasks }
