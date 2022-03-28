const Background = window.styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  overflow-y: hidden;
  z-index: 3;
`;

const ModalWrapper = window.styled.div`
  width: 550px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: absolute;
  padding: 40px;
  padding-top: 0px;
  display: initial;
  overflow-y: hidden;
  justify-content: center;
  align-items: center;
`;

const ModalContent = window.styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.6;
  font-size: 14px;
  weight: 400;
  color: #606060;
  margin-top: 20px;
`;

const Header = window.styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: 67px;
  border-bottom: 1px solid #b5b5b5;
  align-items: center;
`;

const Title = window.styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1c1c1c;
`;

const IconWrapper = window.styled.svg`
  font-size: 20px;
  width: 20px;
  height: 100%;
  position: relative;
  left: 250px;
`;

const InfoPanelHeaderContainer = window.styled.div`
  display: flex;
  align-content: center;
  vertical-align: middle;
`;

const StyledParagraph = window.styled.div`
  padding-top: 15px;
`;

const modalRoot = document.getElementById("modal-root");

export const ModalRoot = ({ children }) => {
  const el = React.useRef(document.createElement("div"));

  React.useEffect(() => {
    modalRoot.appendChild(el.current);

    return () => {
      modalRoot.removeChild(el.current);
    };
  }, []);

  return ReactDOM.createPortal(children, el.current);
};

export const Modal = ({ showModal, onClose, children }) => {
  return (
    <>
      {showModal ? (
        <ModalRoot>
          <Background>
            <ModalWrapper>
              <InfoPanelHeaderContainer>
                <Header>
                  <Title>Timeline Series Modal Pop out</Title>

                  <IconWrapper
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={onClose}
                  >
                    <text x="0" y="18">
                      X
                    </text>
                  </IconWrapper>
                </Header>
              </InfoPanelHeaderContainer>
              <ModalContent>{children}</ModalContent>
            </ModalWrapper>
          </Background>
        </ModalRoot>
      ) : null}
    </>
  );
};
