import { useState } from "react";
import styled from "styled-components";
import { Modal } from "./Modal";

const Container = styled.div`
  justify-content: center;
  align-items: center;
`;

export function TimelineModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </Container>
    </>
  );
}
