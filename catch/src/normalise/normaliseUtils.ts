const isNumber = (value) => !Number.isNaN(value);
const cyrb53 = function (str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const normaliseTimestamps = (map, data, buckets = {}) => {
  return map.timestamps.reduce((result, prop) => {
    let value; // do not initialize

    if (data[prop.key]) {
      value = parseInt(data[prop.key]);
    }

    if (isNumber(value)) {
      result[prop.name] = value;
    }

    return result;
  }, buckets);
};

export const normaliseCounts = (map, data, buckets = {}) => {
  return map.counts.reduce((result, prop) => {
    let value = 0;

    if (data[prop.key]) {
      value = parseInt(data[prop.key]);
    }

    if (isNumber(value)) {
      result[prop.name] = value;
    }

    return result;
  }, buckets);
};

export const normaliseStrings = (map, data, buckets = {}) => {
  return map.strings.reduce((result, prop) => {
    result[prop.name] = cyrb53(`${data[prop.key]}${prop.timeUnique ? data.timestamp : ''}`);
    return result;
  }, buckets);
};

export const normaliseBytes = (map, data, buckets = {}) => {
  return map.bytes.reduce((result, prop) => {
    let value = 0;

    if (data[prop.key]) {
      value = parseInt(data[prop.key]);
    }

    if (isNumber(value)) {
      result[prop.name] = value;
    }

    return result;
  }, buckets);
};

export const normaliseTags = (map, data, buckets = {}) => {
  return map.tags.reduce((result, tag) => {
    let value;

    if (data[tag.key]) {
      value = data[tag.key];
    }

    if (value) {
      result[tag.name] = value;
    }

    return result;
  }, buckets);
};

export const normaliseDurations = (map, data, buckets = {}) => {
  return map.durations.reduce((result, prop) => {
    let value; // do not initialize

    if (data[prop.end] && data[prop.start]) {
      value = parseFloat(data[prop.end]) - parseFloat(data[prop.start]);
    }

    if (isNumber(value)) {
      result[prop.name] = value;
    }

    return result;
  }, buckets);
};

export const normaliseMilliseconds = (map, data, buckets = {}) => {
  return map.milliseconds.reduce((result, prop) => {
    let value = 0;

    if (data[prop.key]) {
      value = parseInt(data[prop.key]);
    }

    if (isNumber(value)) {
      result[prop.name] = value;
    }

    return result;
  }, buckets);
};
