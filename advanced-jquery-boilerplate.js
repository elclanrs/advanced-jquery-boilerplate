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
      if (!method) return this._init();
      try { return this[method].apply(this, AP.slice.call(arguments, 1)); }
      catch(e) {}
    };

    $.extend(Plugin.prototype, methods);

    if (global) $[pluginName] = global;

    $.fn[pluginName] = function() {

      var args = AP.slice.call(arguments)
        , method = typeof args[0] == 'string' && args[0].split(':')
        , isGet = method[0] == 'get'
        , ret;

      method = method[+isGet];

      this.each(function() {

        var instance = $.data(this, 'plugin_'+ pluginName);

        // Initialize plugin
        if (!instance || typeof args[0] == 'object') {
          return $.data(this, 'plugin_'+ pluginName, new Plugin(this, args[0]));
        }

        // Save the returned value
        return ret = instance[pluginName].apply(instance, [method].concat(args.slice(1)));
      });

      return isGet ? ret : this;
    };
  };

}(jQuery));
