qanda.controller('qandaController', ['$scope', 'qandaService','$sce', function ($scope, qandaService,$sce) {

    $scope.model = {
        headlineIds: [],
        nodeListRaw: [],
        nodeListSorted: []
    }


    $scope.$watch('model.headlineIds', function (ids, oldids) {

        if ((typeof ids != 'undefined')&&(ids.length != 0)) {
            qandaService.getNodes(ids).then(function (nodes) {
                $scope.model.nodeListSorted = nodes;
            });
        }
    })

    $scope.getLatestNodes = function () {

        qandaService.getLatestNodeIds().then(function (ids) {
            $scope.model.headlineIds = ids;

        },function(reason) {
            $scope.model.nodeListSorted = false;
        });

    }
}])