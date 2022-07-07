import { Chevron } from "../icons";
import { getRatingResult } from "../utils";
import {
  DataCell,
  PlanCell,
  TooltipText,
  TooltipBox,
} from "./ScorecardComponent";
import { LoadingDots } from "./LoadingDots";
const StyledHeader = window.styled.tr``;

const StyledHeaderCell = window.styled.th`
  background-color: rgb(0, 95, 184);
  color: white;
  padding: 8px 10px;
`;

const StyledSubHeader = window.styled.tr``;

const StyledSubHeaderCell = window.styled.th`
  background-color: #e5e5e5;
  color: #333;
  padding: 8px 10px;
  font-weight: 200;
`;

const StyledBodyRow = window.styled.tr`
  
`;

const StyledBodyCell = window.styled.td`
  padding: 10px 0px;
  border-bottom: 1px solid #dedede;
  text-align: center;
`;

const StyledBodyCellData = window.styled.td`
  cursor: pointer;
  padding: 10px 0px;
  border-bottom: 1px solid #dedede;
  text-align: center;
`;

const StyledPill = window.styled.div`
  padding: 4px 8px;
  border-radius: 5px;
  min-width: 30px;
  &:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    filter: brightness(105%);
  }
  background-color: ${(props) => {
    if (props.value === null) {
      return "#e7e7e7";
    }

    // if (props.goodDirection === 0) {
    //   return "#ecf4ff";
    // }

    return props.isPositive && typeof props.value === "number"
      ? "#a1e2c4"
      : "#FA999C";
  }};
  border: 1px solid ${(props) => {
    if (props.value === null) {
      return "#bdbdbd";
    }

    if (props.goodDirection === 0) {
      return "#005fb8";
    }

    return props.isPositive && typeof props.value === "number"
      ? "#44a278"
      : "#AC2F33";
  }};
  color: ${(props) => {
    if (props.value === null) {
      return "#bdbdbd";
    }

    // if (props.goodDirection === 0) {
    //   return "#005fb8";
    // }

    return props.isPositive && typeof props.value === "number"
      ? "#44a278"
      : "#b54f4f";
  }};
`;

const Pill = ({ value, isPositive, goodDirection, unit }) => {
  let displayValue = value;

  if (typeof value === "number" && unit === "percentage") {
    displayValue = `${value}%`;
  }

  if (value === null) {
    displayValue = "~";
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StyledPill
        isPositive={isPositive}
        value={value}
        goodDirection={goodDirection}
      >
        {displayValue}
      </StyledPill>
    </div>
  );
};

const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

const isValuePositive = (value, average, positiveDirection) => {
  if (positiveDirection > 0) {
    return value > average;
  }

  if (positiveDirection < 0) {
    return value < average;
  }

  return true;
};

const ChevronContainer = window.styled.div`
                        flex: 3;
                        display: flex;
                        justifyContent: center;
                        alignItems: center;
                        cursor: pointer;
`;

export const BenchmarkComponent = ({
  headers,
  records,
  metricsMetadata,
  onCellClick,
  allSelected = false,
  ragRatings,
}) => {
  if (records.length === 0) {
    return <LoadingDots />;
  }
  const [sort, setSort] = React.useState({
    isAsc: true,
    // header: Object.values(headers)[0][0].key,
    header: "Locations",
  });

  const fixedRecords = records
    .filter((record) => typeof record.fixedPosition === "number")
    .sort((rec1, rec2) => rec1.fixedPosition - rec2.fixedPosition);

  const recordsToSort = records.filter(
    (record) => typeof record.fixedPosition !== "number"
  );

  const nullRecordsForSort = recordsToSort.filter(
    (record) => record.data[sort.header] === null
  );

  const dealWithCommas = (entry) => {
    if (typeof entry === "string") {
      const string = entry.replace(/,/g, "");
      return parseInt(string);
    }
    return entry;
  };

  let sortedRecords = recordsToSort
    .filter((record) => record.data[sort.header] !== null)
    .sort((a, b) => {
      if (sort.header === "Locations" && allSelected) {
        return;
      }
      const [aItem, bItem] =
        sort.header === "Locations"
          ? [a.region, b.region]
          : [
              dealWithCommas(a.data[sort.header]),
              dealWithCommas(b.data[sort.header]),
            ];
      if (sort.isAsc) {
        return aItem > bItem ? 1 : -1;
      }

      return aItem > bItem ? -1 : 1;
    });

  fixedRecords.forEach((record) => {
    sortedRecords.splice(record.fixedPosition, 0, record);
  });

  sortedRecords = [...sortedRecords, ...nullRecordsForSort];

  const headersWithLocation = {
    Locations: [
      {
        key: "Locations",
        value: "Locations",
      },
    ],
    ...headers,
  };

  return (
    <table>
      <thead>
        <StyledHeader>
          <th colSpan={1} style={{ width: 80 }} />
          {Object.keys(headers).map((header) => (
            <StyledHeaderCell key={header} colSpan={headers[header].length}>
              {header}
            </StyledHeaderCell>
          ))}
        </StyledHeader>
        <StyledSubHeader>
          {Object.values(headersWithLocation)
            .flat()
            .map((subheader) => {
              return (
                <StyledSubHeaderCell key={subheader.value}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 9, maxWidth: 100 }}>
                      {subheader.value}
                    </div>
                    {subheader.key === "Locations" && allSelected === true ? (
                      <></>
                    ) : (
                      <ChevronContainer
                        onClick={() => {
                          if (subheader.key === sort.header) {
                            setSort({
                              isAsc: !sort.isAsc,
                              header: subheader.key,
                            });
                          } else {
                            setSort({
                              isAsc: sort.isAsc,
                              header: subheader.key,
                            });
                          }
                        }}
                      >
                        <Chevron
                          fill="#666"
                          direction={
                            subheader.key === sort.header
                              ? sort.isAsc
                                ? "up"
                                : "down"
                              : "down"
                          }
                        />
                      </ChevronContainer>
                    )}
                  </div>
                </StyledSubHeaderCell>
              );
            })}
        </StyledSubHeader>
      </thead>
      <tbody>
        <StyledBodyRow>
          <StyledBodyCell>Last updated</StyledBodyCell>
          {Object.values(metricsMetadata).map((metadata, index) => (
            <StyledBodyCell key={index}>{metadata.lastUpdated}</StyledBodyCell>
          ))}
        </StyledBodyRow>
        {sortedRecords.map((record, index) => (
          <StyledBodyRow key={index}>
            <StyledBodyCell>{record.region}</StyledBodyCell>
            {Object.values(headers)
              .flat()
              .map(({ key }, index) => {
                const geography = record.region;
                const rag = ragRatings[key][geography];
                const plan =
                  record.data[key] === null
                    ? record.data[key]
                    : record.data[key].plan ?? undefined;
                const value =
                  (typeof record.data[key] === "string") |
                  (typeof record.data[key] === "number") |
                  (record.data[key] === null)
                    ? record.data[key]
                    : typeof record.data[key] === "object"
                    ? record.data[key].actuals
                    : undefined;
                const metaData = metricsMetadata[key];
                // Will need to create separate function to find rating result
                const ratingConversion = {
                  Red: "bad",
                  Amber: "improving",
                  Green: "good",
                  Blue: "noPlan",
                };
                const ratingResult = ratingConversion[rag] ?? "none";

                const getDisplayValue = (val) => {
                  if (val === null || val === "~") {
                    return "~";
                  }
                  if (metaData.unit === "percentage") {
                    return `${val}%`;
                  } else {
                    return Number(val).toLocaleString();
                  }
                };

                return (
                  <StyledBodyCellData
                    onClick={() => onCellClick(record.region, key)}
                    key={`${record.region}${index}`}
                  >
                    <DataCell ratingResult={ratingResult}>
                      {getDisplayValue(value)}
                    </DataCell>
                    {plan ? <PlanCell>{getDisplayValue(plan)}</PlanCell> : null}
                  </StyledBodyCellData>
                );
              })}
          </StyledBodyRow>
        ))}
      </tbody>
    </table>
  );
};
