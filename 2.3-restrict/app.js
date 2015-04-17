var app = angular.module('MyApp', []);

app.directive('heading', function () {
  return {
    restrict: 'EACM',
    replace: true,
    template: '<header> <h1> The First Title </h1> <h2> The First Subtitle </h2> </header>' 
  };
});

// (E)lement
// (A)ttribute
// (C)lass
// co(M)ment
