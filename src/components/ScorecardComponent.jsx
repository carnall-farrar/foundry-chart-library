import { TrendLineChart } from "./TrendLineChart";

const StyledTable = window.styled.table`
  margin-bottom: 50px;
`;

const StyledTd = window.styled.td`
  background-color: ${(props) => props.bg};
  border-bottom: ${(props) =>
    props.shouldHaveBorder ? "1px solid black" : "none"};
  text-align: center;
  font-size: 10px;
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
    const headerEndIndex = headerStartIndex + span - 1;
    const shouldHaveBorder = rowIndex === headerEndIndex;
    console.log(rowIndex, headerStartIndex, headerEndIndex, shouldHaveBorder);
    return (
      <>
        {headerStartIndex === rowIndex && <td rowSpan={span}>{headerValue}</td>}
        {rowValues.map(([header, cellData]) => (
          <StyledTd
            onClick={() => onClickCell(header, rowData["Metric"])}
            bg="yellow"
            shouldHaveBorder={shouldHaveBorder}
          >
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
    <StyledTable>
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
    </StyledTable>
  );
};
