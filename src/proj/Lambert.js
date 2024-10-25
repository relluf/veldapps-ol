define(["ol", "proj4"], function(ol_is_a_global, proj4) {

	// proj4.defs("EPSG:31370",
	// 	"+proj=lcc +lat_0=90 +lon_0=4.36748666666667 +lat_1=51.1666672333333 +lat_2=49.8333339 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.8686,52.2978,-103.7239,-0.3366,0.457,-1.8422,-1.2747 +units=m +no_defs +type=crs");	

	proj4.defs("EPSG:31370",
		"+proj=lcc +lat_0=90 +lon_0=4.36748666666667 +lat_1=51.1666672333333 +lat_2=49.8333339 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-99.059,53.322,-112.486,-0.419,-0.83,1.885,-0.99962 +units=m +no_defs +type=crs");	

	ol.proj.proj4.register(proj4);

	var projection = new ol.proj.Projection({
		code: 'EPSG:31370',
		extent: [18000, 15281, 280000, 329400],
		units: 'm',
		axisOrientation: 'enu',
	});

	return { 
		fromLL() {},
		toLL() {},
		
		projection: projection 
	};

});

