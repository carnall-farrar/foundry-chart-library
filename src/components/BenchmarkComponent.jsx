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
  &:hover {
    background-color: #eee;
  }
  cursor: pointer;
  padding: 10px 0px;
  border-bottom: 1px solid #dedede;
  text-align: center;
`;

const StyledPill = window.styled.div`
  padding: 4px 8px;
  border-radius: 5px;
  background-color: ${(props) => {
    if (props.value === null) {
      return "#e7e7e7";
    }

    return props.isPositive && typeof props.value === "number"
      ? "#a1e2c4"
      : "#ffd4d4";
  }};
  border: 1px solid ${(props) => {
    if (props.value === null) {
      return "#bdbdbd";
    }

    return props.isPositive && typeof props.value === "number"
      ? "#44a278"
      : "#b54f4f";
  }};
  color: ${(props) => {
    if (props.value === null) {
      return "#bdbdbd";
    }

    return props.isPositive && typeof props.value === "number"
      ? "#44a278"
      : "#b54f4f";
  }};
`;

const Chevron = ({ fill, direction }) => {
  const style = {};
  if (direction === "up") {
    style.transform = "rotateX(180deg)";
  }
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        fill={fill}
        d="M7.41 8.58L12 13.17L16.59 8.58L18 10L12 16L6 10L7.41 8.58Z"
      />
    </svg>
  );
};

const Pill = ({ value, isPositive }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StyledPill isPositive={isPositive} value={value}>
        {typeof value === "number" ? value : "~"}
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

export const BenchmarkComponent = ({
  headers,
  records,
  metricsMetadata,
  onCellClick,
}) => {
  const [sort, setSort] = React.useState({
    isAsc: true,
    header: Object.values(headers)[0][0].key,
  });

  const sortedRecords = records.sort((a, b) => {
    if (sort.isAsc) {
      return a.data[sort.header] < b.data[sort.header] ? 1 : -1;
    }

    return a.data[sort.header] < b.data[sort.header] ? -1 : 1;
  });

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
          <th style={{ width: 80 }} />
          {Object.values(headers)
            .flat()
            .map((subheader) => {
              return (
                <StyledSubHeaderCell key={subheader.value}>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 9 }}>{subheader.value}</div>
                    <div
                      style={{
                        flex: 3,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
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
                    </div>
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
              {Object.keys(record.data).map((key, index) => (
                <StyledBodyCellData
                  onClick={onCellClick}
                  key={`${record.region}${index}`}
                >
                  <Pill
                    value={record.data[key]}
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
