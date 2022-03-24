import { TrendLineChart } from "./TrendLineChart";

export const StyledTable = window.styled.table`
  margin-bottom: 50px;
  border-collapse: collapse;
`;

const StyledTd = window.styled.td`
  border-bottom: ${(props) =>
    props.shouldHaveBorder ? "1px solid black" : "none"};
  text-align: center;
  font-size: 10px;
  border-collapse: collapse;
  padding: 1rem;
`;

const DataCell = window.styled.div`
    background-color: ${(props) => props.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
`;

const RatingCell = ({ rating }) => {
  const color = rating ? "red" : "gray";
  return <DataCell bg={color}>{rating || "~"}</DataCell>;
};

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
    const ratingStartIndex = 3;
    return (
      <>
        {headerStartIndex === rowIndex && (
          <StyledTd rowSpan={span} shouldHaveBorder>
            {headerValue}
          </StyledTd>
        )}
        {rowValues.map(([header, cellData], colIndex) => (
          <StyledTd
            onClick={() => onClickCell(header, rowData["Metric"])}
            shouldHaveBorder={shouldHaveBorder}
          >
            {colIndex >= ratingStartIndex ? (
              <RatingCell rating={cellData} />
            ) : (
              cellData
            )}
          </StyledTd>
        ))}
        <StyledTd shouldHaveBorder={shouldHaveBorder}>
          <TrendLineChart
            data={trendValue.map((val) => ({ value: val }))}
            width={50}
            height={50}
          />
        </StyledTd>
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
