export default {
  updateTaskState: {
    subscribe: (parent, args, context) => {
      const { pubsub } = context
      return pubsub.asyncIterator('updateTaskState')
    },
  },
}
