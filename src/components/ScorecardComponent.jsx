import { TrendLineChart } from "./TrendLineChart";

export const StyledTable = window.styled.table`
  margin-bottom: 50px;
  border-collapse: collapse;
`;

const StyledTd = window.styled.td`
  border-bottom: ${(props) =>
    props.shouldHaveBorder ? "1px solid black" : "none"};
  text-align: center;
  border-collapse: collapse;
  padding: 1rem;
`;

const RowHeaderContainer = window.styled.div`
  border: 2px solid black;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DataCell = window.styled.div`
    background-color: ${(props) => props.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    height: 1.3rem;
    width: 4rem;
    border-radius: 10px;
    border: 1px solid transparent;
`;

const RatingCell = ({ rating }) => {
  if (rating && rating.at(-1) !== "%") {
    return rating;
  }
  const color = rating ? "red" : "gray";
  return <DataCell bg={color}>{rating || "~"}</DataCell>;
};

// border-collapse: ${(props) => (props.hasRating ? "collapse" : "none")};

const StyledTh = window.styled.th`
  background-color: ${(props) => (props.hasRating ? "#666" : "#AAA")};
  border: 6px solid;
  border-color: ${(props) => (props.hasRating ? "#666" : "#FFF")};
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
    const ratingStartIndex = 3;
    return (
      <>
        {headerStartIndex === rowIndex && (
          <StyledTd rowSpan={span} shouldHaveBorder>
            <RowHeaderContainer>{headerValue}</RowHeaderContainer>
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
          {columns.map((column, index) => (
            <StyledTh
              key={column}
              hasRating={index > 3 && index < columns.length - 1}
            >
              {column}
            </StyledTh>
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
