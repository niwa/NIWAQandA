"use_strict"
describe("get qanda", function () {
    var newsService, newsModelService, httpBackend;
    var testResponse = '{"titles":[{"title":"What is a drought?","created":"1400798790","nid":"110"},{"title":"How does dew form ' +
        '?","created":"1400798156","nid":"109"},{"title":"Jane\'s Testing Q&A","created":"1400113688","nid":"94" ' +
        '},{"title":"HTML","created":"1399326723","nid":"76"},{"title":"How can I run faster?","created":"1397616339"' +
        '    ,"nid":"63"},{"title":"Why do we have day light saving?","created":"1397616159","nid":"62"},{"title"' +
        ':"Thisrty","created":"1397616064","nid":"61"},{"title":"Fireworks","created":"1397615868","nid":"60"' +
        '},{"title":"Linux","created":"1397533651","nid":"59"}]}';

    var testReponseNode = '{"vid":"110","uid":"119","title":"How does dew form?","log":"","status":"1","comment":"2","promote":"1","sticky":"0","vuuid":"c082b62f-e5f9-414c-ac29-f7614b220c83","nid":"109","type":"forecast_faq","language":"und","created":"1400798156","changed":"1400798156","tnid":"0","translate":"0","uuid":"6f00b056-969f-4e03-800a-073febc04367","revision_timestamp":"1400798156","revision_uid":"119","field_answer":{"und":[{"value":"answer"}]},"field_question":{"und":[{"value":"This is the question","format":"filtered_html","safe_value":"How does dew form?"}]},"field_rating":[],"field_forecast_faq_tags":{"und":[{"tid":"35"}]} ,"field_notice_active":[],"rdf_mapping":{"rdftype":["sioc:Item","foaf:Document"],"title":{"predicates":["dc:title"]},"created":{"predicates":["dc:date","dc:created"],"datatype":"xsd:dateTime","callback":"date_iso8601"},"changed":{"predicates":["dc:modified"],"datatype":"xsd:dateTime","callback":"date_iso8601"},"body":{"predicates":["content:encoded"]},"uid":{"predicates":["sioc:has_creator"],"type":"rel"},"name":{"predicates":["foaf:name"]},"comment_count":{"predicates":["sioc:num_replies"],"datatype":"xsd:integer"},"last_activity":{"predicates":["sioc:last_activity_date"],"datatype":"xsd:dateTime","callback":"date_iso8601"}},"cid":"0","last_comment_timestamp":"1400798156","last_comment_name":null,"last_comment_uid":"119","comment_count":"0","name":"Colin","picture":"0","data":"b:0;","path":"http://content-test.niwa.co.nz /node/109"}';
    beforeEach(module("qanda"));

    beforeEach(inject(function (_qandaService_, _qandaModelService_, $httpBackend) {
        qandaService = _qandaService_;
        qandaModelService = _qandaModelService_;
        httpBackend = $httpBackend;

        httpBackend.whenGET(qandaModelService.get('headlinesUrl')).respond(function (method, url, data) {
            return [200, testResponse];
        })
        var exptUrl = qandaModelService.get('nodeUrl') + '109';
        httpBackend.whenGET(exptUrl).respond(function (method, url, data) {

            return [200, testReponseNode];
        })

    }))

    it("should have the right nodes", function () {
        qandaService.getLatestNodeIds().then(function (ids) {
            expect(ids).toEqual(['110', '109', '94', '76', '63', '62', '61', '60', '59']);
        })

        var ids = new Array(0);
        ids.push(109);

        qandaService.getNodes(ids).then(function (nodes) {
            expect(nodes[0].nid).toEqual('109');
            expect(nodes[0].title).toEqual('How does dew form?')
        })
        httpBackend.flush();
    })
})


