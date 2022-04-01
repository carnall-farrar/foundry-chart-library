const { BarChart, Tooltip, Bar, Cell } = Recharts;

export const TrendBarChart = ({ data, width, height, cellData }) => {
  const dateFormatter = (item) => dayjs(item).format("MMM D, YYYY");
  return (
    <BarChart width={width} height={height} data={data}>
      <Tooltip
        wrapperStyle={{ width: 100, height: 50 }}
        contentStyle={{ fontSize: 10 }}
        allowEscapeViewBox={{ x: true }}
        position={{ x: -90 }}
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
