import { TrendLineChart } from "./TrendLineChart";

const StyledTd = window.styled.td`
  color: red§;
`;

export const ScorecardComponent = ({
  data,
  columns,
  onClickCell,
  prog,
  showHeaders,
  spacing,
}) => {
  const headerSpans = React.useMemo(
    () =>
      data
        .map((d) => d[columns[0]])
        .reduce(
          (acc, val, index) => ({
            ...acc,
            [val]: {
              span: (acc[val]?.span ?? 0) + 1,
              index: acc[val]?.index ?? index,
            },
          }),
          {}
        ),
    [data, columns]
  );

  const renderRow = (rowData, rowIndex) => {
    const values = Object.values(rowData);
    const trendValue = values.at(-1);
    const headerValue = values.at(0);
    const rowValues = Object.entries(rowData).slice(1, values.length - 1);

    const { index: headerStartIndex, span } = headerSpans[headerValue];
    console.log(rowIndex, headerStartIndex, span);
    return (
      <>
        {headerStartIndex === rowIndex && <td rowSpan={span}>{headerValue}</td>}
        {rowValues.map(([header, cellData]) => (
          <StyledTd onClick={() => onClickCell(header, cellData)}>
            {cellData}
          </StyledTd>
        ))}
        <td>
          <TrendLineChart
            data={trendValue.map((val) => ({ value: val }))}
            width={50}
            height={50}
          />
        </td>
      </>
    );
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((datum, index) => (
          <tr key={index}>{renderRow(datum, index)}</tr>
        ))}
      </tbody>
    </table>
  );
};
