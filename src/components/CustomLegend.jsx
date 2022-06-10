const {
  Surface,
  Symbols
} = Recharts;

const LegendContainer = window.styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const LegendText = window.styled.span`
  margin-left: 5px;
`

export const renderCusomizedLegend = ({ payload }) => {
  const {colorMap, disabled, handleClick} = payload;
  console.log({colorMap, disabled, handleClick});
  const test = colorMap.map((item, index) => item);
  console.log({test});
  return (
    <LegendContainer>
      {colorMap.map(entry => {
        const [dataKey, color] = entry;
        const active = disabled.includes(dataKey);
        const style = {
          marginRight: 10,
          paddingBottom: 10,
          color: active ? '#AAA' : '#000'
        };
        console.log({entry, dataKey, color, active});

        return (
          <span
            onClick={() => handleClick(dataKey)}
            style={style}
          >
            <Surface width={10} height={10} viewBox="0 0 10 10">
              <Symbols cx={5} cy={5} type="circle" size={50} fill={color} />
              {active && (
                <Symbols
                  cx={5}
                  cy={5}
                  type="circle"
                  size={25}
                  fill={'#FFF'}
                />
              )}
            </Surface>
            <LegendText>{dataKey}</LegendText>
          </span>
        );
      })}
    </LegendContainer>
  );
};