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
        '<div ng-repeat="node in model.nodeListSorted" class="body">' +
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