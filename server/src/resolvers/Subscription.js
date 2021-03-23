const createSprint = {
  subscribe: (parent, args, context, info) => {
    return context.pubsub.asyncIterator('CREATE_SPRINT')
  },
  resolve: (payload) => {
    return payload
  },
}

const registObserver = {
  subscribe: (parent, args, context, info) => {
    return context.pubsub.asyncIterator('REGIST_OBSERVER')
  },
  resolve: (payload) => {
    return payload
  },
}

module.exports = {
  // newLink,
  // newVote,
  createSprint,
  registObserver,
}
