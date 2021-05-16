import boomcatch from 'boomcatch'

const path = require('path')

const run = () => {
  console.log('boomcatch.run()')

  boomcatch.listen({
    // host: 'rum.example.com', // Defaults to '0.0.0.0' (INADDR_ANY)
    host: 'localhost',
    port: 8888, // Defaults to 80 for HTTP or 443 for HTTPS
    // https: true, // Defaults to false
    // httpsKey: 'foo.key',
    // httpsCert: 'bar.cert',
    // httpsPass: 'baz',
    // path: '/perf', // Defaults to '/beacon'
    // referer: /^\w+\.example\.com$/, // Defaults to /.*/
    // origin: [
    //   // Defaults to '*'
    //   'http://foo.example.com',
    //   'http://bar.example.com',
    // ],
    // limit: 100, // Defaults to 0
    // maxSize: 1048576, // Defaults to -1
    log: console, // Defaults to object with `info`, `warn` and `error` log functions.
    // workers: require('os').cpus().length, // Defaults to 0
    // validator: path.resolve('./myvalidator'), // Defaults to 'permissive'
    mapper: path.resolve('./dist/boomcatch/WhaTapStatsD'), //path.resolve('./mymapper'), // Defaults to 'statsd'
    // prefix: 'mystats.rum.', // Defaults to ''
    forwarder: 'udp', //'file', //'http', // Defaults to 'udp',
    // fwdUrl: 'https://127.0.0.1:8125/', // No default
    fwdHost: '127.0.0.1',
    fwdPort: 8125,
    // fwdMethod: 'POST', // Defaults to 'GET'
    // fwdDir: path.resolve('filedb/br') // <path>: Directory to write mapped data to. This option is only effective with the file forwarder.
  })
}

export default { run }
