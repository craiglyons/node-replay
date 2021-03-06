// Generated by CoffeeScript 1.8.0
var Chain;

Chain = (function() {
  function Chain() {}

  Chain.prototype.append = function(proxy) {
    var fallback;
    fallback = this._fallback(proxy);
    if (this.last) {
      this.last.next = fallback;
    }
    this.last = fallback;
    this.first || (this.first = fallback);
    return this;
  };

  Chain.prototype.prepend = function(proxy) {
    var fallback;
    fallback = this._fallback(proxy);
    fallback.next = this.first;
    this.first = fallback;
    this.last || (this.last = fallback);
    return this;
  };

  Chain.prototype._fallback = function(proxy) {
    var fallback;
    fallback = (function(_this) {
      return function(request, callback) {
        return proxy(request, function(error, response) {
          if (error || response) {
            callback(error, response);
            return;
          }
          if (fallback.next) {
            return fallback.next(request, callback);
          } else {
            return callback(null);
          }
        });
      };
    })(this);
    return fallback;
  };

  Chain.prototype.clear = function() {
    return this.first = this.last = null;
  };

  Chain.prototype.__defineGetter__("start", function() {
    return this.first;
  });

  return Chain;

})();

module.exports = Chain;
