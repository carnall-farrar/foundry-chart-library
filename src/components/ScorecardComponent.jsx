import { TrendLineChart } from "./TrendLineChart";
import {
  Activity,
  Cancer,
  LongWaits,
  OutPatients,
  Diagnostics,
} from "../icons";
import { Modal } from "./Modal";
import { TimelineSeriesChart } from "./TimelineSeriesChart";

import Colors from "../colors";
import { timeSeries } from "../services/mock-data/timeSeries";

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
    props.shouldHaveBorder ? "1px solid black" : "none"};
  text-align: center;
  border-collapse: collapse;
  padding: 3px;
  margin: 0;
`;

const RowHeaderContainer = window.styled.div`
  font-size: 0.7rem;  
  border: 2px solid #003EFF;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
`;

const DataCell = window.styled.div`
    background-color: ${(props) =>
      props.hasRating ? Colors.red_light : Colors.gray_dark};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    height: 1.2rem;
    width: 2.5rem;
    border-radius: 8px;
    color: ${(props) => (props.hasRating ? Colors.red_dark : Colors.white)};
    border: 1px solid ${(props) =>
      props.hasRating ? Colors.red_dark : Colors.gray_dark};
    cursor: pointer;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
    &:hover {
      border: 1px solid;
      box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
      outline-color: rgba(255, 255, 255, 0);
      outline-offset: 15px;
      text-shadow: 1px 1px 2px #427388; 
  }
`;

const RatingCell = ({ rating }) => {
  if (rating && rating.at(-1) !== "%") {
    return rating;
  }

  return <DataCell hasRating={!!rating}>{rating || "~"}</DataCell>;
};

// border-collapse: ${(props) => (props.hasRating ? "collapse" : "none")};

const StyledTh = window.styled.th`
  background-color: ${(props) =>
    props.hasRating ? Colors.gray_dark : Colors.gray_light};
  color: ${(props) => (props.hasRating ? Colors.white : "inherit")};
  margin: 0;
  border: 6px solid ${(props) =>
    props.hasRating ? Colors.gray_dark : Colors.white};
  border-top-color: ${Colors.white};
  border-bottom-color: ${Colors.white};
  border-right-width: ${(props) => (props.hasRating ? "0px" : "6px")};
  white-space: ${(props) => (props.isTrend ? "nowrap" : "inherit")}
`;

const performanceIconMap = {
  Activity: Activity,
  "Long Waits": LongWaits,
  Cancer: Cancer,
  Outpatients: OutPatients,
  Diagnostics: Diagnostics,
};

const mockLineChartData = [
  { name: "a", value1: 10, value2: 30 },
  { name: "b", value1: 30, value2: 60 },
  { name: "c", value1: 90, value2: 10 },
  { name: "d", value1: 20, value2: 90 },
  { name: "e", value1: 60, value2: 0 },
  { name: "f", value1: 0, value2: 40 },
];

export const ScorecardComponent = ({
  data,
  columns,
  onClickCell,
  // chartData,
  prog,
  showHeaders,
  spacing,
}) => {
  const [showModal, setShowModal] = React.useState(false);
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

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const renderRow = (rowData, rowIndex) => {
    const values = Object.values(rowData);
    const trendValue = values.at(-1);
    const headerValue = values.at(0);
    const rowValues = Object.entries(rowData).slice(1, values.length - 1);

    const { index: headerStartIndex, span } = headerSpans[headerValue];
    const headerEndIndex = headerStartIndex + span - 1;
    const shouldHaveBorder = rowIndex === headerEndIndex;
    const ratingStartIndex = 3;
    const PerformanceIcon = performanceIconMap[headerValue];

    return (
      <>
        {headerStartIndex === rowIndex && (
          <StyledTd rowSpan={span} shouldHaveBorder>
            <RowHeaderContainer>
              <PerformanceIcon />
              {headerValue}
            </RowHeaderContainer>
          </StyledTd>
        )}
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
          showModal={showModal}
        >
          <TimelineSeriesChart
            // width={500}
            height={400}
            data={timeSeries}
          />
        </Modal>

        {rowValues.map(([header, cellData], colIndex) => (
          <StyledTd
            onClick={() => {
              setShowModal(true);
              onClickCell(header, rowData["Metric"]);
            }}
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
          {columns.map((column, index) => (
            <StyledTh
              key={column}
              hasRating={index > 3 && index < columns.length - 1}
              isTrend={index === columns.length - 1}
            >
              {column}
            </StyledTh>
          ))}
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
