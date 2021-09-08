const d3 = require('d3');
import './styles/execTable.css';

function execTableComponent(root, data, columns, showHeaders, spacing) {
// param: root = string of the div id
// param: data = object[] with key:val pairs of col:value
// param: columns = string[] of columns as strings
// param: showHeaders = boolean
// param: spacing = string for margin between table elements
  const table = d3.select(root).append('table').attr('class', 'exec-table').style('border-spacing', '0px').style('margin-top', spacing);
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
    .html(function (d) { return d.value; });
    
  return table; 
}

export function createExecTable(root, data, columns) {
  data.forEach((row, index) => {
    console.log(row, columns, index);
    if (index === 0) {
      return execTableComponent(root, row, columns, true, '0px');
    }
    return execTableComponent(root, row, columns, false, '10px');
  });
}