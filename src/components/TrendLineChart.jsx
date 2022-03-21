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
    <LineChart
      data={data}
      width={width}
      height={height}
    >
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        dot={false}
      />
    </LineChart>
  );
};
