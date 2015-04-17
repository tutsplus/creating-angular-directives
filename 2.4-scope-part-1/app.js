var app = angular.module('MyApp', []);

app.controller('MainController', function ($scope) {
  $scope.title = 'Title from Main';
  $scope.subtitle = 'Subtitle from Main';
});

app.directive('heading', function () {
  return {
    restrict: 'EACM',
    replace: true,
    scope: true,
    template: '<header> <h1> {{title}} </h1> <h2> {{subtitle}} </h2> <input ng-model="title" /> </header>' 
  };
});

// Default: parent scope
// true   : child scope
