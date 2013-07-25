(function () {
    "use strict";

    var lazyBindProvider = function($cacheFactory, $timeout) {
        var idx = 0;

        // return lazy funtion.
        return function(scope, isCopy, cacheTime, capacity) {

            cacheTime = cacheTime || 500;

            // exp exe count
            var expExeCount = {};

            // create cache object
            var cacheId = "lazyBindCache" + idx++;
            var bindCache = $cacheFactory.get(cacheId) ||
                     $cacheFactory(cacheId, {capacity: capacity || 1000});

            var isLazyDigest = false;

            // cache timeout
            var cacheTimeoutPromise;
            var setCacheTimeout = function() {
                if (!cacheTimeoutPromise && !isLazyDigest) {
                    cacheTimeoutPromise = $timeout(function() {
                        lazy.flush();
                        if (!scope.$$phase) {
                            isLazyDigest = true;
                            scope.$digest();
                            isLazyDigest = false;
                        }
                    }, cacheTime, false);
                }
            };

            var clearCacheTimeout = function() {
                if (cacheTimeoutPromise) {
                    $timeout.cancel(cacheTimeoutPromise);
                    cacheTimeoutPromise = null;
                }
            };



            // lazy exp fn, public api
            var lazy = function(exp) {
                setCacheTimeout(this);
                if ((expExeCount[exp] = expExeCount[exp] || 0) < 2) {
                    ++expExeCount[exp];
                    return undefined;
                }
                var result = bindCache.get(exp);
                if (!result) {
                    result = this.$eval(exp);
                    result = isCopy ? angular.copy(result) : result;
                    bindCache.put(exp, result);
                }
                return result;
            };

            // set copy exp result or not
            lazy.isCopy = function(value) {
                if (arguments.length) {
                    isCopy = value;
                }
                return isCopy;
            };

            // set cache timeout
            lazy.cacheTime = function(value) {
                if (arguments.length) {
                    cacheTime = ~~value;
                }
                return cacheTime;
            };

            // clear cache
            lazy.flush = function() {
                clearCacheTimeout();
                bindCache.removeAll();
            };

            return lazy;
        };
    };

    var app = angular.module("lazyBind", []);
    app.factory("$lazyBind", lazyBindProvider);

})();