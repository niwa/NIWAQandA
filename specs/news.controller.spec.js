describe('Controller: qandaController', function () {
    var scope, qandaService;
    var mockNodeIds = new Array('22,33,44,55,66');
    var mockNodeListSorted = new Array(
        {
            'created': '1447120695',
            'title': 'Jasmine tests1',
            'question': '<p>Tests</p>',
            'answer': 'test summary1'


        },
        {
            'created': '1447120696',
            'title': 'Jasmine tests2',
            'question': '<p>Tests</p>',
            'answer': 'test summary2'


        }
    )

    beforeEach(function () {

        var mockResponse = {};
        module('qanda', function ($provide) {
            $provide.value('qandaService', mockResponse);
        })

        inject(function ($q) {


            mockResponse.getLatestNodeIds = function ($scope) {

                var defer = $q.defer();
                defer.resolve(mockNodeIds);
                return defer.promise;
            }
            mockResponse.getNodes = function (mockNodeIds, $scope) {
                var defer = $q.defer();
                defer.resolve(mockNodeListSorted);
                return defer.promise;
            }
        })
    })

    beforeEach(inject(function ($controller, $rootScope, _qandaService_) {
        scope = $rootScope;
        qandaService = _qandaService_;
        controller = $controller('qandaController', {$scope: scope, qandaService: qandaService});
        scope.getLatestNodes();
        scope.$digest();
    }));

    it('should set the correct values into the scope', function () {
        expect(scope.model.headlineIds).toEqual(new Array('22,33,44,55,66'));
        expect(scope.model.nodeListSorted).toEqual(mockNodeListSorted);
    })
})