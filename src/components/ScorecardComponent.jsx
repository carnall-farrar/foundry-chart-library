import { TrendLineChart } from "./TrendLineChart";
export const ScorecardComponent = ({
  data,
  columns: columnNames,
  prog,
  showHeaders,
  spacing,
}) => {
  const totalColumns = columnNames.length;
  const trendColumn = columnNames.at(-1);
  const headerColumn = columnNames.at(0);
  //   const groups = data.reduce((acc, val) => ({ ...acc, [val[headerColumn]]: (acc[val[headerColumn]] ?? 0) + 1 }), {})

  const columns = React.useMemo(() => {
    return [
      {
        Header: headerColumn,
        accessor: headerColumn,
        enableRowSpan: true,
      },
      ...columnNames
        .slice(1, totalColumns - 1)
        .map((name) => ({ Header: name, accessor: name })),
      {
        Header: trendColumn,
        accessor: trendColumn, // accessor is the "key" in the data
        Cell: ({ value }) => (
          <TrendLineChart
            data={value.map((val) => ({ value: val }))}
            width={300}
            height={150}
          />
        ),
      },
    ];
  }, [columnNames]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    ReactTable.useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    console.log("CELL", cell);
                    return (
                      <td {...cell.getCellProps()} rowSpan={cell.rowSpan}>
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
