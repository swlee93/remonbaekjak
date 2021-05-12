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
import Subscription from './resolvers/Subscription'

import path from 'path'
import fs from 'fs'
import { getUserId } from './utils'

import boomcatch from './boomcatch'

const schema = [fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')]

dotenv.config()

const main = async () => {
  const pubsub = new PubSub()

  const prisma = new PrismaClient({
    errorFormat: 'minimal',
  })

  const taskManager = TaskManager.createInstance({ prisma, pubsub, collector: { LIGHTHOUSE: LightHouse } })

  const clearingFileDB = ClearingFileDB.createInstance()

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
    typeDefs: schema,
    resolvers,

    subscriptions: {
      path: '/subscriptions',
      onConnect: (connectionParams: any) => {
        console.log('subscriptions.onConnect')
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
      onDisconnect: () => {
        console.log('subscriptions.onDisconnect')
      },
    },
    context: ({ req, connection }) => {
      // context의 return 값이 최종적으로 실행 쿼리의 context로 반환되기 때문에
      // connection(ws)의 userId를 참조
      const userId = req && req.headers.authorization ? getUserId(req) : connection?.context?.userId || null

      return {
        ...req,
        prisma,
        pubsub,
        taskManager,
        userId,
      }
    },
  })

  /**
   * server.listen
   */
  server.listen().then(({ url }) => {
    taskManager.run()
    clearingFileDB.run()
    boomcatch.run()
    console.log(`Server is running on ${url}`)
  })
}

main().catch((err) => {
  console.log(err)
})
