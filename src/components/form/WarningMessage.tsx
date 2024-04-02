import styled from "styled-components";
import { AiOutlineExclamationCircle } from "@react-icons/all-files/ai/AiOutlineExclamationCircle";

const WarningMessage = () => {
  return (
    <Container>
      <AiOutlineExclamationCircle
        style={{ alignSelf: "center" }}
        size="20px"
        aria-hidden="true"
      />
      <span>필수 질문입니다.</span>
    </Container>
  );
};

export default WarningMessage;

const Container = styled.div`
  margin-top: 5px;
  color: red;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
`;
