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
const { getTasks } = require('./models/Task')
const { getLightHouseData } = require('./models/LightHouseData')
const { getSettings } = require('./models/Settings')

module.exports = { getTasks, getLightHouseData, getSettings }
