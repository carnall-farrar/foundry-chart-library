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

export const TimelineSeriesChart = ({ data, height }) => {
  return (
    <ResponsiveContainer height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis />
        <Tooltip
          wrapperStyle={{ width: 80, height: 50 }}
          contentStyle={{ fontSize: 10 }}
          // allowEscapeViewBox={{ x: true }}
          // position={{ x: -90 }}
        />
        <Line type="monotone" dataKey="value1" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="value2" stroke="#EE84d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};
