
// ====================
// CONSTANTS AND SCALES
// ====================

var map_w = 650,
	info_w = 310,
	h = 500,
	header_h = 80,
	text_h = 300,
	padding = 10;

var fillCol = d3.scale.linear()
	.domain([0, 1])
	.range(["green", "red"]);

var dotSize = d3.scale.linear()
	.domain([0, 1, 10, 100, 1000])
	.range([4, 6, 8, 9, 12]);

// ===================
// POLLING SFPARK DATA
// cf: http://javascriptweblog.wordpress.com/2010/11/29/json-and-jsonp/
// ===================
var reqURL = 'http://api.sfpark.org/sfpark/rest/availabilityservice?lat=37.79&long=-122.41&radius=3&uom=mile&response=json&jsoncallback=addGarages&pricing=yes';

var scriptTag = document.createElement('SCRIPT');
scriptTag.src = reqURL;

document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);

// =========================
// DRAWING MAIN MAP ELEMENTS
// cf: http://blockses.appspot.com/899670
// =========================
var po = org.polymaps;

var map = po.map()
	.container(d3.select("#map").append("svg:svg").node())
	.center({lat:37.779, lon:-122.425})
	.zoom(13)
	.add(po.drag())
	.add(po.wheel().smooth(false))
	.add(po.dblclick())
	.add(po.arrow());

map.add(po.image()
    .url(po.url("http://{S}tile.cloudmade.com"
    + "/83a0ee76ff0049748b22c0c831ab5f73" // CloudMade Developer API Key
    + "/998/256/{Z}/{X}/{Y}.png")
    .hosts(["a.", "b.", "c.", ""])));

map.add(po.compass()
	.pan("none"));

var infobox = d3.select("#detail")
	.append("svg:svg");

var header = infobox.append("svg:g")
	.attr("id", "info-header")
	.attr("width", info_w - (2 * padding))
	.attr("height", header_h)
	.attr("transform", "translate(" + padding + "," + padding + ")")
	.style("stroke", "#333")
	.style("fill", "#ddd");

header.append("svg:text")
	.text("Check it out.");

var locations = [];

// ===========================================================
// CALLBACK FUNCTION WHICH PROCESSES DATA RETURNED FROM SFPARK
// ===========================================================
var addGarages = function(data) {
	var num_records = data.NUM_RECORDS;
	var records = data.AVL;

	for (var i = 0 ; i < num_records ; i++) {
		locObj = new LocationObject(records[i]);
		locations.push(locObj);
	}
	
	var layer = d3.select("#map svg")
		.insert("svg:g", ".compass");

	var marker = layer.selectAll("g")
		.data(locations)
		.enter().append("svg:g")
		.attr("transform", transform);
	
	marker.append("svg:circle")
		.attr("class", "garage")
		.attr("r", circleSize)
		.style("fill", fillColor)
		.on("mouseover", displayInfo);
	
	marker.append("svg:title")
		.attr("x", 7)
		.attr("dy", ".31em")
		.text(function(d) {return d.info.oper + " spaces, " + (d.info.oper - d.info.occ) + " open."; });
		
	map.on("move", function() {
		layer.selectAll("g").attr("transform", transform);
	});
	
	function fillColor(d) {
		return ((d.info.oper > 0) && (d.info.occ >= 0)) ? fillCol(d.info.occ / d.info.oper) : "gray";
	}
	
	function circleSize(d) {
		return ((d.info.oper > 0) && (d.info.occ >= 0)) ? dotSize(d.info.oper - d.info.occ) : 7;
	}
	
	function displayInfo(d) {
		
	}
	
	// HELPER FUNCTIONS FOR ADDGARAGES
	function LocationObject(record) {
		var locData = record.LOC.split(",");
		this.longitude = parseFloat(locData[0]);
		this.latitude = parseFloat(locData[1]);

		this.info = new InfoObject(record);
		this.ophrs = ((record.OPHRS == undefined) ? -1 : record.OPHRS);		// Get back to these.
		this.rates = ((record.RATES == undefined) ? -1 : record.RATES);		// Get back to these.

	}

	function InfoObject(record) {
		this.type = record.TYPE;
		this.name = record.NAME;
		this.desc = record.DESC;
		this.inter = record.INTER;
		this.tel = record.TEL;
		this.occ = ((record.OCC == undefined) ? -1 : parseInt(record.OCC));		// Store -1 if data not available
		this.oper = ((record.OPER == undefined) ? -1 : parseInt(record.OPER));	// Store -1 if data not available
	}


	function transform(d) {
		d = map.locationPoint({lon: d.longitude, lat: d.latitude})
		return "translate(" + d.x + "," + d.y + ")";
	}
}