function newLinkSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator('NEW_LINK')
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => {
    return payload
  },
}

function newVoteSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator('NEW_VOTE')
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload) => {
    return payload
  },
}
////
function subjectSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator('CREATE_SUBJECT')
}

const createSubject = {
  subscribe: subjectSubscribe,
  resolve: (payload) => {
    return payload
  },
}
function subscribeDefault(parent, args, context, info) {
  return context.pubsub.asyncIterator('SUBSCRIBE_DEFAULT')
}

const registerObserver = {
  subscribe: subscribeDefault,
  resolve: (payload) => {
    return payload
  },
}

module.exports = {
  newLink,
  newVote,
  createSubject,
  registerObserver,
}
