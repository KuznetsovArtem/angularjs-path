"use strict";

describe('first', function() {
    it("should be true", function() {
        expect((true)).toBe(true);
    });
});


describe('angular test', function() {
    var element;
    var $scope;
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope
        element = angular.element("<div>{{2 + 2}}</div>");
        element = $compile(element)($rootScope);
    }))

    it("should equal 4", function() {
        $scope.$digest();
        expect(element.html()).toBe("4");
    });

    it("still should be 4", function() {
        $scope.$digest();
        expect(element.html()).toBe("4");
    })

    it("should be 3", function() {
        $scope.$digest();
        expect(element.html()).toBe("4");
    })
});

describe('midule test', function() {
    var element;
    beforeEach(module('sampleApp'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope
        element = angular.element("<div ts-der>{{2 + 2}}</div>");
        element = $compile(element)($rootScope);
    }))

    describe('simple test', function() {
        it('shold pass', function() {
            expect(element.hasClass("test")).toBe(true);
        })
    })
})
