import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setQuestionTitle } from "../../redux/reducers/questionSlice";
import styled from "styled-components";
import EditableDiv from "../common/EditableDiv";
import SelectBox from "./SelectBox";

interface IQuestionInputs {
  index: number;
  pageMode: "survey" | "preview" | "submit";
  type: string;
  isFocused: boolean;
  isRequired: boolean;
}

const QuestionInputs = ({
  index,
  pageMode,
  type,
  isFocused,
  isRequired,
}: IQuestionInputs) => {
  const dispatch = useDispatch();
  const { title } = useSelector(
    (state: RootState) => state.question.questions[index]
  );

  const handleTitleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    dispatch(setQuestionTitle({ index: index, title: target.textContent }));
  };

  return (
    <Container>
      <EditableDiv
        placeholder="질문"
        contentEditable={pageMode === "survey" && isFocused}
        onBlur={handleTitleInput}
        style={
          pageMode === "survey" && isFocused
            ? {
                fontSize: "16px",
                fontWeight: "500",
                backgroundColor: "#F8F9FA",
                padding: "1rem 0 1rem 1rem",
              }
            : {
                fontSize: "16px",
                fontWeight: "500",
                borderBottom: "none",
              }
        }
      >
        {title}{" "}
        {pageMode === "preview" && isRequired && (
          <span style={{ color: "red" }}>*</span>
        )}
      </EditableDiv>
      {pageMode === "survey" && isFocused && (
        <SelectBox index={index} type={type} pageMode="survey" />
      )}
    </Container>
  );
};

export default QuestionInputs;

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;

  & > div {
    flex: 2.5;
  }

  & > div:last-child {
    flex: 1;
  }

  @media (max-width: 950px) {
    flex-direction: column;
    gap: 15px;
  }
`;
