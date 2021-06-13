const WhaTapStatD = require('whatap-statsd').default;

exports.init = function (startupTime, config, events) {
  const instance = new WhaTapStatD(startupTime, config, events);
  return true;
};
