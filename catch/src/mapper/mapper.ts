import { normalisePrefix } from '../utils';
import normalise from '../normalise';

import { platify, metrics, taghash } from './mapperUtils';

export type Metric = string;
export type Unit = 'ms' | 'c' | 's';
export type Mapper<Data = any> = (prefix: string | '', data: Data, referer?: string | '') => Metric;

export const initialise = (options) => (data: any, referer: string, userAgent: string, remoteAddress: string) => {
  // normalise

  const pcode = data['whatap.pcode'];
  const prefix = normalisePrefix(pcode);
  const platten = platify(data, referer, userAgent, remoteAddress);
  const normalized = normalise(platten);

  return Object.entries(normalized).reduce((result, [category, categoryData]: any) => {
    if (categoryData) {
      result += metrics(`${prefix}${taghash(category)}.${taghash(categoryData.tags)}.`, categoryData);
    }

    return result;
  }, '');
};

export const separator = '\n';
