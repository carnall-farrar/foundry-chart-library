const d3 = require("d3");
import "./styles/table.css";

export function tabulate(root, data, columns) {
  const table = d3
    .select(root)
    .append("table")
    .attr("class", "mainTable")
    .style("border-spacing", "0px");
  const thead = table.append("thead").attr("class", "mainTable");
  const tbody = table.append("tbody").attr("class", "mainTable");

  // append the header row
  thead
    .append("tr")
    .selectAll("th")
    .data(columns)
    .enter()
    .append("th")
    .attr("class", "mainTable")
    .text(function (column) {
      return column;
    });

  // create a row for each object in the data
  const rows = tbody
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr")
    .attr("class", "mainTable");

  // create a cell in each row for each column
  rows
    .selectAll("td")
    .data(function (row) {
      return columns.map(function (column) {
        return { column: column, value: row[column] };
      });
    })
    .enter()
    .append("td")
    .attr("class", "main-table-border")
    .html(function (d) {
      return d.value;
    });

  return table;
}
