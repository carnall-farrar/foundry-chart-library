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
import { LoadingDots } from "./LoadingDots";

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
  margin-left: 3px;
  margin-right: 3px;
  background-color: rgb(0, 95, 184);
  color: white;
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.rowSpan * (cellHeight + rowSpacing)}rem;
  font-weight: bold;
  font-size: 12px;
`;

const MetricHeaderContainer = window.styled.div`
  margin-left: 3px;
  margin-right: 3px;
  background-color: ${(props) => (props.isMetric ? Colors.gray_light : "")};
  color: ${(props) => (props.isMetric ? "#333" : "inherit")};
  padding-left: 3px;
  padding-right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${cellHeight}rem;
  white-space: ${(props) => (props.nowrap ? "nowrap" : "initial")};
  // font-size: ${(props) => (props.isMetric ? "12px" : "inherit")}
  font-size: 12px;
  position: relative;
  :hover {
    > div {
      display: block;
    }
  }
`;

const MetricTooltip = window.styled.div`
    position: absolute;
    top: ${cellHeight}rem;
    display: none;
    background-color: #333;
    opacity: 0.8;
    border-radius: 4px;
    color: white;
    z-index: 1;
`;

// color:  ${({ ratingResult }) => RatingCellColorMap[ratingResult]};

export const DataCell = window.styled.div`
    margin: auto;
    background-color: ${({ ratingResult }) =>
      RatingCellBgColorMap[ratingResult]};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 6px;
    width: 2rem;
    border-radius: 5px;
    color:  white;
    border: 1px solid  ${({ ratingResult }) =>
      RatingCellBgColorMap[ratingResult]};
    cursor: pointer;
    &:hover {
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      filter: brightness(120%);
  };
`;

export const TooltipText = window.styled.div`
  background: transparent;
  color: black;
  text-align: center;
  cursor: default;
`;

export const TooltipBox = window.styled.div`
  position: absolute;
  visibility: hidden;
  align-items: center;
  justify-content: center;
  padding: 2px 2px;
  width: 2rem;
  border-radius: 5px;
  color:  white;
  margin-left: 45px;
  margin-top: -18px;
  background-color: grey;
  border: thin solid grey;
  cursor: default;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-right-color: grey;
    border-left: 0;
    margin-top: -5px;
    margin-left: -5px;
  }
`;

export const PlanCell = window.styled.div`
    color: grey;
    alignItems: center;
    display: inline-block;
    justify-content: center;
    cursor: default;
    & ${TooltipText}:hover + ${TooltipBox} {
      visibility: visible;
      &:before {
        border-color: #215DB0;
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
  plan,
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
    isAboveGood,
    plan
  );

  const formatData = (input) => {
    if (isPercentage) {
      return `${input}%`;
    } else {
      return `${Number(input).toLocaleString()}`;
    }
  };

  const value = formatData(rating);
  const planProcess =
    plan === "" || plan === undefined ? "~" : formatData(plan);
  return (
    <>
      <DataCell ratingResult={ratingResult}>
        {rating.length === 0 ? "~" : value}
      </DataCell>
      {planProcess ? (
        <PlanCell>
          <TooltipText>{planProcess}</TooltipText>
          <TooltipBox>Plan</TooltipBox>
        </PlanCell>
      ) : null}
    </>
  );
};

const StyledTh = window.styled.th`
  background-color: ${Colors.gray_light};
  color: #333;
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
  onHoverCell,
  metricColorMap,
  metricUnitMap,
  metricTooltipData,
  plans,
  planSelected = false,
  prog,
  showHeaders,
  spacing,
}) => {
  if (data.length === 0) {
    return <LoadingDots />;
  }
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
    const planData = plans[rowData["Metric"]] ?? "";
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
            // onHoverCell={() => onHoverCell(header, rowData["Metric"])}
            shouldHaveBorder={shouldHaveBorder}
          >
            {colIndex < ambitionColumnIndex && (
              <>
                <MetricHeaderContainer
                  isMetric={header === isMetric ? true : false}
                  nowrap={colIndex === datecolumnIndex}
                  onHoverCell={() => onHoverCell(header, rowData["Metric"])}
                >
                  {colIndex < ambitionColumnIndex && cellData}
                  {colIndex === 0 && (
                    <MetricTooltip className="tooltip">
                      {metricTooltipData[cellData]?.["Metric Title"]}
                    </MetricTooltip>
                  )}
                </MetricHeaderContainer>
              </>
            )}

            {colIndex === ambitionColumnIndex && (
              <AmbitionCell
                value={cellData.value ?? cellData}
                date={cellData.date}
              />
            )}

            {colIndex >= ratingStartIndex && (
              <RatingCell
                rating={
                  typeof cellData === "object"
                    ? cellData.actuals.replace("%", "")
                    : cellData.replace("%", "")
                }
                plan={cellData.plan.replace("%", "") ?? undefined}
                previousMonthRating={
                  colIndex > ratingStartIndex &&
                  typeof rowEntries[colIndex - 1][1] === "string"
                    ? Number(rowEntries[colIndex - 1][1].replace("%", "")) // Finn add conditional logic here
                    : colIndex > ratingStartIndex &&
                      typeof rowEntries[colIndex - 1][1] === "object"
                    ? Number(
                        rowEntries[colIndex - 1][1].actuals.replace("%", "")
                      )
                    : undefined
                }
                ambition={
                  cellData.plan
                    ? Number(cellData.plan.replace("%", ""))
                    : ambitionValue
                }
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
            planSelected={planSelected}
            planData={planData}
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
