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

export const TimelineSeriesChart = ({ data, width, height }) => {
  return (
    <LineChart data={data} width={width} height={height}>
      <XAxis></XAxis>
      <YAxis></YAxis>
      <Tooltip
        wrapperStyle={{ width: 80, height: 50 }}
        contentStyle={{ fontSize: 10 }}
        allowEscapeViewBox={{ x: true }}
        position={{ x: -90 }}
      />
      <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
    </LineChart>
  );
};
