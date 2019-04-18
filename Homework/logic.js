// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer to the map
L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoicHZjb3VzaW4iLCJhIjoiY2p0YXNzZHB2MDh1bDRhbzVma2pka2dkZSJ9.IUPzc57tqM2xs-z-FiUYww"
  ).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url, function(quakes) {


  // Loop through data
  for (var i = 0; i < quakes.length; i++) {
	
  	var color = "orange";
	  if (quakes[i].mag > 4.5) {
		  color = "yellow";
	  }
	  else if (quakes[i].mag > 2.5) {
		  color = "blue";
	  }
	  else if (quakes[i].mag > 1.5) {
	  	color = "green";
  	}
	  else {
		  color = "red";
	  }
		// use L.geojson and take it out of the function.
	  L.circle(quakes[i].coordinates, {
		fillOpacity: 0.75,
		color: "white",
		fillColor: color,
		radius: quakes[i].Feature.properties.mag * 2000
	  }).bindPopup("<h1>" + quakes[i].title + "</h1> <hr> <h3>Points: " + quakes[i].mag + "</h3>").addTo(myMap)
	}
})