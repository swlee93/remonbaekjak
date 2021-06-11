import check from 'check-types';
import { Mapper, Metric, Unit } from './mapper';
import JSURL from 'jsurl';

const printMS: Mapper = (prefix, data) => {
  return Object.entries(data || {}).reduce((metrics, [metric, datum]: any) => {
    if (check.not.number(datum)) return metrics;
    return metrics + printMetric(prefix, metric, datum) + '\n';
  }, '');
};

const printC: Mapper = (prefix, data) => {
  return Object.entries(data || {}).reduce((metrics, [metric, datum]: any) => {
    if (check.not.number(datum)) return metrics;
    return metrics + printMetric(prefix, metric, datum, 'c') + '\n';
  }, '');
};

export const taghash = (data: any = {}) =>
  JSURL.stringify(data).replace('.', '__DOT__').replace('@', '__ADDR__').replace('|', '__BAR__');

const printMetric = (prefix: string, name: string, value: number, unit: Unit = 'ms'): Metric => {
  if (value <= 0) return '';
  return prefix + name + ':' + value + `|${unit}`;
};

export const platify = (data: any = {}, referer: string, userAgent: string, remoteAddress: string) => {
  data.referer = referer;
  data.userAgent = userAgent;
  data.remoteAddress = remoteAddress;
  if (typeof data.browser === 'object') {
    Object.entries(data.browser).forEach(([key, value]) => {
      data[`browser.${key}`] = value;
    });
  }
  return data;
};

export const metrics = (prefix, data): Metric =>
  printC(prefix, data.counts) +
  printC(prefix, data.bytes) +
  printMS(prefix, data.timestamps) +
  printMS(prefix, data.durations) +
  printMS(prefix, data.milliseconds);
