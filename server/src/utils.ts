function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export async function sleep(fn, interval = 5000, ...args) {
  await timeout(interval)
  return fn(...args)
}

const jwt = require('jsonwebtoken')

export const APP_SECRET = 'app_secret'

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET)
}

export const getUserId = (req: any, authToken?: string) => {
  if (req) {
    const authHeader = req.headers.authorization
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '')
      if (!token) {
        throw new Error('No token found')
      }
      const { userId } = getTokenPayload(token)
      return userId
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken)
    return userId
  }

  throw new Error('Not authenticated')
}
