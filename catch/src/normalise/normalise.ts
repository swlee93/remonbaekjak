import tagCountData from './tagCountData';

type CommonDataProps = {
  key: string;
  name: string;
};

type DurationDataProps = {
  start: string;
  end: string;
  name: string;
};

export type TagCountDataProp =
  | {
      tags: CommonDataProps[];
      timestamps: CommonDataProps[];
      milliseconds: CommonDataProps[];
      counts: CommonDataProps[];
      bytes: CommonDataProps[];
      durations: DurationDataProps[];
    }
  | {};

export type DataPropKeys = keyof TagCountDataProp;

type CategoryMap = {
  session: TagCountDataProp;
  elements: TagCountDataProp;
  browser: TagCountDataProp;
  performance: TagCountDataProp;
  timeline: TagCountDataProp;
  interaction: TagCountDataProp;
  errors: TagCountDataProp;
  resource: TagCountDataProp;
  page: TagCountDataProp;
  network: TagCountDataProp;
};
export type Category = keyof CategoryMap;

export const tagCountCategories: Array<Category> = [
  'session',
  'page',
  'browser',
  'elements',
  'errors',
  'resource',
  'network',
  'performance',
  'timeline',
  'interaction',
];
export const GLOBAL_DATA: TagCountDataProp = {
  tags: [
    { key: 'whatap.pcode', name: 'pcode' },
    { key: 'browser.name', name: 'Browser' },
    // { key: 'browser.version', name: 'Browser Version' },
    { key: 'referer', name: 'Referer' },
    { key: 'pid', name: 'Page ID' },
    // { key: 'n', name: 'Beacon Number' },
    // { key: 'http.initiator', name: 'Beacon Type' }, // xhr spa spa_hard
    // { key: 'mob.ct', name: 'Mobile Connection Type' },
    // { key: 'nt_nav_type', name: 'Navigation Type' },
    // { key: 'h.d', name: 'Domain' },
    // { key: 'h.key', name: 'API Key' },
    // { key: 'h.pg', name: 'Page Group' },
    // { key: 'h.ab', name: 'A/B Test name' },
    // { key: 'h.v', name: 'Site/App Version' },
    // { key: 'nt_spdy', name: 'SPDY' },
    // { key: 'api', name: 'API Status' },
  ],
  timestamps: [],
  milliseconds: [],
  durations: [],
  counts: [],
  bytes: [],
};
export const CATEGORY_MAP: CategoryMap = {
  session: {
    tags: [
      { key: 'rt.si', name: 'Session ID' },
      // { key: 'rt.quit', name: 'Unload flag' },
      // { key: 'rt.start', name: 'Navigation Start Method' },
      // { key: 'rt.rt_name', name: 'Roudtrip Name' },
      // { key: 'rt.rt_in_type', name: 'Roudtrip Type' },
    ],
    timestamps: [
      { key: 'rt.ss', name: 'Session Start Time' },
      { key: 'rrt.end', name: 'Session Latest Time' }, // To find out actual session duration, look at MAX(latest) - MIN(start) across all beacons grouped by Session ID.
    ],
    counts: [
      { key: 'rt.sl', name: 'Session Length' }, // To find out actual Session Length in pages, look at MAX(pages) across all beacons grouped by Session ID. If MAX(pages) == 1, then the session is considered a bounce.
      { key: 'rt.obo', name: 'Uncounted pages' },
    ],
    milliseconds: [
      { key: 'rt.tt', name: 'Total Load Time' }, // The average load time of a session is MAX(totalLoadTime) / (MAX(pages) - MAX(oboPages)).
    ],
    durations: [],
    bytes: [],
  },
  elements: {
    tags: [],
    counts: [
      { key: 'dom.res', name: 'Resources' },
      { key: 'dom.doms', name: 'Domains' },
      { key: 'dom.ln', name: 'Nodes' },
      { key: 'dom.img', name: 'Images' },
      { key: 'dom.img.ext', name: 'External Images' },
      { key: 'dom.img.uniq', name: 'Unique Images' },
      { key: 'dom.script', name: 'Scripts' },
      { key: 'dom.script.ext', name: 'External Scripts' },
      { key: 'dom.script.uniq', name: 'Unique Scripts' },
      { key: 'dom.iframe', name: 'Iframes' },
      { key: 'dom.iframe.ext', name: 'External Iframes' },
      { key: 'dom.iframe.uniq', name: 'Unique Iframes' },
      { key: 'dom.link', name: 'Links' },
      { key: 'dom.link.css', name: 'CSS Links' },
      { key: 'dom.link.css.uniq', name: 'Uniques CSS Links' },
    ],
    bytes: [
      { key: 'dom.sz', name: 'DOM Size' },
      { key: 'dom.ck', name: 'Cookie bytes' }, //	dom.ck	–	–	100	Number of bytes stored as cookies available to JavaScript on the current do
    ],
    timestamps: [],
    milliseconds: [],
    durations: [],
  },
  timeline: {
    tags: [],
    counts: [],
    timestamps: [
      { key: 'nt_nav_st', name: 'Navigation Start' },
      { key: 'nt_red_st', name: 'Redirect Start' },
      { key: 'nt_red_end', name: 'Redirect End' },
      { key: 'nt_fet_st', name: 'Fetch Start' },
      { key: 'nt_dns_st', name: 'DNS Start' },
      { key: 'nt_dns_end', name: 'DNS End' },
      { key: 'nt_con_st', name: 'TCP Start' },
      { key: 'nt_ssl_st', name: 'SSL Start' },
      { key: 'nt_con_end', name: 'TCP End' },
      { key: 'nt_req_st', name: 'Request Start' },
      { key: 'nt_res_st', name: 'Response Start' },
      { key: 'nt_unload_st', name: 'Unload Start' },
      { key: 'nt_unload_end', name: 'Unload End' },
      { key: 'nt_domloading', name: 'DOM Loading' },
      { key: 'nt_res_end', name: 'Response End' },
      { key: 'nt_domint', name: 'DOM Interactive' },
      { key: 'nt_domcontloaded_st', name: 'DOMContentLoaded Start' },
      { key: 'nt_domcontloaded_end', name: 'DOMContentLoaded End' },
      { key: 'nt_domcomp', name: 'DOM Complete' },
      { key: 'nt_load_st', name: 'Load Event Start' },
      { key: 'nt_load_end', name: 'Load Event End' },
      { key: 'nt_worker_start', name: 'Worker Start' },
    ],
    milliseconds: [],
    durations: [],
    bytes: [],
  },
  performance: {
    tags: [],
    counts: [{ key: 'nt_red_cnt', name: 'Redirect Count' }],
    timestamps: [],
    milliseconds: [
      { key: 't_resp', name: 'Back-End Time (TTFB)' },
      { key: 't_page', name: 'Front-End Time' },
      { key: 't_done', name: 'Page Load time' },
      { key: 't_domloaded', name: 'DOM Loaded' },
      { key: 't_load', name: 'Prerender complete' },
      { key: 't_prerender', name: 'Total prerender' },
      { key: 't_postrender', name: 'Post render' },
      { key: 'pt.fp', name: 'First Paint' },
      { key: 'pt.fcp', name: 'First Contentful Paint' },
      { key: 'pt.lcp', name: 'Largest Contentful Paint' },
    ],
    durations: [
      { start: 'nt_nav_st', end: 'nt_dns_st', name: 'Before DNS' },
      { start: 'nt_dns_st', end: 'nt_dns_end', name: 'DNS' },
      { start: 'nt_con_st', end: 'nt_con_end', name: 'TCP' },
      { start: 'nt_ssl_st', end: 'nt_con_end', name: 'SSL' },
      { start: 'nt_nav_st', end: 'nt_domloading', name: 'DOM Load' },
      { start: 'nt_nav_st', end: 'nt_domcomp', name: 'DOM Ready' },
      { start: 'nt_domloading', end: 'nt_domcomp', name: 'DOM' },
      { start: 'nt_domcontloaded_st', end: 'nt_domcontloaded_end', name: 'Dom Content' },
      { start: 'nt_nav_st', end: 'nt_firstpaint', name: 'Render Start' },
      { start: 'nt_nav_st', end: 'nt_load_end', name: 'Loaded' },
      { start: 'nt_load_st', end: 'nt_load_end', name: 'Load' },
      { start: 'nt_unload_st', end: 'nt_unload_end', name: 'Unload' },
      { start: 'nt_red_st', end: 'nt_red_end', name: 'Redirect' },
      { start: 'nt_res_st', end: 'nt_res_end', name: 'Response' },
    ],
    bytes: [],
  },

  page: {
    tags: [
      { key: 'u', name: 'Source URL' },
      { key: 'pgu', name: 'Page URL' },
      // { key: 'r', name: 'Cookie Referrer' },
      // { key: 'r2', name: 'Referrer' },
      { key: 'nu', name: 'Next URL' },
      // { key: 'amp.u', name: 'AMP Document URL' },
      // { key: 'dom.res.slowest', name: 'Slowest Resource' }, // Slowest resource on page (if configured)
    ],
    counts: [],
    timestamps: [],
    milliseconds: [],
    durations: [],
    bytes: [],
  },

  resource: {
    tags: [], // https://developer.akamai.com/mpulse/whats-in-a-beacon/#resource-timing-summary-data
    timestamps: [],
    durations: [],
    milliseconds: [],
    counts: [],
    bytes: [],
    strings: [{ key: 'restiming', name: 'Resource' }],
  },

  network: {
    timestamps: [],
    durations: [],
    tags: [
      { key: 'http.errno', name: 'HTTP Status code' },
      { key: 'http.method', name: 'HTTP method' },
      // { key: 'http.hdr', name: 'HTTP response headers' }, // Optional
    ],
    strings: [],
    counts: [
      { key: 'mob.dl', name: 'Bandwidth' }, // Effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per seconds
      { key: 'mob.rtt', name: 'Roundtrip Time' }, // Estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25 milliseconds
    ],
    bytes: [],
    milliseconds: [
      { key: 'lat', name: 'HTTP latency' },
      { key: 'lat_err', name: 'Error in HTTP latency' },
    ],
  },

  browser: {
    timestamps: [],
    durations: [],
    milliseconds: [],
    tags: [
      // { key: 'scr.xy', name: 'Screen Dimentions' },
      // { key: 'scr.orn', name: 'Screen Orientation' },
      // { key: 'cpu.cnc', name: 'CPU cores' },
      // { key: 'bat.lvl', name: 'Battery charge level' },
      { key: 'ua.plt', name: 'UserAgent Platform' },
      { key: 'ua.vnd', name: 'UserAgent Vendor' },
    ],
    counts: [
      { key: 'mem.lsln', name: 'LocalStorage keys' },
      { key: 'mem.ssln', name: 'SessionStorage keys' },
    ],
    bytes: [
      { key: 'mem.total', name: 'Total Memory available' },
      { key: 'mem.limit', name: 'JS Heap size limit' },
      { key: 'mem.used', name: 'Total Memory used' },
      { key: 'mem.lssz', name: 'LocalStorage bytes' },
      { key: 'mem.sssz', name: 'SessionStorage bytes' },
    ],
  },

  interaction: {
    milliseconds: [
      { key: 'c.f.d', name: 'Frame Rate Duration' },
      { key: 'c.f', name: 'Average Frame Rate' },
      { key: 'c.fid', name: 'First Input Delay' },
      { key: 'c.i.a', name: 'Average Interaction Delay' },
      { key: 'c.i.dt', name: 'Delayed Interaction Time' },
      { key: 'c.lt.tt', name: 'Total Duration of Long Tasks' },
      { key: 'c.ttfi', name: 'Time To First Interaction' },
      { key: 'c.tti.fr', name: 'Framework Ready' },
      { key: 'c.tti.hi', name: 'Hero Images Ready' },
      { key: 'c.tti.vr', name: 'Visually Ready' },
      { key: 'c.tti', name: 'Time to Interactive' },
    ],
    durations: [],
    timestamps: [],
    counts: [
      { key: 'c.b', name: 'Page Busy percentage' },
      { key: 'c.c.r', name: 'Rage click count' },
      { key: 'c.c', name: 'Click Count' },
      { key: 'c.f.l', name: 'Long Frames' },
      { key: 'c.f.m', name: 'Minimum Frame Rate' },
      { key: 'c.i.dc', name: 'Delayed Interaction Count' },
      { key: 'c.k.e', name: 'Keyboard ESC Count' },
      { key: 'c.k', name: 'Keyboard Event Count' },
      { key: 'c.lt.n', name: 'Long Tasks' },
      { key: 'c.s', name: 'Scroll Count' },
    ],
    bytes: [],
    tags: [
      // { key: 'c.e', name: 'Continuity Epoch timestamp' },
      // { key: 'c.f.s', name: 'Frame Rate measurement start time' },
      // { key: 'c.l', name: 'Log' },
      // { key: 'c.lb', name: 'Last Beacon Timestamp' },
      // { key: 'c.lt', name: 'Long Task Data' },
      // { key: 'c.m.n', name: 'Mouse Movement Pixels' },
      // { key: 'c.m.p', name: 'Mouse Movement Percentage' },
      // { key: 'c.s.d', name: 'Distinct Scrolls' },
      // { key: 'c.s.p', name: 'Scroll Percentage' },
      // { key: 'c.s.y', name: 'Scroll Y' },
      // { key: 'c.t.click', name: 'Click Timeline' },
      // { key: 'c.t.domln', name: 'DOM Length Timeline' },
      // { key: 'c.t.domsz', name: 'DOM Size Timeline' },
      // { key: 'c.t.fps', name: 'Frame Rate Timeline' },
      // { key: 'c.t.inter', name: 'Interactions Timeline' },
      // { key: 'c.t.interdly', name: 'Delayed Interactions Timeline' },
      // { key: 'c.t.key', name: 'Keyboard Press Timeline' },
      // { key: 'c.t.longtask', name: 'Long Task Timeline' },
      // { key: 'c.t.mem', name: 'Memory Usage Timeline' },
      // { key: 'c.t.mouse', name: 'Mouse Movements Timeline' },
      // { key: 'c.t.mousepct', name: 'Mouse Movement Percentage Timeline' },
      // { key: 'c.t.scroll', name: 'Scroll Timeline' },
      // { key: 'c.t.scrollpct', name: 'Scroll Percentage Timeline' },
      // { key: 'c.t.mut', name: 'DOM Mutations Timeline' },
      // { key: 'c.tti.m', name: 'Time to Interactive Method' },
    ],
  },
  errors: {
    tags: [
      // { key: 'err', name: 'Errors' }
    ],
    milliseconds: [],
    durations: [],
    timestamps: [],
    counts: [],
    bytes: [],
  },
};

const normalise = (data) => tagCountData(data);

export default normalise;
