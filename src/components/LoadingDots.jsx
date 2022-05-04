
const LoadingWrapper = window.styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
`;

const LoadingText = window.styled.div`
  margin-right: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  color: rgb(0, 95, 184);
  justify-content: center;
`;

const Dots = window.styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: ".";
    font-size: 3.5rem;
    width: 1em;
    text-align: left;
    color: rgb(0, 95, 184);
  }
  @keyframes ellipsis {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }
`;

export const LoadingDots = () => {
  return (
    <LoadingWrapper>
      <LoadingText>Loading table</LoadingText>
      <Dots></Dots>
    </LoadingWrapper>
  );
};