define(() => [{
	name: "BRT Achtergrondkaart",
	checked: !false,
	technicalName: "standaard",
	minResolution: 0.21,
	service: {
		url: "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0",
		type: "wmts"
	}
}, {
	name: "Luchtfoto",
	checked: true,
	technicalName: "Actueel_ortho25",
	style: "default",
	// minResolution: 7.15,
	maxResolution: 20,
	service: { 
		url: "https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0",
		type: "wmts"
	}
}, {
	name: "Kadastrale kaart",
	checked: false,
	technicalName: "Kadastralekaart",
	// minResolution: 0.21,
	maxResolution: 0.84,
	service: {
		type: "wmts",
		url: "https://geodata.nationaalgeoregister.nl/kadastralekaart/wmts/v4_0"
	}
}, {
	name: "Labels",
	technicalName: "lufolabels",
	minResolution: 0.21,
	maxResolution: 26.88,
	service: { 
		url: "https://service.pdok.nl/bzk/luchtfotolabels/wmts/v1_0",
		type: "wmts"
	},
	seperator: true
}]);