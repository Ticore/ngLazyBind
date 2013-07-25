
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
        $scope.lazyFn = $lazyBind($scope);
    });
```

Then use lazy function warp target expression in the ui template or watchers.

```html
<div ng-bind="{{ lazyFn ('expr') }}"></div>
```


### `lazyFn.isCopy(bool)`
set copy expression result or return directly.
default false.


### `lazyFn.cacheTime(num)`
set expire time (ms) for expression result cache.
default 500.


### `lazyFn.flush()`
clear expression result cache.


Demo
====

[lazy binding with current date](http://jsbin.com/ayewok/2/edit)
[lazy binding with ngRepeat](http://jsbin.com/eguyap/2/edit)


