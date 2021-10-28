const d3 = require('d3');
import './styles/timeseries.css';


export function timeseriesChart (id, data) {
  // set the dimensions and margins of the graph
  const width = 500;
  const height = 250;
  const margin = 5;
  const padding = 5;
  const adj = 30;
  // we are appending SVG first
  const svg = d3.select(id).append('svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', '-'
            + adj + ' -'
            + adj + ' '
            + (width + adj *3) + ' '
            + (height + adj*3))
    .style('padding', padding)
    .style('margin', margin)
    .classed('svg-content', true);

  const formatData = data.map(row => {
    const date = row.date.split('T')[0];
    return {
      date,
      value: row.value
    };
  });

  const timeConv = d3.timeParse('%Y-%m-%d');
  const xScale = d3.scaleTime().range([0,width]);
  const yScale = d3.scaleLinear().rangeRound([height, 0]);
  xScale.domain(d3.extent(formatData, function(d){
    return timeConv(d.date);
  }));

  yScale.domain([(0), d3.max(formatData, function(d) {
    return d.value;
  })
  ]);

  const yaxis = d3.axisLeft().scale(yScale); 
  const xaxis = d3.axisBottom().scale(xScale);  

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xaxis);

  svg.append('g')
    .attr('class', 'axis')
    .call(yaxis);

  svg.append('path')
    .datum(data)
    .attr('d', d3.line()
      .x(function(d) { return xScale(d.date) })
      .y(function(d) { return yScale(d.value) })
    );

  return svg;
}