/**
 * Created by ASKuznetsov on 3/18/14.
 */

var rApp = angular.module('sampleApp', ['ngRoute']);

rApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'index.tpl',
            controller: 'indexCtrl'
        })
        .when('/app', {
            templateUrl: 'app.tpl',
            controller: 'appCtrl'
        })
        .when('/test', {
            templateUrl: 'test.tpl'
        })
        .otherwise({
            template: 'nothing to show!'
        })

}).controller('indexCtrl', ['$scope', function(s){
    s.name = "Index!";

    s.ui = {
        btnState: 'Hide'
    }

    s.clickCount = 0;

    s.inc = function() {
        s.clickCount++
    }
}]).controller('appCtrl', ['$scope', '$q', 'appSettings', '$injector', '$http', function(s, q, settings, injector, http) {

    s.appName = settings.appName;

    function testSuccess(data) {
        console.log(data);
    }


    http.get("http://localhost:3001/json")
        .success(function(data) {
            console.log(data);
        });


    var defer = q.defer();

    defer.promise
        .then(function(msg) {
            console.log('first console.log from promise say: ' + msg);
            return "Hey!"
        }).then(function(msg) {
            console.log('second console.log: ' + msg);
            return msg;
        }).then(function(msg) {
            console.log('third console.log: ' + msg);
        }).then(function() {
            s.appName = settings.secondAppName
            return "http://localhost:3001/json"
        }).then(function(url) {
            http.get(url).success(testSuccess);
        }).then(function() {
            console.log('end.')
        });


    setTimeout(function() {
        defer.resolve("Hi!");
    }, settings.deferDelay)

    // injector sample
    injector.invoke(function(aditionSettings) {
        s.author = aditionSettings.author;

    });

}]);

rApp.directive('tsDer', function() {
    return function(scope, element) {
        element.addClass('test');
    }
})

rApp.factory('appSettings', function() {
    return {
        appName: "Some test App",
        deferDelay: 3000,
        secondAppName: "App for defer test"
    }
}).factory('aditionSettings', function() {
    return {
        author: "Artem"
    }
});


/**
 * Second App
 * @type {*|module}
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

app.controller('isolateScopeCtrl', function($sc) {

})

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
