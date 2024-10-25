define(() => [{
	name: "GRB",
	technicalName: "grb_bsk",
	style: "GRB-Basiskaart",
	format: "image/png",
	matrixSet: "BPL72VL",
	matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	resolutions: [1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625, 0.03125], 
	origin: [9928, 329072], 
	service: { 
		url: "https://geo.api.vlaanderen.be/GRB/wmts",
		type: "wmts"
	}
	// minResolution: 0.21,
	// maxResolution: 26.88,
	// seperator: true,
}, {
	name: "Luchtfoto",
	technicalName: "omzrgb21vl",
	format: "image/png",
	matrixSet: "BPL72VL",
	matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	resolutions: [1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625, 0.03125], 
	origin: [9928, 329072], 
	service: {
		url: "https://geo.api.vlaanderen.be/OMZ/wmts",
		type: "wmts"
	}
}]);
