var app = angular.module('MyApp', []);

app.directive('heading', function () {
  return {
    restrict: 'EACM',
    replace: true,
    transclude: true,
    scope: {
      title: '@',
      subtitle: '@'
    },
    template: '<header> <h1 ng-transclude> </h1> <h2> {{subtitle}} </h2> </header>' 
  };
});

