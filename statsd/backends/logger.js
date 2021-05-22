/*jshint node:true, laxcomma:true */

const util = require('util')
const { createLogger, format, transports } = require('winston')
const { combine, label, printf, json, logstash } = format

const logger = createLogger({
  level: 'info',
  format: printf(({ message, timestamp }) => `[${timestamp}]${JSON.stringify(message)}`),
  transports: [new transports.File({ filename: 'stats.log' })],
})

//

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
    console.log('Flushing stats at ', new Date(timestamp * 1000).toString(), metrics)
    if (metrics.counters['statsd.metrics_received']) {
      logger.log({
        level: 'info',
        timestamp,
        message: {
          counters: metrics.counters,
          timers: metrics.timers,
          gauges: metrics.gauges,
          timer_data: metrics.timer_data,
          counter_rates: metrics.counter_rates,
          sets: (function (vals) {
            var ret = {}
            for (var val in vals) {
              ret[val] = vals[val].values()
            }
            return ret
          })(metrics.sets),
          pctThreshold: metrics.pctThreshold,
        },
      })
    } else {
      console.log('!metrics.counters.statsd.metrics_received')
    }
  }

  status = (write) => {
    ;['lastFlush', 'lastException'].forEach(function (key) {
      write(null, 'console', key, this[key])
    }, this)
  }
}

exports.init = function (startupTime, config, events) {
  var instance = new Logger(startupTime, config, events)
  return true
}
