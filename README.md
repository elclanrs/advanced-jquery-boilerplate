# Advanced jQuery Boilerplate

A jQuery plugin to create scalable jQuery plugins, fast!

## How To

To register a new plugin provide a plugin name, default options, public methods and global methods (if any):

```javascript
(function($, win, doc, undefined) {

  var pluginName, defaults, methods, global;

  // The name of your plugin
  pluginName = 'myplugin';

  // Default options
  defaults = {

  };

  // Public methods
  methods = {

    // Gets called when creating a new instance
    // this.el is the element on which the plugin was called
    // this.opts contains the options passed to the plugin
    _init: function() {
      this.$el = $(this.el);
    },

    method: function() {

    }
  };

  // Global properties and methods get attached to `$`
  // as opposed to `$.fn` so they can be extended from the outside
  global = {

  };

  // Add the plugin to the jQuery namespace and set-up the boilerplate base
  $.newPlugin(pluginName, defaults, methods, global);

}(jQuery, window, document));
```

## Usage

Now you can use your new plugin on any element like so:

```javascript
// Attach a new instance to the element
// and run the `init` method
$('element').myplugin({ options }); 
```

The plugin attaches an instance of itself to the element so after you initialize it you can call any method by calling the plugin again with the name of the method and its arguments:

```javascript
$('element').myplugin('method', arg1, arg2, ...);
```

All methods `return this` by default so it's one thing less to remember. If you want to get the returned value, prefix the method call with `get:`:

```javascript
$('element').myplugin('get:method', arg1, arg2, ...);  
```
