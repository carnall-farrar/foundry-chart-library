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


export const LineChartComponent = ({height, data, series, colors}) => {
  const [disabled, setDisabled] = React.useState([]);
  const [inputData, setInputData] = React.useState([]);
  const handleLegendClick = (key) => {
    if (disabled.includes(key)) {
      setDisabled(disabled.filter(k => k !== key));
    } else {
      console.log('clicked', disabled, key)
      setDisabled([...disabled, key]);
    }
  }

  const dateFormatted = data.map(item => {
    return {
      ...item,
      newDate: dayjs(new Date(item.date)).unix(),
    }
  });

  React.useEffect(() => {
    const filteredData = dateFormatted.map(item => {
      const keys = Object.keys(item).filter(key => !disabled.includes(key))
      return keys.reduce((a, v) => ({...a, [v]: item[v]}), {})
    });
    setInputData(filteredData); 
  }, [disabled]);

  return (
    <ResponsiveContainer width = '95%' height = {height} >
      <LineChart width={width} height={height} data={inputData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid stroke="#DCE0E5" vertical={false}/>
        {series.map((serie, index) => <Line type="monotone" dataKey={serie} stroke={colors[serie] ?? "#8F99A8"} />)}
        <XAxis 
          dataKey="newDate" 
          tickFormatter = {(unixTime) => dayjs.unix(unixTime).format("D MMM YYYY")}
          type='number'
          domain = {['auto', 'auto']}
        />
        <YAxis axisLine={false} tickLine={false}/>
        <Tooltip />
        <Legend 
          layout="horizontal" 
          verticalAlign="top" 
          align="center"
          payload={{colorMap: Object.entries(colors), disabled, handleClick: handleLegendClick}}
          content={renderCusomizedLegend}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};