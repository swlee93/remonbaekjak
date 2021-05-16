require('dotenv').config()
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

// Send beacon information to New Relic Events Endpoint
function sendBeacon(data) {
  var data = JSON.stringify(data)

  var xhr = new XMLHttpRequest()
  xhr.withCredentials = true

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      console.log(this.responseText)
    }
  })

  xhr.open('POST', `https://insights-collector.newrelic.com/v1/accounts/${process.env.NR_ACCOUNT}/events`)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('X-Insert-Key', process.env.INSIGHTS_API_KEY)

  xhr.send(data)
}

exports.initialise = function () {
  return function (data, type, separator, callback) {
    try {
      obj = JSON.parse(data)

      // Customize Beacon Data suit the New Relic Events endpoint
      var beaconData = {}
      beaconData.browser = {
        eventType: 'Browser',
        name: obj.browser.name,
        version: obj.browser.version,
        referer: obj.referer,
        userAgent: obj.userAgent,
        pid: obj.data.pid,
        platform: obj.data['ua.plt'],
        vendor: obj.data['ua.vnd'],
        domains: obj.data['dom.doms'],
        domNodes: obj.data['dom.ln'],
        renderedSize: obj.data['dom.sz'],
        cookieBytes: obj.data['dom.ck'],
        imageNotes: obj.data['dom.img'],
        scripts: obj.data['dom.script'],
        externalScripts: obj.data['dom.script.ext'],
        iframeNodes: obj.data['dom.iframe'],
        linkNodes: obj.data['dom.link'],
        cssNodes: obj.data['dom.link.css'],
        domResources: obj.data['dom.res'],
        beaconSent: obj.data['sb'],
      }

      beaconData.timers = {
        eventType: 'Timers',
        interactive: obj.data['c.tti.m'],
        version: obj.data.v,
        snippetVersion: obj.data.sv,
        snippetMethod: obj.data.sm,
        sessionID: obj.data['rt-si'],
        sessionStart: obj.data['rt.ss'],
        sessionLength: obj.data['rt.sl'],
        visibilityState: obj.data['vis.st'],
        visibilityLH: obj.data['vis.lh'],
        pageID: obj.data.pid,
        beaconNumber: obj.data.n,
        navStartTime: obj.data['rt.start'],
        boomerangStart: obj.data['rt.bstart'],
        navEndTime: obj.data['rt.end'],
        pageLoadTime: obj.data['t_done'],
        totalLoadTime: obj.data['rt.tt'],
        unCountedPage: obj.data['rt.obo'],
        URL: obj.data['u'],
        lastVisible: obj.data['vis.lv'],
        visuallyReady: obj.data['c.tti.vr'],
        firstInteraction: obj.data['c.ttfi'],
      }

      if (obj.data.hasOwnProperty('err')) {
        beaconData.beaconError = {
          eventType: 'ClientErrors',
          error: obj.data.err,
        }
        sendBeacon(beaconData.beaconError)
      }

      beaconData.hardware = {
        eventType: 'Hardware',
        connection: obj.data['mob.etype'],
        bandwidth: obj.data['mob.dl'],
        triptime: obj.data['mob.rtt'],
        availableMemory: obj.data['mem.total'],
        limitMemory: obj.data['mem.limit'],
        usedMemory: obj.data['mem.used'],
        localstorageItems: obj.data['mem.lsln'],
        localstorageBytes: obj.data['mem.lssz'],
        sessionStorageItems: obj.data['mem.ssln'],
        sessionStorageBytes: obj.data['mem.sssz'],
        orientation: obj.data['scr.orn'],
        screenSize: obj.data['scr.xy'],
        cpuCores: obj.data['cpu.cnc'],
        screenBitPerPixel: obj.data['scr.bpp'],
      }

      console.log('sending')
      console.log(JSON.stringify(beaconData.browser))
      console.log(JSON.stringify(beaconData.timers))
      console.log(JSON.stringify(beaconData.hardware))
      sendBeacon(beaconData.browser)
      sendBeacon(beaconData.timers)
      sendBeacon(beaconData.hardware)
    } catch (e) {
      console.log('found an error')
      console.log(e)
      callback(false, e)
    }
  }
}
