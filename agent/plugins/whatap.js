/**
 * @class BOOMR.plugins.WhaTap
 */
/*eslint dot-notation:0*/
;(function () {
  BOOMR = window.BOOMR || {}
  BOOMR.plugins = BOOMR.plugins || {}

  function info(msg) {
    BOOMR.info(msg, 'WhaTap')
  }
  function warn(msg) {
    BOOMR.warn(msg, 'WhaTap')
  }

  var impl = {
    license: '',

    whatapAnalytics: function () {
      var data = {}
      var i, param, value

      // by config
      if (impl.license) {
        data = { license: impl.license }
      }

      // by QUERY_PARAMS
      const QUERY_PARAMS = ['license']
      for (i = 0; i < QUERY_PARAMS.length; i++) {
        param = QUERY_PARAMS[i]
        value = BOOMR.utils.getQueryParamValue(param)
        if (value) {
          data[param] = value
        }
      }
      return data
    },

    /**
     * Executed on `page_ready` and `xhr_load`
     */
    done: function (edata, ename) {
      var data, key, beaconParam

      data = this.whatapAnalytics()
      for (var key in data) {
        var beaconParam = 'whatap.' + key
        BOOMR.addVar(beaconParam, data[key], true)
      }
    },

    /*
     * Fired when the state changes from pre-render to visible
     */
    prerenderToVisible: function () {
      this.done({}, 'load')
    },
  }

  //
  // Exports
  //
  BOOMR.plugins.WhaTap = {
    /**
     * Initializes the plugin.
     *
     * @param {object} config Configuration
     * @param {string} config.WhaTap.license Whether or not to include
     
     * @returns {@link BOOMR.plugins.WhaTap} The WhaTap plugin for chaining
     * @example
     * BOOMR.init({
     *   WhaTap: {
     *     license: "xxxx-xxxx-xxxx-xxxx"
     *   }
     * });
     * @memberof BOOMR.plugins.WhaTap
     */
    init: function (config) {
      BOOMR.utils.pluginConfig(impl, config, 'WhaTap', ['license'])

      if (!impl.initialized) {
        // we'll add data to the beacon on whichever happens first
        BOOMR.subscribe('page_ready', impl.done, 'load', impl)
        BOOMR.subscribe('xhr_load', impl.done, 'xhr', impl)
        BOOMR.subscribe('prerender_to_visible', impl.prerenderToVisible, 'load', impl)
        impl.initialized = true
      }

      return this
    },

    /**
     * This plugin is always complete (ready to send a beacon)
     *
     * @returns {boolean} `true`
     * @memberof BOOMR.plugins.WhaTap
     */
    is_complete: function () {
      return true
    },
  }
})()
