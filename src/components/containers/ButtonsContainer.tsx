import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  checkResponseSufficient,
  resetResponses,
} from "../../redux/reducers/questionSlice";
import styled from "styled-components";
import IconClick from "../common/IconClick";
import { GoPencil } from "@react-icons/all-files/go/GoPencil";

const ButtonsContainer = ({
  pageMode,
}: {
  pageMode: "survey" | "preview" | "submit";
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const missingRequiredResponses = useSelector(
    (state: RootState) =>
      state.question.questions.filter(
        (question) => question.isRequired && question.responses.length === 0
      ).length
  );

  const navigateToSubmitPage = () => {
    dispatch(checkResponseSufficient());

    if (missingRequiredResponses > 0) {
      return alert("필수 질문에 답변해주세요.");
    } else {
      navigate("/submit");
    }
  };

  const handleResetResponses = () => {
    const isConfirmed = window.confirm(
      "양식을 지우시겠습니까?\n모든 질문에서 답변이 삭제되며 되돌릴 수 없습니다."
    );
    if (isConfirmed) {
      dispatch(resetResponses());
    }
  };

  const navigateToSurveyPage = () => {
    navigate("/");
  };

  return (
    <Container $pageMode={pageMode}>
      <Button
        type="button"
        onClick={navigateToSubmitPage}
        aria-label="submit button"
        tabIndex={0}
      >
        제출
      </Button>
      <NoBgButton
        type="button"
        onClick={handleResetResponses}
        aria-label="clear all responses"
        tabIndex={0}
      >
        양식 지우기
      </NoBgButton>
      <IconClick
        Icon={GoPencil}
        areaLabel="navigate to survey page"
        onClick={navigateToSurveyPage}
        style={{
          position: "fixed",
          fontSize: "21px",
          borderRadius: "50%",
          boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.2)",
          color: "#673ab7",
          background: "#fff",
          right: "26px",
          bottom: "26px",
          padding: "13px",
        }}
      />
    </Container>
  );
};

export default ButtonsContainer;

const Container = styled.div<{ $pageMode: "survey" | "preview" | "submit" }>`
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

  &:focus {
    outline: none;
  }

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
