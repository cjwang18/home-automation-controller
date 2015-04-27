angular.module( 'ngBoilerplate.outlets', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'outlets', {
    url: '/outlets',
    views: {
      "main": {
        controller: 'OutletsCtrl',
        templateUrl: 'outlets/outlets.tpl.html'
      }
    },
    data: {
        pageTitle: 'Outlets',
        requireLogin: true
    }
  });
})

.controller( 'OutletsCtrl', function OutletsCtrl( $scope ) {
    $scope.outletToggles = [
        { "label": "1" },
        { "label": "2" },
        { "label": "3" },
        { "label": "CJ's Night Stand Lamp" },
        { "label": "CJ's Desk Lamp" }
    ];
})

.directive('toggleOutlet', function(outletsService) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            element.on('click', function(event) {
                var outletInfo = {
                    outletId: attr.outletId,
                    outletStatus: attr.outletStatus
                };
                outletsService.post(outletInfo).success(function() {
                    console.log("success!");
                });
            });
        }
    };
})

.service( 'outletsService', ['$http', function ($http) {
    return {
        post: function (params) {
            return $http.post('http://rfoutlet.rpi.lan/toggle.php', $.param(params), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
        }
    };
}])

;
