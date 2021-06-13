/*eslint dot-notation:0*/
(function () {
  BOOMR = window.BOOMR || {};
  BOOMR.plugins = BOOMR.plugins || {};

  var impl = {
    pcode: '',
    domain: '',

    whatapAnalytics: function () {
      var data = {};
      var i, param, value;

      // by config
      if (impl.pcode) {
        data.pcode = impl.pcode;
      }

      data.domain = impl.domain || location.hostname;

      // by QUERY_PARAMS
      const QUERY_PARAMS = ['pcode', 'domain'];
      for (i = 0; i < QUERY_PARAMS.length; i++) {
        param = QUERY_PARAMS[i];
        value = BOOMR.utils.getQueryParamValue(param);
        if (value) {
          data[param] = value;
        }
      }
      return data;
    },

    /**
     * Executed on `page_ready` and `xhr_load`
     */
    done: function (edata, ename) {
      var data, key, beaconParam;

      data = this.whatapAnalytics();
      for (var key in data) {
        var beaconParam = 'whatap.' + key;
        BOOMR.addVar(beaconParam, data[key], true);
      }
    },

    /*
     * Fired when the state changes from pre-render to visible
     */
    prerenderToVisible: function () {
      this.done({}, 'load');
    },
  };

  //
  // Exports
  //
  BOOMR.plugins.whatap = {
    init: function (config) {
      impl.pcode = config.pcode;

      config.instrument_xhr = true;

      if (!impl.initialized) {
        // we'll add data to the beacon on whichever happens first
        BOOMR.subscribe('page_ready', impl.done, 'load', impl);
        BOOMR.subscribe('xhr_load', impl.done, 'xhr', impl);
        BOOMR.subscribe('prerender_to_visible', impl.prerenderToVisible, 'load', impl);
        impl.initialized = true;
      }

      return this;
    },

    /**
     * This plugin is always complete (ready to send a beacon)
     *
     * @returns {boolean} `true`
     * @memberof BOOMR.plugins.WhaTap
     */
    is_complete: function () {
      return true;
    },
  };
})();
