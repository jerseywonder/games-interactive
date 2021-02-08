//import loadJson from './helpers/load-json/'
//import { App } from './apps/app'
import * as d3 from 'd3'
import './main.scss';

import chroma from "chroma-js"

const color = d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl)

const format = d3.format(",d")

const width = 960

const height = 960

const pack = data => d3.pack()
    .size([width, height])
    .padding(3)
  (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))

function wrangle(data) {

    var allCompanies = data.map(item => item.Grouping)

    var companySet = new Set(allCompanies) 

    var companies = Array.from(companySet);

    var colours = companies.map(item => chroma.random())

    var getColour = function(type) {

        var index = companies.indexOf(type); 

        return colours[index]

    };

    var json = companies.map( (item, index) => {

        return { name : item, group : item }

    })

    var obj = {
        "name" : "Gaming companies",
        "display" : false,
        "children": []
    }

    json.forEach( item => {
        var child = {}
        child.name = item.name
        child.group = item.group
        child.display = false
        var shortlist = data.filter( cat => cat.Grouping === item.name)
        child.children = shortlist.map( (final,index) => {
            return { "name": final["Company name"], "display" : true, "value" : final["Headcount (approx)"], "group" : final.Grouping  }
        })
        obj.children.push(child)
    })

    //console.log(JSON.stringify(obj))

    init(obj)

}

function init(datum) {

  const root = pack(datum);
  let focus = root;
  let view;

  const svg = d3.select(`#games`)
        .append("svg")
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .style("display", "block")
      .style("margin", "0 -14px")
      .style("background", color(0))
      .style("cursor", "pointer")
      .on("click", (event) => zoom(event, root));

  const node = svg.append("g")
    .selectAll("circle")
    .data(root.descendants().slice(1))
    .join("circle")
      .attr("fill", d => d.children ? color(d.depth) : "white")
      .attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
      .on("mouseout", function() { d3.select(this).attr("stroke", null); })
      .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

  const label = svg.append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants())
    .join("text")
      .style("fill-opacity", d => d.parent === root ? 1 : 0)
      .style("display", d => d.parent === root ? "inline" : "none")
      .text(d => d.data.name);

  zoomTo([root.x, root.y, root.r * 2]);

  function zoomTo(v) {
    const k = width / v[2];

    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }

  function zoom(event, d) {
    const focus0 = focus;

    focus = d;

    const transition = svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

    label
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

}

fetch("https://interactive.guim.co.uk/docsdata/1bzh9J_sllSSrbYGi_STtgioQ6kYBUPz9Lg_eP8wrsTw.json")
    .then(res => res.json())
    .then(json => {
        wrangle(json.sheets.Sheet1)
    });
