;(function(window, angular, undefined) {
  'use strict';

  var module = angular.module('angular-pickadate', []);

  function safeApply(scope, func, args) {
    args = Array.prototype.slice.call(arguments, 2);
    var phase = scope.$root.$$phase;
    if (phase === '$apply' || phase === '$digest') {
      func.apply(func, args);
    } else {
      scope.$apply(function() {
        func.apply(func, args);
      });
    }

  } // end SafeValue

  module.directive('pickADate', function () {
    return {
      restrict: 'A',
      require: '^ngModel',
      scope: {
        minDate: '=',
        maxDate: '=',
        pickADateOptions: '='
      },
      link: function (scope, element, attrs, ngModel) {
        var $input, $date;

        function render() {
          var select = $date.get('select');
          if (!select || !select.year) return;
          var date = new Date();

          date.setYear(select.year);
          date.setMonth(select.month);
          date.setDate(select.date);
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
          ngModel.$setViewValue(date);
        }
        $input = element.pickadate({
          today: '',
          format: 'mm/dd/yy',
          onSet: function (e) {
            if (e.hasOwnProperty('clear')) {
              ngModel.$setViewValue(null);
              return;
            }

            if (e.hasOwnProperty('select')) {
              if (!ngModel.$modelValue) {
                ngModel.$setViewValue(new Date(0));
              }
              safeApply(scope, render);
            }
          },
          onStop: function () {
            element[0].focus();
          }
        });
        $date = $input.pickadate('picker');


        function updateValue(value) {
          if (value) {
            var val = (value instanceof Date) ? value : new Date(value);
            // ngModel.$setViewValue(val);
            $date.set('select', val.getTime());
          } else {
            $date.clear();
            ngModel.$setViewValue(null);
          }
        }

        var ready = scope.$watch('ready', function() {
          // watch for changes
          var watchModel = scope.$watch(attrs.ngModel, function(newValue, oldValue) {
            if (newValue === oldValue) return;
            updateValue(newValue);
          }, true);

          var minDate = scope.$watch('minDate', function(newValue, oldValue) {
            if (newValue === oldValue) return;
            if (newValue > ngModel.$modelValue) {
              // ngModel.$setValidity('mintime', false);
              $date.clear();
            }
            $date.set('min', newValue);
          }, true);

          var maxDate = scope.$watch('maxDate', function(newValue, oldValue) {
            if (newValue === oldValue) return;
            $date.set('max', newValue);
          }, true);

          // init data
          if (ngModel.$modelValue) {
            updateValue(ngModel.$modelValue);
          }
          if (scope.minDate) {
            $date.set('min', scope.minDate);
          }
          if (scope.maxDate) {
            $date.set('max', scope.maxDate);
          }

          ready();
          var destory = scope.$on('$destory', function() {
            watchModel();
            minDate();
            maxDate();
            destory();
          });
        });



      }
    };
  });

  // pick-a-time (attribute)
  module.directive('pickATime', function () {
    return {
      restrict: 'A',
      require: '^ngModel',
      scope: {
        minTime: '=',
        maxTime: '=',
        pickATimeOptions: '='
      },
      link: function (scope, element, attrs, ngModel) {
        var $input, $time;
        function render() {
          var select = $time.get('select');
          var time = new Date();
          time.setHours(select.hour);
          time.setMinutes(select.mins);
          time.setSeconds(0);
          time.setMilliseconds(0);
          ngModel.$setViewValue(time);
          // ngModel.$render();
        }
        $input = element.pickatime({
          // interval: 10,
          onSet: function (e) {
            if (e.hasOwnProperty('clear')) {
              ngModel.$setViewValue(null);
              return;
            }
            // if (e.hasOwnProperty('min')) {
              // ngModel.$setViewValue(null);
            // }

            if (e.hasOwnProperty('select')) {
              if (!ngModel.$modelValue) {
                ngModel.$setViewValue(new Date(0));
              }
              safeApply(scope, render);
            }

          },
          onStop: function () {
            element[0].focus();
          }
        });
        $time = $input.pickatime('picker');


        function updateValue(value) {
          if (value) {
            var time = (value instanceof Date) ? value : new Date(value);
            // ngModel.$setViewValue(time);
            var totalMins = time.getHours() * 60 + time.getMinutes();

            $time.set('select', totalMins);
          } else {
            $time.clear();
            ngModel.$setViewValue(null);
          }
        }

        var ready = scope.$watch('ready', function() {
          // watch for changes
          var watchModel = scope.$watch(attrs.ngModel, function(newValue, oldValue) {
            if (newValue === oldValue) return;
            updateValue(newValue);
          }, true);

          var minTime = scope.$watch('minTime', function(newValue, oldValue) {
            if (newValue === oldValue) return;
            if (newValue > ngModel.$modelValue) {
              // ngModel.$setValidity('mintime', false);
              $time.clear();
            }
            $time.set('min', newValue);
          }, true);

          var maxTime = scope.$watch('maxTime', function(newValue, oldValue) {
            if (newValue === oldValue) return;
           // if (newValue < ngModel.$modelValue) {
              // ngModel.$setValidity('maxtime', false);
              // $time.clear();
            // }
            $time.set('max', newValue);

          }, true);

          // init data
          if (ngModel.$modelValue) {
            updateValue(ngModel.$modelValue);
          }
          if (scope.minTime) {
            $time.set('min', scope.minTime);
          }
          if (scope.maxTime) {
            $time.set('max', scope.maxTime);
          }

          ready();
          var destory = scope.$on('$destory', function() {
            watchModel();
            minTime();
            maxTime();
            destory();
          });
        });


      }
    };
  });

}(window, window.angular));
