import { normaliseTimestamps, normaliseEvents, normaliseDurations } from './normaliseUtils'
import tagCountData from './tagCountData'
import navtimingData from './navtimingData'
import restimingData from './restimingData'
import rtData from './rtData'

type CommonDataProps = {
  key: string
  name: string
  optional?: boolean
}
type EventProps = {
  start: string
  end: string
  name: string
  optional?: boolean
}
export type NormalisedDataProp = {
  timestamps: CommonDataProps[]
  events: EventProps[]
  durations: CommonDataProps[]
  tags?: CommonDataProps[]
  counts?: CommonDataProps[]
  sizes?: CommonDataProps[]
}

type NormalisationMap = {
  navtiming: NormalisedDataProp
  restiming: NormalisedDataProp
  browser: NormalisedDataProp
  timers: NormalisedDataProp
  hardware: NormalisedDataProp
  errors: {}
}
export type Category = keyof NormalisationMap
export const NORMALISATION_MAP: NormalisationMap = {
  navtiming: {
    timestamps: [
      { key: 'nt_nav_st', name: 'start' },
      { key: 'nt_fet_st', name: 'fetchStart' },
      { key: 'nt_ssl_st', name: 'sslStart', optional: true },
      { key: 'nt_req_st', name: 'requestStart' },
      { key: 'nt_domint', name: 'domInteractive' },
    ],
    events: [
      { start: 'nt_unload_st', end: 'nt_unload_end', name: 'unload' },
      { start: 'nt_red_st', end: 'nt_red_end', name: 'redirect' },
      { start: 'nt_dns_st', end: 'nt_dns_end', name: 'dns' },
      { start: 'nt_con_st', end: 'nt_con_end', name: 'connect' },
      { start: 'nt_res_st', end: 'nt_res_end', name: 'response' },
      { start: 'nt_domloading', end: 'nt_domcomp', name: 'dom' },
      { start: 'nt_domcontloaded_st', end: 'nt_domcontloaded_end', name: 'domContent' },
      { start: 'nt_load_st', end: 'nt_load_end', name: 'load' },
    ],
    durations: [],
  },
  restiming: {
    timestamps: [
      { key: 'rt_st', name: 'start' },
      { key: 'rt_fet_st', name: 'fetchStart' },
      { key: 'rt_scon_st', name: 'sslStart', optional: true },
      { key: 'rt_req_st', name: 'requestStart', optional: true },
    ],
    events: [
      { start: 'rt_red_st', end: 'rt_red_end', name: 'redirect', optional: true },
      { start: 'rt_dns_st', end: 'rt_dns_end', name: 'dns', optional: true },
      { start: 'rt_con_st', end: 'rt_con_end', name: 'connect', optional: true },
      { start: 'rt_res_st', end: 'rt_res_end', name: 'response', optional: true },
    ],
    durations: [],
  },
  browser: {
    timestamps: [],
    events: [],
    durations: [],
    tags: [
      // { name: 'name', key: 'browser?.name', optional: true },
      // { name: 'version', key: 'browser?.version', optional: true },
      // { name: 'referer', key: 'referer', optional: true },
      // { name: 'userAgent', key: 'userAgent', optional: true },
      { name: 'pid', key: 'pid', optional: true },
      { name: 'platform', key: 'ua.plt', optional: true },
      { name: 'vendor', key: 'ua.vnd', optional: true },
    ],
    counts: [
      { name: 'domains', key: 'dom.doms', optional: true },
      { name: 'domNodes', key: 'dom.ln', optional: true },
      { name: 'imageNotes', key: 'dom.img', optional: true },
      { name: 'scripts', key: 'dom.script', optional: true },
      { name: 'externalScripts', key: 'dom.script.ext', optional: true },
      { name: 'iframeNodes', key: 'dom.iframe', optional: true },
      { name: 'linkNodes', key: 'dom.link', optional: true },
      { name: 'cssNodes', key: 'dom.link.css', optional: true },
      { name: 'domResources', key: 'dom.res', optional: true },
      { name: 'beaconSent', key: 'sb', optional: true },
    ],
    sizes: [
      { name: 'renderedSize', key: 'dom.sz', optional: true },
      { name: 'cookieBytes', key: 'dom.ck', optional: true },
    ],
  },
  timers: {
    events: [],

    tags: [
      { name: 'interactive', key: 'c.tti.m', optional: true },
      { name: 'version', key: 'v', optional: true },
      { name: 'snippetVersion', key: 'sv', optional: true },
      { name: 'snippetMethod', key: 'sm', optional: true },
      { name: 'sessionID', key: 'rt-si', optional: true },
      { name: 'visibilityState', key: 'vis.st', optional: true },
      { name: 'visibilityLH', key: 'vis.lh', optional: true },
      { name: 'pageID', key: 'pid', optional: true },
      { name: 'beaconNumber', key: 'n', optional: true },
      { name: 'URL', key: 'u', optional: true },
    ],
    counts: [
      { name: 'sessionLength', key: 'rt.sl', optional: true },
      { name: 'unCountedPage', key: 'rt.obo', optional: true },
    ],
    timestamps: [
      { name: 'sessionStart', key: 'rt.ss', optional: true },
      { name: 'navStartTime', key: 'rt.start', optional: true },
      { name: 'boomerangStart', key: 'rt.bstart', optional: true },
      { name: 'navEndTime', key: 'rt.end', optional: true },
      { name: 'pageLoadTime', key: 't_done', optional: true },
    ],
    durations: [
      { name: 'totalLoadTime', key: 'rt.tt', optional: true },
      { name: 'lastVisible', key: 'vis.lv', optional: true },
      { name: 'visuallyReady', key: 'c.tti.vr', optional: true },
      { name: 'firstInteraction', key: 'c.ttfi', optional: true },
    ],
  },
  hardware: {
    timestamps: [],
    events: [],
    tags: [
      { name: 'connection', key: 'mob.etype', optional: true },
      { name: 'bandwidth', key: 'mob.dl', optional: true },
      { name: 'orientation', key: 'scr.orn', optional: true },
      { name: 'screenSize', key: 'scr.xy', optional: true },
      { name: 'cpuCores', key: 'cpu.cnc', optional: true },
      { name: 'screenBitPerPixel', key: 'scr.bpp', optional: true },
    ],
    counts: [
      { name: 'localstorageItems', key: 'mem.lsln', optional: true },
      { name: 'sessionStorageItems', key: 'mem.ssln', optional: true },
    ],
    sizes: [
      { name: 'availableMemory', key: 'mem.total', optional: true },
      { name: 'limitMemory', key: 'mem.limit', optional: true },
      { name: 'usedMemory', key: 'mem.used', optional: true },
      { name: 'localstorageBytes', key: 'mem.lssz', optional: true },
      { name: 'sessionStorageBytes', key: 'mem.sssz', optional: true },
    ],
    durations: [{ name: 'triptime', key: 'mob.rtt', optional: true }],
  },
  errors: {},
}

export const normaliseCategory = (category: Category, data, startKey): any => {
  try {
    return {
      timestamps: normaliseTimestamps(NORMALISATION_MAP[category], data),
      events: normaliseEvents(NORMALISATION_MAP[category], data),
      durations: normaliseDurations(NORMALISATION_MAP[category], data, startKey),
    }
  } catch {}
}

const normalise = (data) => {
  return {
    rt: rtData(data),
    navtiming: navtimingData(data),
    restiming: restimingData(data),

    ...tagCountData(data),
  }
}

export default normalise
