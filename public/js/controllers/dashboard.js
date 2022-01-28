// var d3 = require('d3v4');
// var jsdom = require('jsdom');



// var mapBuilder = (dataPath) => {
var mapper1 = () => {

    var dataPath = 'dzMap.json'

    // console.log("Drawwwing")
    var width = '748px';
    var height = '600px';
    var svg = d3.selectAll('#world-map-markers')
        .append("svg")
        .attr("id", "mapDZ")



    var projection = d3.geoMercator()
        .center([2.5927734375, 28.729130483430154])
        .scale(1100)
        .translate([500, 190]);


    var path = d3.geoPath().projection(projection);

    d3.json('dzMap.json', function(error, data) {
        if (error) {
            throw error;
        }

        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 1);

        var svg = d3.select("dzMap")
            .style("width", width)
            .style("height", height);
        // svg.selectAll('path')
        svg.data(data.features)
            .enter()
            .append('path')
            .attr("d", path)
            .attr("stroke", "black")
            .attr("fill", "grey")
            .on('mousemove', function(d) {
                console.log("aliaali12")
                tooltip.transition().duration(200).style("opacity", .9);
                //Any time the mouse moves, the tooltip should be at the same position

                tooltip.style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY) + "px")
                    //The text inside should be State: rate%
                    .text(() => `${d.properties.NAME_1}`)
            })
            .on("mouseout", function(d, i) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 1);
            });

    })


}

var mapper2 = () => {


    // var width = 900;
    // var height = 1080;



    var projection = d3.geoMercator()
        .center([2.5927734375, 28.729130483430154])
        .scale(100)
        // .translate([100, 190]);


    var path = d3.geoPath().projection(projection);

    d3.json("dzMap.json", function(error, data) {
        if (error) {
            throw error;
        }


        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 1);

        var divv = d3.select("#world-map-markers").append("svg")
            .attr("id", "dzMAP")
            // .attr("width", width).attr("height", height);
        var svg = d3.select("svg").select("dzMAP")

        // svg.text("zaft")
        console.log(svg)
        svg.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr("d", path)
            .attr("stroke", "black")
            .attr("fill", "transparent")
            .on('mousemove', function(d) {
                console.log("aliaali")
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                //Any time the mouse moves, the tooltip should be at the same position
                tooltip.style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
                    //The text inside should be State: rate%
                    .text(() => `${d.properties.NAME_1}`)
            })
            .on("mouseout", function(d, i) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 1);
            });

    });

}

mapper2();

// console.log("finished")

//     return svg;

// }



// module.exports = {
//     mapBuilder
// }