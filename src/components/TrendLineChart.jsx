const {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} = Recharts;

export const TrendLineChart = ({ data, width, height, cellData }) => {
  const dateFormatter = (item) => dayjs(item).format("MMM D, YYYY");
  return (
    <LineChart data={data} width={width} height={height}>
      <Tooltip
        wrapperStyle={{ width: 100, height: 50 }}
        contentStyle={{ fontSize: 10 }}
        allowEscapeViewBox={{ x: true }}
        position={{ x: -90 }}
        labelFormatter={(date) => dayjs(data[date].date).format("MMM D, YYYY")}
      />
      <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
    </LineChart>
  );
};
