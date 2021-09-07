const d3 = require('d3');
import './styles/styles.css';

export function tabulate(root, data, columns) { 
  console.log(root, data, columns);
  const table = d3.select(root).append('table');
  const thead = table.append('thead');
  const tbody = table.append('tbody');
    
  // append the header row
  thead.append('tr')
    .selectAll('th')
    .data(columns).enter()
    .append('th')
    .text(function (column) { return column; });
    
  // create a row for each object in the data
  const rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr');
     
  // create a cell in each row for each column
  rows.selectAll('td')
    .data(function (row) {
      return columns.map(function (column) {
  
        return {column: column, value: row[column]};
      });
    })
    .enter()
    .append('td')
    .html(function (d) { return d.value; });
  
  
    
  return table; 
}