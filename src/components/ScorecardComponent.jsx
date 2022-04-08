import { TrendBarChart } from "./TrendBarChart";
import {
  Activity,
  Cancer,
  LongWaits,
  OutPatients,
  Diagnostics,
} from "../icons";

import Colors from "../colors";

export const StyledTable = window.styled.table`
  margin-bottom: 50px;
  border-collapse: collapse;
`;

const StyledTr = window.styled.tr`
  margin: 0;
  padding: 0;
`;

const StyledTd = window.styled.td`
  border-bottom: ${(props) =>
    props.shouldHaveBorder ? "1px solid #dedede" : "none"};
  text-align: center;
  border-collapse: collapse;
  padding: ${(props) => (props.isHeader ? "5px" : "3px")};
  margin: 0;
`;

const RowHeaderContainer = window.styled.div`
  font-size: 0.7rem;  
  background-color: rgb(0, 95, 184);
  color: white;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.rowSpan * 2.7}rem;
`;

const MetricHeaderContainer = window.styled.div`
  font-size: 0.7rem;  
  background-color: ${(props) => (props.isMetric ? Colors.gray_light : "")};
  color: black;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.rowSpan * 2.7}rem;
`;

const RatingResult = {
  none: "none",
  good: "good",
  improving: "improving",
  bad: "bad",
};

const RatingCellBgColorMap = {
  [RatingResult.none]: Colors.gray_light,
  [RatingResult.good]: Colors.green_light,
  [RatingResult.improving]: Colors.amber_light,
  [RatingResult.bad]: Colors.red_light,
};
const RatingCellColorMap = {
  [RatingResult.none]: Colors.gray_dark,
  [RatingResult.good]: Colors.green_dark,
  [RatingResult.improving]: Colors.amber_dark,
  [RatingResult.bad]: Colors.red_dark,
};

const DataCell = window.styled.div`
    font-size: 0.7rem;  
    background-color: ${({ ratingResult }) =>
      RatingCellBgColorMap[ratingResult]};
    display: flex;
    align-items: center;
    justify-content: center;
    // padding: 0.2rem;
    padding: 4px 8px;
    // height: 1.2rem;
    width: 2.5rem;
    border-radius: 5px;
    color:  ${({ ratingResult }) => RatingCellColorMap[ratingResult]};
    border: 1px solid  ${({ ratingResult }) =>
      RatingCellColorMap[ratingResult]};
    cursor: pointer;
    &:hover {
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
	    filter: brightness(120%);
  }
`;

const AmbitionCell = ({ date, value }) => {
  return (
    <div>
      {value}
      {date && <div>{date}</div>}
    </div>
  );
};

const getRatingResult = (
  rating,
  previousMonthRating,
  isGreaterThanAmbition,
  isAboveGood
) => {
  if (!rating) {
    return RatingResult.none;
  }
  if (isAboveGood) {
    if (isGreaterThanAmbition) {
      return RatingResult.good;
    } else {
      return previousMonthRating && rating > previousMonthRating
        ? RatingResult.improving
        : RatingResult.bad;
    }
  }
  // below good
  if (isGreaterThanAmbition) {
    return previousMonthRating && rating < previousMonthRating
      ? RatingResult.improving
      : RatingResult.bad;
  } else {
    return RatingResult.good;
  }
};

const RatingCell = ({
  rating,
  previousMonthRating,
  metric,
  ambition,
  metricColorMap,
}) => {
  const isGreaterThanAmbition = rating.replace("%", "") > ambition;
  const isAboveGood = metricColorMap[metric] === "aboveGood";
  const ratingResult = getRatingResult(
    rating,
    previousMonthRating,
    isGreaterThanAmbition,
    isAboveGood
  );
  return <DataCell ratingResult={ratingResult}>{rating || "~"}</DataCell>;
};

// border-collapse: ${(props) => (props.hasRating ? "collapse" : "none")};

// background-color: ${(props) =>
//   props.hasRating ? Colors.gray_dark : Colors.gray_light};
// border: 6px solid ${(props) =>
// props.hasRating ? Colors.gray_dark : Colors.white};
//   color: ${(props) => (props.hasRating ? Colors.white : "inherit")};

const StyledTh = window.styled.th`
  // border-collapse: ${(props) => (props.hasRating ? "collapse" : "none")};
  background-color: ${Colors.gray_light};
  color: black;
  margin: 0;
  border: 6px solid 6px solid ${(props) =>
    props.hasRating ? Colors.gray_dark : Colors.white};
  border-top-color: ${Colors.white};
  border-bottom-color: ${Colors.white};
  border-right-width: ${(props) => (props.hasRating ? "0px" : "6px")};
  white-space: ${(props) => (props.isDate ? "nowrap" : "inherit")}
`;

const performanceIconMap = {
  Activity: Activity,
  "Long Waits": LongWaits,
  Cancer: Cancer,
  Outpatients: OutPatients,
  Diagnostics: Diagnostics,
};

export const ScorecardComponent = ({
  data,
  columns,
  onClickCell,
  metricColorMap,
  metricUnitMap,
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
    const metricValue = values.at(1);
    const ambitionData = values.at(3);
    const ambitionValue = Number(
      (ambitionData.value ?? ambitionData).replaceAll(/[^\d]/g, "")
    );

    const rowValues = Object.entries(rowData).slice(1, values.length - 1);
    const metric = rowValues[0][1];

    const { index: headerStartIndex, span } = headerSpans[headerValue];
    const headerEndIndex = headerStartIndex + span - 1;
    const shouldHaveBorder = rowIndex === headerEndIndex;
    const ratingStartIndex = 3;
    const ambitionColumnIndex = 2;
    console.log(rowValues);
    const isMetric = rowValues[0][0]; // === "metric" ? true : false;
    console.log(rowValues[0][0], "ismetric");

    return (
      <>
        {headerStartIndex === rowIndex && (
          <StyledTd rowSpan={span} shouldHaveBorder>
            <RowHeaderContainer rowSpan={span} isHeader>
              {headerValue}
            </RowHeaderContainer>
          </StyledTd>
        )}
        {rowValues.map(([header, cellData], colIndex) => (
          <StyledTd
            onClick={() => onClickCell(header, rowData["Metric"])}
            shouldHaveBorder={shouldHaveBorder}
          >
            <MetricHeaderContainer
              isMetric={header === isMetric ? true : false}
            >
              {colIndex < ambitionColumnIndex && cellData}
            </MetricHeaderContainer>

            {colIndex === ambitionColumnIndex && (
              <AmbitionCell
                value={cellData.value ?? cellData}
                date={cellData.date}
              />
            )}
            {colIndex >= ratingStartIndex && (
              <RatingCell
                rating={cellData}
                previousMonthRating={
                  colIndex > ratingStartIndex && rowValues[colIndex]
                }
                ambition={ambitionValue}
                metric={metric}
                metricColorMap={metricColorMap}
              />
            )}
          </StyledTd>
        ))}
        <StyledTd shouldHaveBorder={shouldHaveBorder}>
          <TrendBarChart
            data={trendValue.map((val) => ({
              value: val.value,
              date: val.week,
            }))}
            isPercentage={metricUnitMap[metric] === "percentage"}
            ambition={ambitionValue}
            width={120}
            height={50}
          />
        </StyledTd>
      </>
    );
  };

  return (
    <StyledTable>
      <thead>
        <StyledTr>
          {columns.map((column, index) => {
            return (
              <StyledTh
                key={column}
                hasRating={index > 3 && index < columns.length - 1}
                isTrend={index === columns.length - 1}
                isDate={index > 2}
                isMetric={index === 1}
              >
                {column}
              </StyledTh>
            );
          })}
        </StyledTr>
      </thead>
      <tbody>
        {data.map((datum, index) => (
          <StyledTr key={index}>{renderRow(datum, index)}</StyledTr>
        ))}
      </tbody>
    </StyledTable>
  );
};
