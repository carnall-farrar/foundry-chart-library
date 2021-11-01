const d3 = require('d3');
import './styles/sentenceTable.css';

function createSentenceTable(tbody, data, columns, showHeaders) {
  // param: root = string of the div id
  // param: data = object[] with key:val pairs of col:value
  // param: columns = string[] of columns as strings
  // param: showHeaders = boolean
  // param: spacing = string for margin between table elements
  
  // create a row for each object in the data
  const rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr')
    .attr('class', 'sentence-table');
     
  // create a cell in each row for each column
  rows.selectAll('td')
    .data(function (row) {
      return columns.map(function (column) {
  
        return {column: column, value: row[column]};
      });
    })
    .enter()
    .append('td')
    .attr('class', 'sentence-table-border')
    // .attr('rowspan', function(d) { return d.column === '' ? 3 : 1 })
    // .attr('colspam', function(d) { return d.column === '' ? 0 : 1 })
    .html(function (d) { return d.value; });

  return tbody;  
}

export function buildSentenceComponent(root, data, columns, showHeaders, spacing) {
  // const numSentences = data.length;
  const div = d3.select(root).append('div').attr('class', 'sentence-div');

  const numSentences = data.length;
  const aboveSentences = [];
  const inputSentences = data.slice(0,3);
  const belowSentences = numSentences > 3 ? data.slice(3, data.length-1) : [];

  const table = div.append('table')
    .attr('class', 'sentence-table')
    .style('border-spacing', '0px');

  const tbody = table.append('tbody').attr('class', 'sentence-table');
    
  // append the header row
  if (showHeaders === true) {
    const thead = table.append('thead');
    thead.append('tr')
      .selectAll('th')
      .data(columns).enter()
      .append('th')
      .attr('class', 'sentence-table')
      .text(function (column) { return column; });
  }

  createSentenceTable(tbody, inputSentences, columns, showHeaders);
  
  const arrows = div.append('div')
    .attr('class', 'arrows');

  arrows.append('text')       // Append a text element
    .attr('class', 'fa scroller')  // Give it the font-awesome class
    .attr('id', 'scroll-up')
    .style('font-size', '100px')
    .text('\uf106'); 

  arrows.append('text')       // Append a text element
    .attr('class', 'fa dot')  // Give it the font-awesome class
    .style('font-size', '30px')
    .text('\uf111'); 

  arrows.append('text')       // Append a text element
    .attr('class', 'fa scroller')  // Give it the font-awesome class
    .attr('id', 'scroll-down')
    .style('font-size', '100px')
    .text('\uf107'); 


  const scrollDown = document.querySelector('#scroll-down');

  scrollDown.addEventListener('click', function(){
    aboveSentences.push(inputSentences[0]) // add top item in sentences to above array
    inputSentences.slice(1);
    inputSentences.push(belowSentences[0]);
    belowSentences.slice(1);
    console.log(inputSentences);
    const table = document.querySelector('.sentence-table');
    table.innerHTML='';
    createSentenceTable(div, inputSentences, columns, showHeaders, spacing);
  });
}