import { TrendBarChart } from "./TrendBarChart";
import {
  Activity,
  Cancer,
  LongWaits,
  OutPatients,
  Diagnostics,
} from "../icons";
import {
  RatingResult,
  getRatingResult,
  RatingCellBgColorMap,
  RatingCellColorMap,
} from "../utils";

import Colors from "../colors";

const cellHeight = 3.2;
const rowSpacing = 0.4;

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
  // padding: ${(props) => (props.isHeader ? "5px" : "3px")};
  margin: 0;
`;

const RowHeaderContainer = window.styled.div`
  font-size: 0.65rem;  
  margin-left: 3px;
  margin-right: 3px;
  background-color: rgb(0, 95, 184);
  color: white;
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.rowSpan * (cellHeight + rowSpacing)}rem;
`;

const MetricHeaderContainer = window.styled.div`
  font-size: 0.65rem;  
  margin-left: 3px;
  margin-right: 3px;
  background-color: ${(props) => (props.isMetric ? Colors.gray_light : "")};
  color: black;
  padding-left: 3px;
  padding-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${cellHeight}rem;
  white-space: ${(props) => (props.nowrap ? "nowrap" : "initial")};
`;

const DataCell = window.styled.div`
    margin: auto;
    font-size: 0.65rem;  
    background-color: ${({ ratingResult }) =>
      RatingCellBgColorMap[ratingResult]};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 6px;
    width: 2rem;
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

const RatingCell = ({
  rating,
  previousMonthRating,
  ambition,
  isAboveGood,
  isPercentage,
}) => {
  const isGreaterThanAmbition = rating > ambition;
  const ratingResult = getRatingResult(
    rating,
    previousMonthRating,
    isGreaterThanAmbition,
    isAboveGood
  );
  let value = isPercentage ? `${rating}%` : `${rating.toLocaleString()}`;
  return (
    <DataCell ratingResult={ratingResult}>
      {/* {!!rating ? `${rating}${isPercentage ? "%" : ""}` : "~"} */}
      {!!rating ? value : "~"}
    </DataCell>
  );
};

const StyledTh = window.styled.th`
  background-color: ${Colors.gray_light};
  color: black;
  margin: 0;
  border: 6px solid ${(props) =>
    props.hasRating ? Colors.gray_light : Colors.white};
  border-top-color: ${Colors.white};
  border-bottom-color: ${Colors.white};
  border-right-width: ${(props) => (props.hasRating ? "0px" : "6px")};
  white-space: ${(props) => (props.isDate ? "nowrap" : "inherit")};
  font-weight: 200;
  min-width: 2.1rem;
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

    const rowEntries = Object.entries(rowData).slice(1, values.length - 1);
    const metric = rowEntries[0][1];

    const { index: headerStartIndex, span } = headerSpans[headerValue];
    const headerEndIndex = headerStartIndex + span - 1;
    const shouldHaveBorder = rowIndex === headerEndIndex;
    const ratingStartIndex = 3;
    const datecolumnIndex = 1;
    const ambitionColumnIndex = 2;
    const isMetric = rowEntries[0][0]; // === "metric" ? true : false;
    const isAboveGood = metric && metricColorMap[metric] === "aboveGood";
    return (
      <>
        {headerStartIndex === rowIndex && (
          <StyledTd rowSpan={span} shouldHaveBorder>
            <RowHeaderContainer rowSpan={span} isHeader>
              {headerValue}
            </RowHeaderContainer>
          </StyledTd>
        )}
        {rowEntries.map(([header, cellData], colIndex) => (
          <StyledTd
            onClick={() => onClickCell(header, rowData["Metric"])}
            shouldHaveBorder={shouldHaveBorder}
          >
            {colIndex < ambitionColumnIndex && (
              <MetricHeaderContainer
                isMetric={header === isMetric ? true : false}
                nowrap={colIndex === datecolumnIndex}
              >
                {colIndex < ambitionColumnIndex && cellData}
              </MetricHeaderContainer>
            )}

            {colIndex === ambitionColumnIndex && (
              <AmbitionCell
                value={cellData.value ?? cellData}
                date={cellData.date}
              />
            )}

            {colIndex >= ratingStartIndex && (
              <RatingCell
                rating={Number(cellData.replace("%", ""))}
                previousMonthRating={
                  colIndex > ratingStartIndex
                    ? Number(rowEntries[colIndex - 1][1].replace("%", ""))
                    : undefined
                }
                ambition={ambitionValue}
                isAboveGood={isAboveGood}
                isPercentage={metricUnitMap[metric] === "percentage"}
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
            isAboveGood={isAboveGood}
            width={130}
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
