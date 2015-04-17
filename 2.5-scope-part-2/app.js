var app = angular.module('MyApp', []);

app.controller('MainController', function ($scope) {
  $scope.title = 'Title from Main';
  $scope.subtitle = 'Subtitle from Main';

  $scope.clicks = 0;
});

app.directive('heading', function () {
  return {
    restrict: 'EACM',
    replace: true,
    scope: {
      title: '@',
      subtitle: '=',
      count: '&'
    },
    template: '<header ng-click="count()"> <h1> {{title}} </h1> <h2> {{subtitle}} </h2> <input ng-model="subtitle" /> </header>' 
  };
});

