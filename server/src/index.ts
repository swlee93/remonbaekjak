import 'reflect-metadata'
import dotenv from 'dotenv'

import { ApolloServer, PubSub } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json'

import TaskManager from './schedules/TaskManager'
import ClearingFileDB from './schedules/ClearingFileDB'
import LightHouse from './collectors/LightHouse'

import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
// import Subscription from './resolvers/Subscription'

import path from 'path'
import fs from 'fs'
import { getUserId } from './utils'

const schema = [fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')]

dotenv.config()

const main = async () => {
  const pubsub = new PubSub()
  const prisma = new PrismaClient({
    errorFormat: 'minimal',
  })

  const taskManager = TaskManager.createInstance({ prisma, collector: { LIGHTHOUSE: LightHouse } })
  ClearingFileDB.createInstance()

  const resolvers = {
    Query,
    Mutation,
    // Subscription,
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
  }

  /**
   * server
   */
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req }) => {
      const userId = req && req.headers.authorization ? getUserId(req) : null
      return {
        ...req,
        prisma,
        pubsub,
        taskManager,
        userId,
      }
    },

    subscriptions: {
      onConnect: (connectionParams: any) => {
        if (connectionParams.authToken) {
          return {
            prisma,
            userId: getUserId(null, connectionParams.authToken),
          }
        } else {
          return {
            prisma,
          }
        }
      },
      onDisconnect: () => {},
    },
  })

  /**
   * server.listen
   */
  server.listen().then(({ url }) => {
    console.log(`Server is running on ${url}`)
  })
}

main().catch((err) => {
  console.log(err)
})
