// TODO use locales
define(["veldoffice/KLIC"], (KLIC) => [{
    name: "KLIC - kabels en leidingen",
	// checked: false,
    version: "1.1.1",
    technicalName: "_2113929216_20702,_2113929216_20710,_2113929216_20711,_2113929216_20709,_2113929216_20705,_2113929216_20703,_2113929216_20707,_2113929216_20708,_2113929216_20706,_2113929216_20722,_2113929216_20723,_2113929216_20725,_2097152006_1619945,_2113929216_20727",
    style: ",,,,,,,,,,,,,,",
    maxResolution: 6.88,
    service: {
		type: "wms",
		url: "http://app.vectorklic.nl/veldapps/wms"
    },
    seperator: true,
	layers: KLIC.layers,
	isKLIC: true
}, {
	name: "KLIC - contouren",
	// checked: false,
    version: "1.1.1",
    technicalName: "_2113929216_20728",
    style: "",
    // maxResolution: 6.88,
    service: {
		type: "wms",
		url: "http://app.vectorklic.nl/veldapps/wms"
    }
}]);