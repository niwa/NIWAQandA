var qanda = angular.module('qanda', []);
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
qanda.directive('qanda', [function () {
    function link(scope) {
        scope.getLatestNodes();
    }

    return {
        restrict: 'E',
        link: link,
        template: '<div id="niwaQndA" class="panel panel-primary">' +
        '<div class="panel-heading">' +
        '<h1 class="panel-title">NIWA Q&amp;A </h1>' +
        '</div>' +
        '<div ng-repeat="node in qanda.model.nodeListSorted" class="body">' +
        '<img width="100%" ng-show="$index==0" ng-src="{{node.nodeImage}}" />' +
        '<h3>{{node.title }}</h3>' +
        '<h4>Question</h4>' +
        '<p ng-bind-html="node.question | markup"></p>' +
        '<h4>Answer</h4>' +
        '<p ng-bind-html="node.answer | markup"></p>' +
        '</div>' +
        '</div>' +
        '</div></div>',
        controller: 'qandaController',
        scope: false
    };
}]);
qanda.filter('markup', ['$sce', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html);
    };
}]);
qanda
    .service('qandaModelService', [function () {
        return {
            get: function (key) {

                var params = {};
                params.contentType = 'forecast_faq';
                params.imageBaseUrl = 'http://content-test.niwa.co.nz/sites/default/files/';
                params.headlinesUrl = 'http://content-test.niwa.co.nz/content/resource_list_by_type/' + params.contentType;
                params.nodeUrl = 'http://content-test.niwa.co.nz/content/node/'; //+id
                params.nodesAmount = 10;
                if (typeof params[key] !== 'undefined') {
                    return params[key];
                }
                return 'invalid parameter request';
            }
        };
    }]);

qanda.service('qandaService', ['$http', '$q', '$sce', 'qandaModelService', function ($http, $q, $sce, newsModelService) {
    return {
        getLatestNodeIds: function () {

            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: newsModelService.get('headlinesUrl')
            }).then(function successCallback(response) {

                var nodelIstLength = response.data.titles.length;
                var nodeList = [];
                for (var i = 0; i < nodelIstLength; i++) {
                    nodeList.push(response.data.titles[i].nid);
                }
                deferred.resolve(nodeList);

            }, function errorCallback(response) {

                return ('http  error');
            });
            return deferred.promise;
        },

        getNodes: function (ids) {

            var compare = function (a, b) {
                return b.created - a.created;
            };
            var deferred = $q.defer();

            var howManyNodesToShow = ids.length <= 10 ? ids.length : 10;
            var counter = 1;
            var nodes = [];
            for (var i = 0; i < howManyNodesToShow; i++)
            {
                $http({
                    method: 'GET',
                    url: newsModelService.get('nodeUrl') + ids[i]

                }).then(function successCallback(response) {

                    var node = {
                        'nid': response.data.nid,
                        'created': response.data.created,
                        'title': response.data.title,
                        'question': response.data.field_question.und[0].value,
                        'answer': response.data.field_answer.und[0].value
                    };
                    counter++;
                    nodes.push(node);
                    if (counter >= howManyNodesToShow) {

                        deferred.resolve(nodes.sort(compare));
                    }
                }, function errorCallback() {
                    return ('http error');
                });
            }
            return deferred.promise;
        }
    };

}]);



