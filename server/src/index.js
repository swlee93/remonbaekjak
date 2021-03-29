require('dotenv').config()

const fs = require('fs')
const path = require('path')
const { ApolloServer, PubSub } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')
const { makeExecutableSchema } = require('graphql-tools')

const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json')

const TaskManager = require('./schedules/TaskManager')
const ClearingFileDB = require('./schedules/ClearingFileDB')
const LightHouse = require('./collectors/LightHouse')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')

/**
 * context
 */
const pubsub = new PubSub()
const prisma = new PrismaClient({
  errorFormat: 'minimal',
})

/**
 * schedules
 */
const taskManager = TaskManager.createInstance({ prisma, collector: { LIGHTHOUSE: LightHouse } })

const clearing = ClearingFileDB.createInstance()

/**
 * resolvers
 */
const resolvers = {
  Query,
  Mutation,
  Subscription,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
}

/**
 * server
 */
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      taskManager,
    }
  },

  subscriptions: {
    onConnect: (connectionParams) => {
      return {
        prisma,
      }
    },
    onDisconnect: (connectionParams) => {},
  },
})

/**
 * server.listen
 */
server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
})
