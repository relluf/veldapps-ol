// TODO use locales
define([] || ["veldoffice/BRO"], (BRO) => [{
    name: "Grondwatermonitoringput (GMW)",
    technicalName: "gmw_kenset",
    checked: true,
    // legendUrl: "https://geodata.nationaalgeoregister.nl/brogmw/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=gmw",
    maxResolution: 26.88,
    service: {
		type: "wms",
		url: "https://service.pdok.nl/bzk/brogmwkenset/wms/v2_1"
    },
    path: ["Overige kaarten", "Basisregistratie Ondergrond (BRO)", "BRO - Grondwatermonitoringput (GMW)"],
    seperator: true,
    'bro-query': "gmw"
}]);