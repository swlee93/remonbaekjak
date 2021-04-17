export const objectToString = (obj: any = {}): string =>
  Object.keys(obj)
    .sort()
    .reduce<string>((acc, key) => {
      const value: any = obj[key]
      switch (typeof value) {
        case 'string':
        case 'undefined':
        case 'boolean':
        case 'number':
          return (acc += `${key}:${value}`)
        case 'object':
          return (acc += `${key}:${objectToString(value)}`)
        default:
          return acc
      }
    }, '')

export const getVariablesFromMatchProps = (query: string = '', props: any = {}) => {
  const regex = /(?<!\\)\$([^\W$]+)/g
  let variables: any = {}
  let test
  while ((test = regex.exec(query))) {
    const matchKey = test[1]
    if (matchKey && props.hasOwnProperty(matchKey)) {
      variables[matchKey] = props[matchKey]
    }
  }

  return variables
}

export const isNotEmpty = (value: any) => {
  switch (typeof value) {
    case 'string':
    case 'undefined':
    case 'boolean':
    case 'number':
      return !!value
    case 'object':
      return !!Object.keys(value).length
    default:
      return true
  }
}
