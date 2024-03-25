import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetResponses } from "../../redux/reducers/questionSlice";
import styled from "styled-components";

const ButtonsContainer = ({ pageMode }: { pageMode: "survey" | "preview" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToSubmit = () => {
    navigate("/submit");
  };

  const handleResetResponses = () => {
    const isConfirmed = window.confirm(
      "양식을 지우시겠습니까?\n모든 질문에서 답변이 삭제되며 되돌릴 수 없습니다."
    );
    if (isConfirmed) {
      dispatch(resetResponses());
    }
  };

  return (
    <Container $pageMode={pageMode}>
      <Button onClick={navigateToSubmit}>제출</Button>
      <NoBgButton onClick={handleResetResponses}>양식 지우기</NoBgButton>
    </Container>
  );
};

export default ButtonsContainer;

const Container = styled.div<{ $pageMode: "survey" | "preview" }>`
  display: ${({ $pageMode }) => ($pageMode === "preview" ? "flex" : "none")};
  width: 100%;
  justify-content: space-between;
`;

const Button = styled.button`
  font-size: 14px;
  width: 70px;
  padding: 8px 0;
  background-color: #673ab7;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5e35b1dd;
  }
`;

const NoBgButton = styled(Button)`
  background-color: transparent;
  color: #673ab7;

  &:hover {
    background-color: #683ab715;
  }
`;
