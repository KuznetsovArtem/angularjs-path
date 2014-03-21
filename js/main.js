/**
 * Created by ASKuznetsov on 3/18/14.
 */
var app = angular.module('demoApp', []);

app.controller('appCtrl', function($scope) {

    var self = this;

    $scope.doLog = function() {
        console.log('App name: ' + app.name)
    }

    self.doLog2 = function() {
        console.log('App name v2: ' + app.name)
    }

    $scope.name = '';

    return $scope.appCtrl = self;
});

app.factory('config', function() {
    return {
        messages : {
            ok: 'ok',
            error: 'too young'
        },
        allowedAge: 21
    }
});

app.directive('ageCheck', function() {
   return {
       restrict: "E",
       scope: {
           age: "@",
           name: "="
       },
       templateUrl: 'ageCheck.html',
       link: function(scope, element) {

       },
       controller: function($scope, $attrs, $element, config) {

           $scope.$watch("age", function(val) {
               if(!val || val <= config.allowedAge) {
                   $scope.message = config.messages.error;
               } else {
                   $scope.message = config.messages.ok;
               }
           });

           function check() {
               console.log($scope, $attrs, config, $scope.name);
           }

           $scope.check = check;
       }
   }
});
