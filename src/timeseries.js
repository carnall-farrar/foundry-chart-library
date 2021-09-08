const d3 = require('d3');

const height = 500;
const margin = {top: 20, right: 30, bottom: 30, left: 40};

const yAxis = (g, data) => {
  g.attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select('.domain').remove())
    .call(g => g.select('.tick:last-of-type text').clone()
      .attr('x', 3)
      .attr('text-anchor', 'start')
      .attr('font-weight', 'bold')
      .text(data.y));
};


export function timeseriesChart (id, data) {
  const svgWidth = 600, svgHeight = 400;   
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };   
  const width = svgWidth - margin.left - margin.right;   
  const height = svgHeight - margin.top - margin.bottom;


  const svg = d3.select(id)
    .attr('width', svgWidth)
    .attr('height', svgHeight);

  console.log(svg, data)
  
  const g = svg.append('g')
    .attr('transform','translate(' + margin.left + ',' + margin.top + ')'   );

  const x = d3.scaleTime().rangeRound([0, width]);
  const y = d3.scaleLinear().rangeRound([height, 0]);

  const line = d3.line()
    .x(function(d) { return x(d.date)})   
    .y(function(d) { return y(d.value)});
  
  x.domain(d3.extent(data, function(d) { return d.date }));   
  y.domain(d3.extent(data, function(d) { return d.value }));

  g.append('g')   
    .attr('transform', 'translate(0,' + height + ')')   
    .call(d3.axisBottom(x))   
    .select('.domain')   
    .remove();

  g.append('g')   
    .call(d3.axisLeft(y))   
    .append('text')   
    .attr('fill', '#000')   
    .attr('transform', 'rotate(-90)')   
    .attr('y', 6)   .attr('dy', '0.71em')   
    .attr('text-anchor', 'end')   
    .text('Price ($)');


  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 1.5)
    .attr('d', line);
  
  return svg;

}