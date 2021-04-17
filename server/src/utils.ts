function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export async function sleep(fn, interval = 5000, ...args) {
  await timeout(interval)
  return fn(...args)
}
