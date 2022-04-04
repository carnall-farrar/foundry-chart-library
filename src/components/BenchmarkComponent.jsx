import { Chevron } from "../icons";

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

    if (props.goodDirection === 0) {
      return "#ecf4ff";
    }

    return props.isPositive && typeof props.value === "number"
      ? "#a1e2c4"
      : "#ffd4d4";
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
      : "#b54f4f";
  }};
  color: ${(props) => {
    if (props.value === null) {
      return "#bdbdbd";
    }

    if (props.goodDirection === 0) {
      return "#005fb8";
    }

    return props.isPositive && typeof props.value === "number"
      ? "#44a278"
      : "#b54f4f";
  }};
`;

const Pill = ({ value, isPositive, goodDirection, unit }) => {
  let displayValue = value;

  if (typeof value === "number" && unit === "pourcentage") {
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
}) => {
  if (records.length === 0) {
    return <div></div>;
  }
  const [sort, setSort] = React.useState({
    isAsc: true,
    // header: Object.values(headers)[0][0].key,
    header: "",
  });

  console.log("sort::", sort);

  const fixedRecords = records.filter(
    (record) => typeof record.fixedPosition === "number"
  );

  const nullRecordsForSort = records.filter(
    (record) => record.data[sort.header] === null
  );

  const recordsToSort = records.filter(
    (record) => typeof record.fixedPosition !== "number"
  );

  let sortedRecords = recordsToSort
    .filter((record) => record.data[sort.header] !== null)
    .sort((a, b) => {
      const [aItem, bItem] =
        sort.header === ""
          ? [a.region, b.region]
          : [a.data[sort.header], b.data[sort.header]];
      console.log(aItem, bItem, aItem > bItem);
      if (sort.isAsc) {
        return aItem > bItem ? 1 : -1;
      }

      return aItem > bItem ? -1 : 1;
    });

  fixedRecords.forEach((record) => {
    sortedRecords.splice(record.fixedPosition, 0, record);
  });

  sortedRecords = [...sortedRecords, ...nullRecordsForSort];

  return (
    <table>
      <thead>
        <StyledHeader>
          <th colSpan={1} style={{ width: 80 }}>
            <ChevronContainer
              onClick={() => {
                if (sort.header === "") {
                  setSort({
                    isAsc: !sort.isAsc,
                    header: "",
                  });
                } else {
                  setSort({
                    isAsc: sort.isAsc,
                    header: "",
                  });
                }
              }}
            >
              <Chevron
                fill="#666"
                direction={
                  sort.header === "" ? (sort.isAsc ? "up" : "down") : "down"
                }
              />
            </ChevronContainer>
          </th>
          {Object.keys(headers).map((header) => (
            <StyledHeaderCell key={header} colSpan={headers[header].length}>
              {header}
            </StyledHeaderCell>
          ))}
        </StyledHeader>
        <StyledSubHeader>
          <th style={{ width: 80 }} />
          {Object.values(headers)
            .flat()
            .map((subheader) => {
              return (
                <StyledSubHeaderCell key={subheader.value}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 9, maxWidth: 100 }}>
                      {subheader.value}
                    </div>
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
        {sortedRecords.map((record, index) => {
          return (
            <StyledBodyRow key={index}>
              <StyledBodyCell>{record.region}</StyledBodyCell>
              {Object.values(headers)
                .flat()
                .map(({ key }, index) => (
                  <StyledBodyCellData
                    onClick={() => onCellClick(record.region, key)}
                    key={`${record.region}${index}`}
                  >
                    <Pill
                      value={record.data[key]}
                      unit={metricsMetadata[key].unit}
                      goodDirection={metricsMetadata[key].goodDirection}
                      isPositive={isValuePositive(
                        record.data[key],
                        average(
                          sortedRecords.map((r) => r.data[key]).filter(Boolean)
                        ),
                        metricsMetadata[key].goodDirection
                      )}
                    />
                  </StyledBodyCellData>
                ))}
            </StyledBodyRow>
          );
        })}
      </tbody>
    </table>
  );
};
