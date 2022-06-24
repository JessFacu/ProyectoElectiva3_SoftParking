import { Component, OnInit } from '@angular/core';
import { StatsPieChart } from '../../data/data';

//import * as d3 from 'd3-selection';
//import * as d3Scale from 'd3-scale';
//import * as d3Shape from 'd3-shape';	
// ====================
// CONSTANTS AND SCALES
// ====================
var fillCol = d3.scale.linear()
    .domain([0, 1])
    .range(["green", "red"]);

var dotSize = d3.scale.linear()
    .domain([0, 1, 10, 100, 1000])
    .range([4, 6, 8, 9, 12]);

// ===================
// POLLING SFPARK DATA
// ===================
var reqURL = 'http://api.sfpark.org/sfpark/rest/availabilityservice?lat=37.79&long=-122.41&radius=3&uom=mile&response=json&jsoncallback=addGarages&pricing=yes';

var scriptTag = document.createElement('SCRIPT');
scriptTag.src = reqURL;

document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);

// =========================
// DRAWING MAIN MAP ELEMENTS
// =========================
var po = org.polymaps;

var map = po.map()
    .container(d3.select("#map").append("svg:svg").node())
    .center({lat:37.775, lon:-122.43})
    .zoom(14)
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
    
/*
 * LOCATIONS (PRIMARY DATA OBJECT)
 * FIELDS:
 * "geometry" : {
        "coordinates": [long, lat]
        "longitude": float
        "latitude": float
        "type": "Point"
    }
 * "info" : {
        "type": either "ON" or "OFF"
        "name": "<garage-name>"
        "desc": usually the address as a string			[off-street parking only]
        "inter": closest intersection as string			[off-street parking only]
        "tel": telephone # as a string					[off-street parking only]
        "occupied": # spots occupied					[on-street only? not sure]
        "operated": # total spots						[on-street only? not sure]
    }
* "ophrs": just store full JSON object for now 			[off-street only]
* "rates": just store full JSON object for now			[off-street only]
*/
var locations = [];

// ===========================================================
// CALLBACK FUNCTION WHICH PROCESSES DATA RETURNED FROM SFPARK
// ===========================================================
var addGarages = function(data) {
    var num_records = data.NUM_RECORDS;
    var records = data.AVL;

    for (var i = 0 ; i < num_records ; i++) {
        locObj = new LocationObject(records[i]);
        //console.log(locObj);
        locations.push(locObj);
    }
    
    var layer = d3.select("#map svg")
        .insert("svg:g", ".compass")
        .attr("id", "point-layer");

    var marker = layer.selectAll("g")
        .data(locations)
        .enter().append("svg:g")
        .attr("transform", transform);
    
    marker.append("svg:circle")
        .attr("class", "garage-circle")
        .attr("r", circleSize)
        .style("fill", fillColor);
    
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
    
    // HELPER FUNCTIONS FOR ADDGARAGES
    function LocationObject(record) {
        this.geometry = new GeometryObject(record.LOC);

        var locData = record.LOC.split(",");
        this.longitude = parseFloat(locData[0]);
        this.latitude = parseFloat(locData[1]);

        //console.log(this.geometry);
        this.info = new InfoObject(record);
        this.ophrs = ((record.OPHRS == undefined) ? -1 : record.OPHRS);
        this.rates = ((record.RATES == undefined) ? -1 : record.RATES);

    }

    function GeometryObject(locString) {
        var locData = locString.split(",");
        longitude = parseFloat(locData[0]);
        latitude = parseFloat(locData[1]);
        this.coordinates = [longitude, latitude];
        this.type = "Point";
    }

    function InfoObject(record) {
        this.type = record.TYPE;
        this.name = record.NAME;
        this.desc = record.DESC;
        this.inter = record.INTER;
        this.tel = record.TEL;
        this.occ = ((record.OCC == undefined) ? -1 : parseInt(record.OCC));
        this.oper = ((record.OPER == undefined) ? -1 : parseInt(record.OPER));
    }


    function transform(d) {
        d = map.locationPoint({lon: d.longitude, lat: d.latitude})
        return "translate(" + d.x + "," + d.y + ")";
    }
}