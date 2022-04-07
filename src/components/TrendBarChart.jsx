const { BarChart, Tooltip, Bar, Cell } = Recharts;

const TooltipContent = window.styled.div`
background: white;
padding: 0.5rem;
border: 1px solid #555555;
> p.label {
  fontWeight: 700;
  margin-bottom: 0.5rem;
}
`;

export const TrendBarChart = ({
  data,
  isPercentage,
  ambition,
  width,
  height,
  cellData,
}) => {
  const dateFormatter = (item) => dayjs(item).format("MMM D, YYYY");
  const filteredData = data.map((i) =>
    i.value === 0 || null ? { ...i, value: null } : i
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const week = dayjs(payload[0].payload.date).format("MMM D, YYYY");
      const value = payload[0].value;
      return (
        <TooltipContent>
          <p className="label">{week}</p>
          {/* <p>{`${Math.round((payload[0].value * 100) / ambition) * 100}% `}</p> */}
          <p>{isPercentage ? `${value}%` : value.toLocaleString()}</p>
          {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        </TooltipContent>
      );
    }

    return null;
  };

  const isNoData = filteredData.every((d) => d.value === null);
  if (isNoData) {
    return null;
  }

  return (
    <BarChart width={width} height={height} data={filteredData}>
      <Tooltip
        content={<CustomTooltip />}
        wrapperStyle={{ width: 100, height: 50 }}
        contentStyle={{ fontSize: 10 }}
        itemStyle={{ opacity: "0 !important" }}
        allowEscapeViewBox={{ x: true }}
        position={{ x: -90 }}
        filterNull={true}
        active={false}
        // labelFormatter={(date) => dayjs(data[date].date).format("MMM D, YYYY")}
      />
      <Bar dataKey="value">
        {data.map((entry, index) => (
          <Cell fill={entry.value > 0 ? "#FA999C" : "#C1E1C1"} />
        ))}
      </Bar>
    </BarChart>
  );
};
