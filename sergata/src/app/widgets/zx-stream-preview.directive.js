(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('zxStreamPreview', zxStreamPreview);

    zxStreamPreview.$inject = ['$http'];

    /* @ngInject */
    function zxStreamPreview($http) {
      var directive = {
          link: link,
          restrict: 'E',
          //replace:true,
          scope: {
              source: '@'
          },
          template:"<img src='/images/thumbs/thumb-stream.png'><span class='streampreview-timestamp'>{{pts / 27000 | timestamp}}</span>",
      };
      return directive;

      function link($scope, element, attrs, ngModel) {
        $scope.$on('$destroy', function () {
          if ($scope.refresh_timer)
              clearTimeout($scope.refresh_timer)
          revokeObjectURL();
        });

        $scope.$watch('object_url', function (object_url) {
          if (object_url)
            angular.element(element[0].querySelector('img')).attr('src', object_url);
        });

        attrs.$observe('source', function (source) {
          if ($scope.refresh_timer)
            clearTimeout($scope.refresh_timer)
          
          if(!source)
            angular.element(element[0].querySelector('img')).attr('src', '/images/thumbs/thumb-stream.png');
          else
            loadPreview();
        });

        function revokeObjectURL() {
          if ($scope.object_url) {
            URL.revokeObjectURL($scope.object_url);
          }
        }

        function loadPreview() {
          revokeObjectURL();

          $http.get($scope.source, {
              responseType: 'arraybuffer',
              headers: {
                  'accept': 'image/webp,image/*,*/*;q=0.8'
              }
          })
          .then(function (response) {
            var blob = new Blob(
              [ response.data ], 
              { type: response.headers('Content-Type') }
            );
            $scope.pts = response.headers('Zixi-Frame-PTS');
            $scope.object_url = URL.createObjectURL(blob);

            $scope.refresh_timer = setTimeout(loadPreview, 5000);
          });
        }
      }
    }
})();
