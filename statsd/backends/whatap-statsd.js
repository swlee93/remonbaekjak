const WhaTap = require('whatap-statsd');
const JSURL = require('jsurl');
const unhashTag = (taghash = '') => {
  return JSURL.tryParse(
    taghash.replace('__DOT__', '.').replace('__ADDR__', '@').replace('__BAR__', '|'),
    '__invalid__',
  );
};

class WhatapStatsD extends WhaTap {
  constructor(startupTime, config, emitter) {
    super();

    this.lastFlush = startupTime;
    this.lastException = startupTime;

    this.config = config.console || {};

    // attach
    emitter.on('flush', (timestamp, metrics) => {
      this.flush(timestamp, metrics);
    });
    emitter.on('status', (callback) => {
      this.status(callback);
    });
  }

  isWritable = () => {
    return this.tcpSession && this.tcpSession.isWritable();
  };

  write = (metrics) => {
    let tagCountMap = {};

    Object.entries(metrics.counters).forEach(([name, value]) => {
      const [pcode, category, taghash, field] = name.split('.');
      if (taghash) {
        const mapKey = pcode + '.' + category;
        if (!tagCountMap[mapKey]) {
          tagCountMap[mapKey] = {
            tag: unhashTag(taghash),
            field: {},
          };
        }

        tagCountMap[mapKey].field[field] = value;
      }
    });

    Object.entries(metrics.timer_data).forEach(([name, values]) => {
      const [pcode, category, taghash, field] = name.split('.');
      if (taghash) {
        const mapKey = pcode + '.' + category;
        if (!tagCountMap[mapKey]) {
          tagCountMap[mapKey] = {
            tag: unhashTag(taghash),
            field: {},
          };
        }
        Object.entries(values).forEach(([calculated, value]) => {
          tagCountMap[mapKey].field[field + '.' + calculated] = value;
        });
      }
    });

    Object.entries(tagCountMap).forEach(([mapKey, { tag, field }]) => {
      const [pcode, category] = mapKey.split('.');
      this.sendMetrics({ pcode, category, tag, field });
    });
  };

  flush = (timestamp, metrics) => {
    const hasRecivedData = !!metrics.counters['statsd.metrics_received'];

    if (hasRecivedData) {
      if (this.isWritable()) {
        this.write(metrics);
        this.logger('WhatapStatsD.flush', new Date().toISOString());
      }
    }
  };

  status = (write) => {
    ['lastFlush', 'lastException'].forEach(function (key) {
      write(null, 'console', key, this[key]);
    }, this);
  };
}

exports.init = (startupTime, config, events) => {
  const instance = new WhatapStatsD(startupTime, config, events);

  return true;
};
