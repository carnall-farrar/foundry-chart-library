import { renderCusomizedLegend } from './CustomLegend';

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


export const LineChartComponent = (
  { height, 
    data, 
    series, 
    colors, 
    unit
  }) => {
  const [disabled, setDisabled] = React.useState([]);
  const [inputData, setInputData] = React.useState([]);
  const handleLegendClick = (key) => {
    if (disabled.includes(key)) {
      setDisabled(disabled.filter(k => k !== key));
    } else {
      setDisabled([...disabled, key]);
    }
  }


  React.useEffect(() => {
    console.log({dataInLinChart: data})
    if (data.length > 0) {
      const dateFormatted = data.map(item => {
        return {
          ...item,
          newDate: dayjs(new Date(item.date)).unix(),
        }
      });
  
      const filteredData = dateFormatted.map(item => {
        const keys = Object.keys(item).filter(key => !disabled.includes(key))
        return keys.reduce((a, v) => ({...a, [v]: item[v]}), {})
      });
      setInputData(filteredData); 
    }
  }, [disabled, data]);

  return (
    <ResponsiveContainer width = '95%' height = {height} >
      {inputData.length > 0 && (
        <LineChart height={height} data={inputData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#DCE0E5" vertical={false}/>
          {series.map((serie, index) => 
            <Line 
              type="monotone" 
              activeDot={true}
              dataKey={serie} 
              stroke={colors[serie] ?? "#8F99A8"}
              strokeDasharray={serie === 'Ambition' ? "5" : null}
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />)}
          <XAxis 
            dataKey="newDate" 
            tickFormatter = {(unixTime) => dayjs.unix(unixTime).format("D MMM YYYY")}
            type='number'
            domain = {['dataMin', 'dataMax']}
            style={{
              fontSize: '12',
              fontFamily: 'sans-serif',
            }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tickFormatter={(v) => unit === 'percentage' ? `${v}%` : v}
            style={{
              fontSize: '12',
              fontFamily: 'sans-serif',
            }}
          />
          <Tooltip 
            labelFormatter={(value) => dayjs.unix(value).format("D MMM YYYY")}
            wrapperStyle={{
              fontSize: '12',
              fontFamily: 'sans-serif',
            }}
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="top" 
            align="center"
            payload={{colorMap: Object.entries(colors), disabled, handleClick: handleLegendClick}}
            content={renderCusomizedLegend}
            wrapperStyle={{
              fontSize: '12',
              fontFamily: 'sans-serif',
            }}
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};