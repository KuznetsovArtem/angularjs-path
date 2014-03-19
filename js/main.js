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

    return $scope.appCtrl = self;
});
