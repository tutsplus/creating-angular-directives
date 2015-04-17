var app = angular.module('MyApp', []);

app.directive('chart', function () {
  return {
    replace: true,
    transclude: true, 
    templateUrl: 'chart.html',
    controller: function ($scope, $element, $attrs) {
      var H = parseInt($attrs.height, 10),
          W = parseInt($attrs.width, 10),
          borderWidth = 30,
          numberOfTicks = 6;

      $scope.height = H;
      $scope.leftLimit = borderWidth;
      $scope.bottomLimit = H - borderWidth;
      $scope.rightLimit = W;

      var count = 0;

      this.getX = function (point) {
        if (typeof point.num === 'undefined') {
          point.num = count++;
          $scope.$broadcast('new-width'); 
        }

        var adjustment = point.radius + point.strokeWidth - 1;
        var widthSpacer = (W - borderWidth - adjustment) / (count - 1);
        return borderWidth + widthSpacer*point.num; 
      };

      var highest = 0;

      this.getY = function (point) {
        if (point.d > highest) {
          highest = point.d; 
          $scope.$broadcast('new-highest');
        }

        var adjustment = point.radius + point.strokeWidth - 1;
        var heightSpacer = (H - borderWidth - adjustment) / highest;

        $scope.ticks = [];

        var interval = highest / (numberOfTicks - 1);

        for (var i = 0; i < numberOfTicks; i++) {
          $scope.ticks.push({
            text: interval * i,
            value: interval * i * heightSpacer + adjustment 
          });
        }

        return H - borderWidth - point.d*heightSpacer;
      };

      $scope.points = [];
      this.addPoint = function (point) {
        $scope.points.push(point);
      };
    }
  };
});

app.directive('datapoint', function () {
  return {
    replace: true,
    require: '^chart',
    scope: {
      d: '@',
      label: '@'
    },
    template: '<circle ng-attr-cx="{{cx}}" ng-attr-cy="{{cy}}" ng-attr-r="{{radius}}" ng-attr-stroke-width="{{strokeWidth}}" fill="#ffffff" stroke="{{stroke}}" />',
    link: function (scope, element, attrs, ctrl) {
      scope.d = parseInt(scope.d, 10);
      scope.radius = 4; 
      scope.strokeWidth = 3;
      scope.stroke = '#5B90BF';

      ctrl.addPoint(scope);

      setY();
      setX();

      scope.$on('new-highest', setY);
      scope.$on('new-width', setX);

      function setY () {
        scope.cy = ctrl.getY(scope);
      }

      function setX () {
        scope.cx = ctrl.getX(scope);
      }
    }
  };
});

