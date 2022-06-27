const DateRangeElement = window.styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`;

const DatePicker = window.styled.input`
  height: 24px;
  font-size: 12;
  padding: 0px 15px;
  border: thin solid #C5CBD3;
  color: #738091;
  background-color: #F6F7F9;
  border-radius: 3px;
  &::-webkit-calendar-picker-indicator {
    filter: invert(54%) sepia(39%) saturate(173%) hue-rotate(174deg) brightness(85%) contrast(89%);
  } 
`;

const Arrow = window.styled.div`
  font-size: 20px;
  color: #738091;
`;

const ReloadButton = window.styled.div`
  font-size: 30px;
  color: #738091;
  padding-left: 10px;
  cursor: pointer;
  margin-bottom: 5px;
`;

export const DateRange = ({
  startDate,
  handleStartDate,
  endDate,
  handleEndDate,
  onReloadClick,
  rawStartDate,
  rawEndDate,
}) => {
  console.log("dates", { startDate, endDate });
  const start = dayjs(startDate).format("YYYY-MM-DD");
  const end = dayjs(endDate).format("YYYY-MM-DD");
  const rawStart = dayjs(rawStartDate).format("YYYY-MM-DD");
  const rawEnd = dayjs(rawEndDate).format("YYYY-MM-DD");
  return (
    <DateRangeElement>
      <DatePicker
        type="date"
        value={start}
        min={rawStart}
        max={end}
        onChange={handleStartDate}
      ></DatePicker>
      <Arrow>&#8594;</Arrow>
      <DatePicker
        type="date"
        value={end}
        min={start}
        max={rawEnd}
        onChange={handleEndDate}
      ></DatePicker>
      <ReloadButton onClick={onReloadClick}>&#8634;</ReloadButton>
    </DateRangeElement>
  );
};
