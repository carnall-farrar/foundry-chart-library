export const DateRange = ({
  startDate, 
  handleStartDate,
  endDate,
  handleEndDate
}) => {
  console.log('dates', {startDate, endDate});
  const start = dayjs(startDate).format('YYYY-MM-DD');
  const end = dayjs(endDate).format('YYYY-MM-DD');
  return (
    <div>
      <input type='date' value={start} onChange={handleStartDate}></input>
      <input type='date' value={end} onChange={handleEndDate}></input>
    </div>
  );
};