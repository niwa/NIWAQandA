qanda.controller('qandaController', ['$scope', 'qandaService', '$sce', function ($scope, qandaService) {

    $scope.qanda = {
        model: {
            headlineIds: [],
            nodeListRaw: [],
            nodeListSorted: []
        }
    };

    $scope.$watch('qanda.model.headlineIds', function (ids) {

        if ((typeof ids !== 'undefined') && (ids.length !== 0)) {
            qandaService.getNodes(ids).then(function (nodes) {
                $scope.qanda.model.nodeListSorted = nodes;
            });
        }
    });

    $scope.getLatestNodes = function () {

        qandaService.getLatestNodeIds().then(function (ids) {
            $scope.qanda.model.headlineIds = ids;

        }, function () {
            $scope.qanda.model.nodeListSorted = false;
        });

    };
}]);