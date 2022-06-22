import {LineChartComponent} from './LineChart';
import {DateRange} from './DateRange';

const PopUpSelection = window.styled.div`
  grid-row-start: 1;
  grid-column-start: 1;
  grid-column-end: -1;
  border-bottom: 1pt solid #ABB3BF;
`;

const PopUpTabs = window.styled.div`
  display: flex;
  flex-direction: row;
  font-size: 13px;
  padding-left: 25px;
`;

const SelectionItemActive = window.styled.div`
  border-radius:12px 12px 0px 0px;
  color:#FFFFFF;
  display: inline-block;
  padding: 5px 10px;
  background-color: #2786c1;
	border: 1px solid #0E5A8A;
  cursor:pointer;
  height:18px;
`;

const SelectionItem = window.styled.div`
  border-radius:12px 12px 0px 0px;
  color: #738091;
  display: inline-block;
  padding: 5px 10px;
  background-color: #EDEFF2;
	border: 1px solid #ABB3BF;
  cursor:pointer;
  height:18px;
`;

const TopBar = window.styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 1fr;
  grid-template-rows: 1fr 2fr;
  grid-gap: 0.5rem;
`;

const DateRangeContainer = window.styled.div`
  grid-row-start: 2;
  grid-column-start: 4;
  justify-self: end;
`;

export const PopUpComponent = ({
  scorecard,
  benchmark
}) => {
  const [rawData, setRawData] = React.useState(scorecard);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [rawStartDate, setRawStartDate] = React.useState();
  const [rawEndDate, setRawEndDate] = React.useState();
  const [inputData, setInputData] = React.useState([]);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleStartDate = (e) => setStartDate(e.target.value);
  const handleEndDate = (e) => setEndDate(e.target.value);

  React.useEffect(() => {
    setRawData(selectedTab === 0 ? scorecard : benchmark)
  }, [scorecard, benchmark])
  
  React.useEffect(() => {
    console.log({lengthL: Object.keys(rawData).length, datata: rawData});
    if (rawData.data) {
      const dates = rawData.data.map(item => new Date(item.date));
      const start = Math.min(...dates);
      const end = Math.max(...dates);
      console.log({rawData, start, end});
      setStartDate(start);
      setEndDate(end);
      setRawStartDate(start);
      setRawEndDate(end);
      setInputData(rawData.data);
    }
  }, [rawData]);

  React.useEffect(() => {
    console.log('datesPopup', {rawData});
    if (startDate && endDate) {
      const filteredData = rawData.data.filter(item => {
        const date = new Date(item.date);
        return date >= new Date(startDate) && date <= new Date(endDate);
      });
      setInputData(filteredData);
    }
  }, [startDate, endDate]);

  const handleReloadClick = () => {
    setStartDate(rawStartDate);
    setEndDate(rawEndDate);
  };

  const handleTabClick = () => {
    if (selectedTab === 0) {
      setSelectedTab(1);
      setRawData(benchmark);
    } else {
      setSelectedTab(0);
      setRawData(scorecard);
    }
  };

  console.log('ipdata', {rawData, inputData, scorecard, benchmark});

  return (
    <div>
      <TopBar>
        <PopUpSelection>
          <PopUpTabs>
            {selectedTab === 0 ? (
              <>
                <SelectionItemActive onClick={handleTabClick}>Trend vs Ambition</SelectionItemActive>
                <SelectionItem onClick={handleTabClick}>Benchmark chart</SelectionItem>
              </>
            ) : (
              <>
                <SelectionItem onClick={handleTabClick}>Trend vs Ambition</SelectionItem>
                <SelectionItemActive onClick={handleTabClick}>Benchmark chart</SelectionItemActive>
              </>
            )}
          </PopUpTabs>
        </PopUpSelection>
        {rawData.data && (
          <DateRangeContainer>
            <DateRange 
              startDate={startDate}
              handleStartDate={handleStartDate}
              endDate={endDate}
              handleEndDate={handleEndDate}
              onReloadClick={handleReloadClick}
            />
          </DateRangeContainer>
        )}
      </TopBar>
      {rawData.data ? (
        <LineChartComponent
          height={rawData.height ?? 300}
          data={inputData}
          series={rawData.series ?? []}
          colors={rawData.colors ?? {}}
          unit={rawData.unit ?? 'absolute'}
        />
      ) : (
        <div>No data to display</div>
      ) }
      
    </div>
  );
};