define(["ol", "proj4"], function(ol_is_a_global, proj4) {

	proj4.defs("EPSG:28992","+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs");

	ol.proj.proj4.register(proj4);
	
	// Geldigheidsgebied van het tiling schema in RD-coördinaten:
	var extent = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];
	var projection = new ol.proj.Projection({ 
		code: 'EPSG:28992', 
		units: 'm', 
		extent: extent 
	});
	
	// Resoluties (pixels per meter) van de zoomniveaus:
	var resolutions = [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210];
	var size = ol.extent.getWidth(extent) / 256;
	
	// Er zijn 15 (0 tot 14) zoomniveaus beschikbaar van de WMTS-service voor de BRT-Achtergrondkaart:
	var matrixIds = new Array(15);
	for(var z = 0; z < 15; ++z) {
	    matrixIds[z] = 'EPSG:28992:' + z;
	}
	
	var Helpers = (function() {
		
		var X0 = 155E3, Y0 = 463E3, 
			lat0 = 52.1551744, lng0 = 5.38720621;
		
		var latpqK = [];
		for (i = 1; 12 > i; i++) {
			latpqK[i] = [];
		}
		latpqK[1].p = 0; latpqK[1].q = 1; latpqK[1].K = 3235.65389;
		latpqK[2].p = 2; latpqK[2].q = 0; latpqK[2].K = -32.58297;
		latpqK[3].p = 0; latpqK[3].q = 2; latpqK[3].K = -0.2475;
		latpqK[4].p = 2; latpqK[4].q = 1; latpqK[4].K = -0.84978;
		latpqK[5].p = 0; latpqK[5].q = 3; latpqK[5].K = -0.0665;
		latpqK[6].p = 2; latpqK[6].q = 2; latpqK[6].K = -0.01709;
		latpqK[7].p = 1; latpqK[7].q = 0; latpqK[7].K = -0.00738;
		latpqK[8].p = 4; latpqK[8].q = 0; latpqK[8].K = 0.0053;
		latpqK[9].p = 2; latpqK[9].q = 3; latpqK[9].K = -3.9E-4;
		latpqK[10].p = 4; latpqK[10].q = 1; latpqK[10].K = 3.3E-4;
		latpqK[11].p = 1; latpqK[11].q = 1; latpqK[11].K = -1.2E-4;
		
		var lngpqL = [];
		for (i = 1; 13 > i; i++) {
			lngpqL[i] = [];
		}
		lngpqL[1].p = 1; lngpqL[1].q = 0; lngpqL[1].K = 5260.52916;
		lngpqL[2].p = 1; lngpqL[2].q = 1; lngpqL[2].K = 105.94684;
		lngpqL[3].p = 1; lngpqL[3].q = 2; lngpqL[3].K = 2.45656;
		lngpqL[4].p = 3; lngpqL[4].q = 0; lngpqL[4].K = -0.81885;
		lngpqL[5].p = 1; lngpqL[5].q = 3; lngpqL[5].K = 0.05594;
		lngpqL[6].p = 3; lngpqL[6].q = 1; lngpqL[6].K = -0.05607;
		lngpqL[7].p = 0; lngpqL[7].q = 1; lngpqL[7].K = 0.01199;
		lngpqL[8].p = 3; lngpqL[8].q = 2; lngpqL[8].K = -0.00256;
		lngpqL[9].p = 1; lngpqL[9].q = 4; lngpqL[9].K = 0.00128;
		lngpqL[10].p = 0; lngpqL[10].q = 2; lngpqL[10].K = 2.2E-4;
		lngpqL[11].p = 2; lngpqL[11].q = 0; lngpqL[11].K = -2.2E-4;
		lngpqL[12].p = 5; lngpqL[12].q = 0; lngpqL[12].K = 2.6E-4;
		
		var XpqR = [];
		for (i = 1; 10 > i; i++) { 
			XpqR[i] = [];
		}
		XpqR[1].p = 0; XpqR[1].q = 1; XpqR[1].R = 190094.945;
		XpqR[2].p = 1; XpqR[2].q = 1; XpqR[2].R = -11832.228;
		XpqR[3].p = 2; XpqR[3].q = 1; XpqR[3].R = -114.221;
		XpqR[4].p = 0; XpqR[4].q = 3; XpqR[4].R = -32.391;
		XpqR[5].p = 1; XpqR[5].q = 0; XpqR[5].R = -0.705;
		XpqR[6].p = 3; XpqR[6].q = 1; XpqR[6].R = -2.34;
		XpqR[7].p = 1; XpqR[7].q = 3; XpqR[7].R = -0.608;
		XpqR[8].p = 0; XpqR[8].q = 2; XpqR[8].R = -0.008;
		XpqR[9].p = 2; XpqR[9].q = 3; XpqR[9].R = 0.148;
		
		var YpqS = [];
		for (i = 1; 11 > i; i++) {
			YpqS[i] = [];
		}
		YpqS[1].p = 1; YpqS[1].q = 0; YpqS[1].S = 309056.544;
		YpqS[2].p = 0; YpqS[2].q = 2; YpqS[2].S = 3638.893;
		YpqS[3].p = 2; YpqS[3].q = 0; YpqS[3].S = 73.077;
		YpqS[4].p = 1; YpqS[4].q = 2; YpqS[4].S = -157.984;
		YpqS[5].p = 3; YpqS[5].q = 0; YpqS[5].S = 59.788;
		YpqS[6].p = 0; YpqS[6].q = 1; YpqS[6].S = 0.433;
		YpqS[7].p = 2; YpqS[7].q = 2; YpqS[7].S = -6.439;
		YpqS[8].p = 1; YpqS[8].q = 1; YpqS[8].S = -0.032;
		YpqS[9].p = 0; YpqS[9].q = 4; YpqS[9].S = 0.092;
		YpqS[10].p = 1; YpqS[10].q = 4; YpqS[10].S = -0.054;
		
		function gps2X(b, c) {
			var a = 0;
			dlat = 0.36 * (b - lat0);
			dlng = 0.36 * (c - lng0);
			for (i = 1; 10 > i; i++) {
				a += XpqR[i].R * Math.pow(dlat, XpqR[i].p) * Math.pow(dlng, XpqR[i].q);
			}
			return X0 + a;
		}
		function gps2Y(b, c) {
			var a = 0;
			dlat = 0.36 * (b - lat0);
			dlng = 0.36 * (c - lng0);
			for (i = 1; 11 > i; i++) {
				a += YpqS[i].S * Math.pow(dlat, YpqS[i].p) * Math.pow(dlng, YpqS[i].q);
			}
			return Y0 + a;
		}
		function RD2lat(b, c) {
			var a = 0;
			dX = 1E-5 * (b - X0);
			dY = 1E-5 * (c - Y0);
			for (i = 1; 12 > i; i++) {
				a += latpqK[i].K * Math.pow(dX, latpqK[i].p) * Math.pow(dY, latpqK[i].q);
			}
			return lat0 + a / 3600;
		}
		function RD2lng(b, c) {
			var a = 0;
			dX = 1E-5 * (b - X0);
			dY = 1E-5 * (c - Y0);
			for (i = 1; 13 > i; i++) {
				a += lngpqL[i].K * Math.pow(dX, lngpqL[i].p) * Math.pow(dY, lngpqL[i].q);
			}
			return lng0 + a / 3600;
		}
		
		return {
			gps2X: gps2X, gps2Y: gps2Y,
			RD2lat: RD2lat, RD2lng: RD2lng
		};

	}());

	return {
		fromLL: function(pt) {
			return proj4("EPSG:4326", "EPSG:28992", pt);
		},
		toLL: function(pt) {
			return proj4("EPSG:28992", "EPSG:4326", pt);
		},
		
/* VeldwerkM */
		determine_lam84: function(lng /**As String*/, sign /**As String*/) /**As Double*/ {
			if(lng && lng.length < 3) {
				return;
			}
	
		    var lam84 ;/**As Double*/
		    var dgr ;/**As Double*/
		    var min ;/**As Double*/
	
		    dgr = parseFloat(lng.substring(0, 3));//CDbl(Left(lng, 3))
		    min = parseFloat(lng.substring(3)); //CDbl(Mid(lng, 4))
	
		    lam84 = dgr + min / 60;
		    if(sign === "W") {
		        lam84 = -lam84;
		    }
	
		    return lam84;
		},
		determine_lamRD: function(phi84 /**As Double*/, lam84 /**As Double*/) { //As Double
		    return ((lam84 - (-37.902 + 0.329 * (phi84 - 52) - 14.667 * (lam84 - 5)) * 1E-05) - 5.3876388888) * 0.36;
		},
		determine_phi84: function(lat /**As String*/, sign /**As String*/) { //As Double
			if(lat && lat.length < 2) {
				return;
			}
	
		    var phi84 ;/**As Double*/
		    var dgr ;/**As Double*/
		    var min ;/**As Double*/
	
		    dgr = parseFloat(lat.substring(0, 2)); //CDbl(Left(lat, 2))
		    min = parseFloat(lat.substring(2)); //CDbl(Mid(lat, 3))
	
		    phi84 = dgr + min / 60;
		    if(sign === "S") {
		        phi84 = -phi84;
		    }
	
		    return phi84;
		},
		determine_phiRD: function(phi84 /**As Double*/, lam84 /**As Double*/) { //As Double
		    return ((phi84 - (-96.86199999999999 - 11.714 * (phi84 - 52) - 0.125 * (lam84 - 5)) * 1E-05) - 52.1561605556) * 0.36;
		},
		determine_RD_X: function(phiRD /**As Double*/, lamRD /**As Double*/) { //As Double
	
		    var x ;/**As Double*/
		    var phiRD2 ;/**As Double*/
		    var phiRD3 ;/**As Double*/
		    var lamRD2 ;/**As Double*/
		    var lamRD3 ;/**As Double*/
	
		    phiRD2 = phiRD * phiRD;
		    phiRD3 = phiRD * phiRD2;
	
		    lamRD2 = lamRD * lamRD;
		    lamRD3 = lamRD * lamRD2;
	
		    x = 190066.9897 * lamRD - 11830.85831 * phiRD * lamRD - 114.19754 * phiRD2 * lamRD;
		    x = x - (32.3836 * lamRD3 - 2.34078 * phiRD3 * lamRD - 0.60639 * phiRD * lamRD3 + 0.15774 * phiRD2 * lamRD3);
		    x = x + 155000;
		    x = x * 1000;
	
		    return x;
		},
		determine_RD_Y: function(phiRD /**As Double*/, lamRD /**As Double*/) { //As Double
	
		    var y ;/**As Double*/
		    var phiRD2 ;/**As Double*/
		    var phiRD3 ;/**As Double*/
		    var lamRD2 ;/**As Double*/
		    var lamRD3 ;/**As Double*/
		    var lamRD4 ;/**As Double*/
	
		    phiRD2 = phiRD * phiRD;
		    phiRD3 = phiRD * phiRD2;
	
		    lamRD2 = lamRD * lamRD;
		    lamRD3 = lamRD * lamRD2;
		    lamRD4 = lamRD * lamRD3;
	
		    y = 309020.3181 * phiRD + 3638.36193 * lamRD2 - 157.95222 * phiRD * lamRD2 + 72.97141000000001 * phiRD2;
		    y = y + (59.79734 * phiRD3 - 6.43481 * phiRD2 * lamRD2 + 0.09351 * lamRD4 - 0.07378999999999999 * phiRD3 * lamRD2);
		    y = y + 463000;
		    y = y * 1000;
	
		    return y;
		},
		nmeaToRD: function(nmea) {
	
		    var phi84 ;/**As Double*/
		    var lam84 ;/**As Double*/
		    var phiRD ;/**As Double*/
		    var lamRD ;/**As Double*/
	
		    var fields = nmea.split(",");
	
		    phi84 = this.determine_phi84(fields[2] || "", fields[3] || "");
		    lam84 = this.determine_lam84(fields[4] || "", fields[5] || "");
		    phiRD = this.determine_phiRD(phi84, lam84);
		    lamRD = this.determine_lamRD(phi84, lam84);
	
		    return {
		    	x: this.determine_RD_X(phiRD, lamRD),
		    	y: this.determine_RD_Y(phiRD, lamRD)
	//	    	,fields: fields, phi84: phi84, phiRD: phiRD, lam84: lam84, lamRD: lamRD
		    };
		},
		ll2rd: function(lon, lat) {
			if(lon.lat !== undefined) {
				lon = lon.lon;
				lat = lon.lat;
			}
			
			var phi84 = lat;
			var lam84 = lon;
			
		    var phiRD = this.determine_phiRD(phi84, lam84);
		    var lamRD = this.determine_lamRD(phi84, lam84);
	
		    return {
		    	x: this.determine_RD_X(phiRD, lamRD) / 1000,
		    	y: this.determine_RD_Y(phiRD, lamRD) / 1000
		    };
		},
		
/* gpscoordinaten.eu */
		rd2ll: function(x, y) {
			return [Helpers.RD2lat(x, y), Helpers.RD2lng(x, y)];
/*- inverse of ll2rd?

			var phiRD = x;
			var lamRD = y;
			
			var phiRD = 
			var lamRD =
			
			return {
				lat: this.determine
				lng; 
			}
*/
		},
		
		Helpers: Helpers,

		zoomByResolution(resolution) {
			var z = resolutions.length - 1;
			while(z > 0 && resolution > resolutions[z--]) ;

			return z;
		},
		resolutions: resolutions,
		projection: projection,
		extent: extent,
		matrixIds: matrixIds
	};
});

/*- Thanks to: https://geoforum.nl/t/brt-in-openlayers-4-6-4-hangen-mbv-wmts/1150/2 */ 
	// var RD = "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs";
	// proj4.defs("EPSG:28992", RD);
