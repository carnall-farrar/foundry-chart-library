import {LineChartComponent} from './LineChart';
import {DateRange} from './DateRange';
import { useEffect } from 'react/cjs/react.production.min';

const PopUpTitle = window.styled.div`
  font-size: 1.5rem;
`;

export const PopUpComponent = ({
  title,
  height,
  data,
  series,
  colors
}) => {
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [inputData, setInputData] = React.useState(data);
  const handleStartDate = (e) => setStartDate(e.target.value);
  const handleEndDate = (e) => setEndDate(e.target.value);

  React.useEffect(() => {
    const dates = data.map(item => new Date(item.date));
    const start = Math.min(...dates);
    const end = Math.max(...dates);
    setStartDate(start);
    setEndDate(end);
  }, []);

  React.useEffect(() => {
    if (startDate && endDate) {
      const filteredData = data.filter(item => {
        const date = new Date(item.date);
        return date >= new Date(startDate) && date <= new Date(endDate);
      });
      setInputData(filteredData);
    } else {
      setInputData(data);
    }
  }, [startDate, endDate]);

  return (
    <div>
      <PopUpTitle>
        {title}
      </PopUpTitle>
      <DateRange 
        startDate={startDate}
        handleStartDate={handleStartDate}
        endDate={endDate}
        handleEndDate={handleEndDate}
      />
      <LineChartComponent
        height={height}
        data={inputData}
        series={series}
        colors={colors}
      />
    </div>
  );
};