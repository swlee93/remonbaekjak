// async function feed(parent, args, context, info) {
//   const where = args.filter
//     ? {
//         OR: [{ description: { contains: args.filter } }],
//       }
//     : {}

//   const sprints = await context.prisma.sprints.findMany({
//     where,
//     skip: args.skip,
//     take: args.take,
//     orderBy: args.orderBy,
//   })

//   const count = await context.prisma.link.count({ where })

//   return {
//     id: 'main-feed',
//     sprints,
//     count,
//   }
// }
const { getTasks, getLightHouseData } = require('./models/Task')

module.exports = { getTasks, getLightHouseData }
