describe("get parameters", function () {
    var qandaModelService;

    beforeEach(module("qanda"));

    beforeEach(inject(function (_qandaModelService_) {
        qandaModelService = _qandaModelService_;

    }));

    it("should have the right values", function () {
        expect(qandaModelService.get('headlinesUrl')).toContain('/content/resource_list_by_type/forecast_faq');
        expect(qandaModelService.get('nodeUrl')).toContain('/content/node/');
        expect(qandaModelService.get('nodeUrlxyz')).toEqual('invalid parameter request');

    });
});