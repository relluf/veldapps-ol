define([], () => {

	function getVisibleFeatures(map) {
		// Function to get the visible features
	    const visibleFeatures = [];
	    
	    // Get the current map view's extent
	    const viewExtent = map.getView().calculateExtent(map.getSize());
	
	    // Iterate through all layers on the map
	    map.getLayers().forEach(layer => {
	        // Check if the layer is a Vector layer
	        if (layer instanceof ol.layer.Vector) {
	            const source = layer.getSource();
	            
	            // Iterate through all features in the layer's source
	            source.forEachFeature(feature => {
	                const geometry = feature.getGeometry();
	                
	                // Check if the feature's geometry intersects with the view extent
	                if (geometry.intersectsExtent(viewExtent)) {
	                    visibleFeatures.push(feature);
	                }
	            });
	        }
	    });
	    
	    return visibleFeatures;
	}
	function createPolygonFromVisibleFeatures(map, opts) {
		// Function to generate a polygon based on the outer vertices of visible features
	    const visibleFeatures = getVisibleFeatures(map);
	    let allCoordinates = [];
	
	    // Collect all vertices from the visible features
	    visibleFeatures.forEach(feature => {
	        const geometry = feature.getGeometry();
	
	        // Get the coordinates based on geometry type
	        if (geometry instanceof ol.geom.Point) {
	            allCoordinates.push(geometry.getCoordinates());
	        } else if (geometry instanceof ol.geom.LineString || geometry instanceof ol.geom.Polygon) {
	            allCoordinates = allCoordinates.concat(geometry.getCoordinates());
	        } else if (geometry instanceof ol.geom.MultiPolygon || geometry instanceof ol.geom.MultiLineString) {
	            allCoordinates = allCoordinates.concat(geometry.getCoordinates().flat());
	        }
	    });
	
	    // If no coordinates, return null
	    if (allCoordinates.length === 0) {
	        return null;
	    }
	
	    // Compute the convex hull of the points using Turf.js (for example)
	    // Install Turf.js using npm or include it via CDN in your HTML
	    // <script src="https://cdn.jsdelivr.net/npm/@turf/turf"></script>
	    const hull = turf.convex(turf.points(allCoordinates.map(coord => {
	        return [coord[0], coord[1]];  // Turf.js expects [longitude, latitude]
	    })));
	
	    // Get the coordinates of the resulting hull (polygon)
	    const hullCoordinates = hull.geometry.coordinates;
	
	    // Create a new OpenLayers polygon geometry
	    const polygon = new ol.geom.Polygon(hullCoordinates);
	
	    // Optionally create a feature from the polygon and add it to the map
	    const polygonFeature = new ol.Feature(polygon);
	
opts = opts || {};
if(opts.source) {
		
}
	// if(0) {
	//     // Example of adding this feature to a vector layer
	//     const vectorSource = new ol.source.Vector({
	//         features: [polygonFeature]
	//     });
	
	//     const vectorLayer = new ol.layer.Vector({
	//         source: vectorSource
	//     });
	
	//     map.addLayer(vectorLayer);
	// }
	
	    return polygon;
	}
	function createMultiSurfaceFromPolygons() {
		// Function to create a MultiSurface (represented as a MultiPolygon in OpenLayers)
	    const polygons = [];
	
	    // Example: add the polygon from the previous response
	    const polygon = createPolygonFromVisibleFeatures();
	    if (polygon) {
	        polygons.push(polygon.getCoordinates());  // Add the polygon's coordinates to the array
	    }
	
	    // Create a MultiPolygon geometry
	    const multiPolygon = new ol.geom.MultiPolygon([polygons]);
	
	    // Create a new feature from the MultiPolygon
	    const multiPolygonFeature = new ol.Feature(multiPolygon);
	
	    // Example: Add the feature to a vector layer and display on the map
	    const vectorSource = new ol.source.Vector({
	        features: [multiPolygonFeature]
	    });
	
	    const vectorLayer = new ol.layer.Vector({
	        source: vectorSource
	    });
	
	    // Add the vector layer with the MultiPolygon to the map
	    map.addLayer(vectorLayer);
	
	    return multiPolygon;
	}
	function getWKTFromSource(map, source) {
	    const format = new ol.format.WKT();
	    
	    // Get all features from the vector source
	    const features = source.getFeatures();
	    
	    // Convert the features to a WKT string
	    const wktString = format.writeFeatures(features, {
	        dataProjection: 'EPSG:28992',  // Use the projection you are working with (e.g., Dutch RD)
	        featureProjection: map.getView().getProjection()  // Match the map's projection
	    });
	    
	    return wktString;
	}
	function flattenWKT(wktString) {

	    // Functie om alle polygonen te extraheren uit een WKT-string
		function extractPolygons(wkt) {
		    const polygons = [];
		
		    // Verwijder de buitenste GEOMETRYCOLLECTION delen
		    // let cleanedWkt = wkt.replace(/GEOMETRYCOLLECTION/g, '').replace(/[\(\)]{2,}/g, ' ').trim();
		
		    // Zoek naar POLYGON structuren
		    const polygonMatches = wkt.match(/POLYGON\s*\(\([^\)]+\)\)/g);
		    
		    if (polygonMatches) {
		        polygons.push(...polygonMatches);
		    }
		
		    return polygons;
		}	
	    // Extract de polygonen
	    const polygons = extractPolygons(wktString);
	    
	    // Bouw de vereenvoudigde WKT-structuur
	    const simplifiedWKT = `GEOMETRYCOLLECTION(${polygons.join(',')})`;
	
	    return simplifiedWKT;
	}

	return {
		
		getVisibleFeatures,
		createPolygonFromVisibleFeatures,
		getWKTFromSource,
		flattenWKT
		
	};
	
	
});