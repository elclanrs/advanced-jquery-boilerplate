/**!
 * Advanced jQuery Plugin Boilerplate
 * @author: Cedric Ruiz
 * https://github.com/elclanrs/advanced-jquery-boilerplate
 */
(function($) {

  var AP = Array.prototype;

  $.newPlugin = function(pluginName, defaults, methods, global) {

    function Plugin(element, options) {

      this.opts = $.extend({}, defaults, options);
      this.el = element;

      this._name = pluginName;

      this._init();
    }

    Plugin.prototype._init = $.noop;

    Plugin.prototype[pluginName] = function(method) {
      if (!method) return this;
      try { return this[method].apply(this, AP.slice.call(arguments, 1)); }
      catch(e) {}
    };

    $.extend(Plugin.prototype, methods);

    if (global) $[pluginName] = global;

    $.fn[pluginName] = function() {

      var args = AP.slice.call(arguments)
        , method = typeof args[0] == 'string' && args[0].split(':')
        , opts = typeof args[0] == 'object' && args[0]
        , params = args.slice(1)
        , isGet = method[0] == 'get'
        , ret;

      this.each(function() {

        var instance = $.data(this, pluginName);

        // Method
        if (instance) {
          return ret = instance[pluginName].apply(instance, [method[+isGet]].concat(params));
        }

        // Init
        if (opts) {
          return $.data(this, pluginName, new Plugin(this, opts));
        }
      });

      return isGet ? ret : this;
    };
  };

}(jQuery));
