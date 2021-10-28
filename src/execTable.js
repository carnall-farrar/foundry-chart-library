const d3 = require('d3');
import './styles/execTable.css';

function execTableComponent(root, data, columns, prog, showHeaders, spacing) {
// param: root = string of the div id
// param: data = object[] with key:val pairs of col:value
// param: columns = string[] of columns as strings
// param: prog = string of the high level programme to label the table
// param: showHeaders = boolean
// param: spacing = string for margin between table elements
  const table = d3.select(root).append('table').attr('class', 'exec-table').style('border-spacing', '0px').style('margin-top', spacing);
  // Add the labels
  table.append('div')
    .attr('class', 'programme')
    .text(prog);

  const tbody = table.append('tbody').attr('class', 'exec-table');
    
  // append the header row
  if (showHeaders === true) {
    const thead = table.append('thead');
    thead.append('tr')
      .selectAll('th')
      .data(columns).enter()
      .append('th')
      .attr('class', 'exec-table')
      .text(function (column) { return column; });
  }
  
  // create a row for each object in the data
  const rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr')
    .attr('class', 'exec-table');
     
  // create a cell in each row for each column
  rows.selectAll('td')
    .data(function (row) {
      return columns.map(function (column) {
  
        return {column: column, value: row[column]};
      });
    })
    .enter()
    .append('td')
    .attr('class', 'exec-table-border')
    // .attr('rowspan', function(d) { return d.column === '' ? 3 : 1 })
    // .attr('colspam', function(d) { return d.column === '' ? 0 : 1 })
    .html(function (d) { return d.value; });
    
  return table; 
}

export function createExecTable(root, data, columns, progs) {
  data.forEach((row, index) => {
    const programme = progs[index]
    if (index === 0) {
      return execTableComponent(root, row, columns, programme, true, '0px');
    }
    return execTableComponent(root, row, columns, programme, false, '10px');
  });
}