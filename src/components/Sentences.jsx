import { Chevron } from '../icons';

// const ChevronContainer = window.styled.div`
//                         flex: 3;
//                         display: flex;
//                         justifyContent: center;
//                         alignItems: center;
//                         cursor: pointer;
// `;

const StyledTableBody = window.styled.tbody`
  display: block;
  height: 50px;
  overflow: auto;
`;

const StyledHeader = window.styled.tr`
  
`;

const StyledHeaderCell = window.styled.th`
  font-size: 13px; 
  font-weight: bold;
  font-family: "Roboto", sans-serif; 
  background-color: rgb(0, 95, 184);
  color: white;
  padding: 8px 10px;
`;

const StyledBottomRow = window.styled.tr`
  cursor: pointer;
  text-align: center;
`;

const StyledBottomRowCell = window.styled.td`
  font-size: 13px; 
  font-family: "Roboto", sans-serif; 
  background-color: #e5e5e5;
  color: #333;
  padding: 8px 10px;
  font-weight: 200;
  &:hover {
    box-shadow: 0 5px 15px #f5f5f5;
    background-color:#ABB3BF;
	  filter: brightness(120%);
  }
`;

const StyledGroupCell = window.styled.div`
  background-color: white;
  color: black;
  padding: 8px 10px;
`;

const StyledBodyRow = window.styled.tr`
  font-size: 13px;
  font-family: "Roboto", sans-serif; 
  &:hover {
    background-color: #abddff;
    cursor: pointer;
  }
`;

const StyledBodyCell = window.styled.td`
  padding: 10px 10px;
  border-bottom: 1px solid #dedede;
  text-align: center;
`;

const StyledBodyCellData = window.styled.td`
  cursor: pointer;
  padding: 10px 10px;
  border-bottom: 1px solid #dedede;
  text-align: center;
`;

export const Sentences = ({
  headers,
  records,
  onCellClick
}) => {
  const [ sentences, setSentences ] = React.useState([]);
  const [ singleSentence, setSingleSentence ] = React.useState(false);

  React.useEffect(() => {
    setSentences(records);
  }, [records]);

  return (
    <table>
      <thead>
        <StyledHeader>
          {headers.map((header) => (
            <StyledHeaderCell key={header}>
              {header}
            </StyledHeaderCell>
          ))}
        </StyledHeader>
      </thead>
      <tbody>
        {sentences.map((record, index) => (
          <StyledBodyRow key={index}>
            {headers.flat().map((header, index) => {
              const value = record.sentenceContent[header];
              console.log({value, record, header, headers});
              return (
                <StyledBodyCell onClick={() => {
                  if (onCellClick) {
                    onCellClick(record, header);
                  }
                  if (!singleSentence)  {
                    const newSentences = sentences.filter((sentence) => sentence.sentenceId === record.sentenceId);
                    setSentences(newSentences);
                    setSingleSentence(!singleSentence);
                  }
                  
                }}
                key={`${record.sentenceId}${index}`}
                >
                  {value}
                </StyledBodyCell>
              );
            })}
          </StyledBodyRow>
        ))}
        {singleSentence && (
          <StyledBottomRow key='bottom'>
            <StyledBottomRowCell 
              align='center' 
              colSpan={headers.length}
              onClick={() => {
                setSentences(records);
                setSingleSentence(!singleSentence);
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                 Expand to all sentences
                </div>
                <Chevron fill='#666' direction={'down'}/>
              </div>
              
            </StyledBottomRowCell>
          </StyledBottomRow>
        )}
      </tbody>
    </table>
  );
};