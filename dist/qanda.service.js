qanda
    .service('qandaService', ['$http', '$q','$sce', 'qandaModelService', function ($http, $q, $sce,newsModelService) {

        return {
            getLatestNodeIds: function () {

                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: newsModelService.get('headlinesUrl')
                }).then(function successCallback(response) {

                    var nodelIstLength = response.data.titles.length;
                    var nodeList = [];
                    for (i = 0; i < nodelIstLength; i++) {
                        nodeList.push(response.data.titles[i].nid)
                    }
                    deferred.resolve(nodeList);

                }, function errorCallback(response) {

                    return('http  error');
                });
                return deferred.promise;
            },

            getNodes: function (ids) {

                var compare = function (a, b) {
                    return b.created - a.created;
                }
                var deferred = $q.defer();

                var howManyNodesToShow = ids.length <= 10 ? ids.length : 10;
                var counter = 1;
                var nodes = [];
                for (i = 0; i < howManyNodesToShow; i++) {
                    $http({
                        method: 'GET',
                        url: newsModelService.get('nodeUrl') + ids[i]

                    }).then(function successCallback(response) {

                        node = {
                            'nid': response.data.nid,
                            'created': response.data.created,
                            'title': response.data.title,
                            'question': response.data.field_question.und[0].value,
                            'answer':response.data.field_answer.und[0].value
                        }
                        counter++;
                        nodes.push(node);
                        if (counter >= howManyNodesToShow) {

                            deferred.resolve(nodes.sort(compare));
                        }
                    }, function errorCallback(response) {
                        return('http error');
                    })
                }
                return deferred.promise;
            }
        }

    }])



