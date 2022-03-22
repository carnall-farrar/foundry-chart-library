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

export const TrendLineChart = ({ data, width, height }) => {
  return (
    <LineChart data={data} width={width} height={height}>
      <Tooltip wrapperStyle={{ width: 50, height: 50 }} />
      <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
    </LineChart>
  );
};
