describe('first', function() {
    it("should be true", function() {
        expect((true).toBe(false));
    })
})
//describe("First test", function() {
//    var element;
//    var $scope;
//    beforeEach(inject(function($compile, $rootScope) {
//        $scope = $rootScope;
//        element = angular.element("<div>{{2 + 2}}</div>");
//        element = $compile(element)($rootScope);
//    }))
//
//    it("should eaual 4", function() {
//        $scope.digest();
//        expect(element.html()).toBe("4");
//    })
//})