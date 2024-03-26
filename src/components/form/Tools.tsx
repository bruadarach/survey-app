import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setIsTitleFocused } from "../../redux/reducers/titleSlice";
import {
  clearAllFocus,
  copyQuestion,
  deleteQuestion,
  setIsQuestionFocused,
  toggleRequired,
} from "../../redux/reducers/questionSlice";
import styled from "styled-components";
import IconClick from "../common/IconClick";
import ToggleButton from "./ToggleButton";
import { FaRegCopy } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";

interface ITools {
  index: number;
  isRequired: boolean;
}

const Tools = ({ index, isRequired }: ITools) => {
  const dispatch = useDispatch();
  const questionsLength = useSelector(
    (state: RootState) => state.question.questions.length
  );

  const handleCopyQuestion = (index: number) => {
    dispatch(setIsTitleFocused(false));
    dispatch(clearAllFocus());
    dispatch(copyQuestion({ index }));
  };

  const handleDeleteQuestion = (index: number) => {
    // 모든 포커스 초기화
    dispatch(setIsTitleFocused(false));
    dispatch(clearAllFocus());
    // 질문이 하나만 남았을 경우, 삭제하지 않고 첫 번째 질문에 포커스
    if (questionsLength === 1) {
      dispatch(setIsQuestionFocused({ index: 0, focused: true }));
      return;
    }
    // 질문 삭제
    dispatch(deleteQuestion({ index }));
    // 삭제 후 포커스를 맞출 질문의 인덱스 결정
    const nextFocusIndex = index === 0 ? 0 : index - 1;
    // 결정된 인덱스에 포커스 설정
    dispatch(setIsQuestionFocused({ index: nextFocusIndex, focused: true }));
  };

  const handleRequired = () => {
    dispatch(toggleRequired({ index }));
  };

  return (
    <Container>
      {/* @NOTE: 질문폼 복사 */}
      <IconClick
        Icon={FaRegCopy}
        onClick={() => handleCopyQuestion(index)}
        style={{ color: "gray", fontSize: "20px" }}
      />
      {/* @NOTE: 질문폼 삭제 */}
      <IconClick
        Icon={RiDeleteBinLine}
        onClick={() => handleDeleteQuestion(index)}
        style={{ color: "gray", fontSize: "23px" }}
      />
      {/* @NOTE: 질문폼 필수여부 토글 */}
      <Required>
        <span>필수</span>
        <ToggleButton onClick={handleRequired} isRequired={isRequired} />
      </Required>
    </Container>
  );
};

export default Tools;

const Container = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid lightgray;
  margin-top: 30px;
`;

const Required = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
`;
