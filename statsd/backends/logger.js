require('dotenv').config()
const { createLogger, transports } = require('winston')
const WinstonLogStash = require('winston3-logstash-transport')

const logger = createLogger({
  transports: [
    new transports.File({ filename: 'stats.log' }),
    new WinstonLogStash({
      mode: 'tcp',
      host: '0.0.0.0',
      port: 28777,
    }),
  ],
})

class Logger {
  constructor(startupTime, config, emitter) {
    var self = this
    this.lastFlush = startupTime
    this.lastException = startupTime
    this.config = config.console || {}

    // attach
    emitter.on('flush', function (timestamp, metrics) {
      self.flush(timestamp, metrics)
    })
    emitter.on('status', function (callback) {
      self.status(callback)
    })
  }

  flush = (timestamp, metrics) => {
    if (metrics.counters['statsd.metrics_received']) {
      console.log('Flushing stats at ', new Date(timestamp * 1000).toString())

      logger.log({
        level: 'info',
        timestamp,
        message: {
          counters: metrics.counters,
          timers: metrics.timers,
          gauges: metrics.gauges,
          timer_data: metrics.timer_data,
          counter_rates: metrics.counter_rates,
          sets: ((vals) => {
            let ret = {}
            for (let val in vals) {
              ret[val] = vals[val].values()
            }
            return ret
          })(metrics.sets),
          pctThreshold: metrics.pctThreshold,
        },
      })
    }
  }

  status = (write) => {
    ;['lastFlush', 'lastException'].forEach(function (key) {
      write(null, 'console', key, this[key])
    }, this)
  }
}

exports.init = (startupTime, config, events) => {
  const instance = new Logger(startupTime, config, events)

  return true
}
