
lazyBind
========

An [AngularJS](https://github.com/angular/angular.js) module contains `lazyBind` service,
which cause target watch expression to delay re-evaluation until stop changing.
Inspired by [KnockoutJS throttle](http://knockoutjs.com/documentation/throttle-extender.html).


Usage
=====

Require lazyBind and inject the service, link scope and assign to a scope variable.

```javascript
angular.module('app', ['lazyBind'])
    .controller('Ctrl', function($scope, $lazyBind) {
        $scope.lazy = $lazyBind($scope);
    });
```

Then use lazy function warp target expression in the ui template or watchers.

```html
<div ng-bind="{{ lazy ('expr') }}"></div>
```


### `lazy.isCopy(bool)`
set copy expression result or return directly.
default false.


### `lazy.cacheTime(num)`
set expire time (ms) for expression result cache.
default 500.


### `lazy.flush()`
clear expression result cache.
