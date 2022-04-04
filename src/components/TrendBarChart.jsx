const { BarChart, Tooltip, Bar, Cell } = Recharts;

export const TrendBarChart = ({ data, width, height, cellData }) => {
  const dateFormatter = (item) => dayjs(item).format("MMM D, YYYY");
  const filteredData = data.map((i) =>
    i.value === 0 || null ? { ...i, value: null } : i
  );
  console.log(filteredData, "data");

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          {/* <p className="intro">{getIntroOfPage(label)}</p> */}
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }

    return null;
  };

  return (
    <BarChart width={width} height={height} data={filteredData}>
      <Tooltip
        // content={<CustomTooltip />}
        wrapperStyle={{ width: 100, height: 50 }}
        contentStyle={{ fontSize: 10 }}
        itemStyle={{ opacity: "0 !important" }}
        allowEscapeViewBox={{ x: true }}
        position={{ x: -90 }}
        filterNull={true}
        active={false}
        labelFormatter={(date) => dayjs(data[date].date).format("MMM D, YYYY")}
      />
      <Bar dataKey="value">
        {data.map((entry, index) => (
          <Cell fill={entry.value > 0 ? "#FA999C" : "#C1E1C1"} />
        ))}
      </Bar>
    </BarChart>
  );
};
