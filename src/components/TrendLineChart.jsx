// const recharts = require('recharts')
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
      // <ResponsiveContainer>
        <LineChart
          data={data}
          width={width}height={height}
          // margin={{ top: 35, right: 30, left: 20, bottom: 5 }}
        >
          {/* <CartesianGrid strokeDasharray='3 3' /> */}
          {/* <XAxis dataKey='name' />
          <YAxis />
          <Tooltip /> */}
          {/* <Legend /> */}
          <Line
            type='monotone'
            dataKey='value'
            stroke='#8884d8'
            dot={false}
            // activeDot={{ r: 8 }}
          />
          {/* <Line
            type='monotone'
            dataKey='uv'
            stroke='#82ca9d'
            activeDot={{ r: 8 }}
          /> */}
        </LineChart>
      // </ResponsiveContainer>
    );
  };
  
  