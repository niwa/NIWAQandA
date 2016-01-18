describe('It should display qanda', function () {
    var $compile, $rootscope, $scope;

    beforeEach(module('qanda', function ($provide,$controllerProvider) {
        $controllerProvider.register('qandaController',function ($scope) {
            $scope.model = {
                headlineIds: [],
                nodeListRaw: [],
                nodeListSorted: []
            }
            var nodes = [
                {
                    'created': "1447120695",
                    'nid': "1",
                    'question':'question1',
                    'answer':'answer1',
                    'title':'testing1'
                },
                {
                    'created': "1447120696",
                    'nid': "2",
                    'question':'question2',
                    'answer':'answer2',
                    'title':'testing2'
                },
                {
                    'created': "1447120697",
                    'format': 'filtered_html',
                    'nid': "3",
                    'question':'question3',
                    'answer':'answer3',
                    'title':'testing3'
                }
            ]

            $scope.getLatestNodes = function () {

                $scope.model.nodeListSorted = nodes;
            }
        })
    }))

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
    }));


    it('Checks that the message is displayed corrently', function () {
        // Compile a piece of HTML containing the directive
        var element = $compile("<qanda></qanda>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain('question1');
        expect(element.html()).toContain('question2');
        expect(element.html()).toContain('question3');
        expect(element.html()).toContain('answer1');
        expect(element.html()).toContain('answer2');
        expect(element.html()).toContain('answer3');

    })

})