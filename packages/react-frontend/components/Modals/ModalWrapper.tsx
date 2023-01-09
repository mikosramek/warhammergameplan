import { ReactNode } from "react";
import * as Styled from "./ModalWrapper.styled";

type Props = {
  heading: string;
  children: ReactNode;
  closeModal: () => void;
};

const ModalWrapper = ({ heading, children, closeModal }: Props) => {
  return (
    <Styled.ModalWrapper>
      <Styled.ModalBackground />
      <Styled.CloseButton
        aria-label={`Closes the ${heading} modal.`}
        onClick={closeModal}
      >
        x
      </Styled.CloseButton>
      <Styled.Modal>
        <Styled.Heading>{heading}</Styled.Heading>
        {children}
      </Styled.Modal>
    </Styled.ModalWrapper>
  );
};

export default ModalWrapper;
