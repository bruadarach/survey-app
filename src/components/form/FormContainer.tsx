import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setIsTitleFocused } from "../../redux/reducers/titleSlice";
import {
  clearAllFocus,
  setIsQuestionFocused,
  setDragIndex,
  setDND,
} from "../../redux/reducers/questionSlice";
import DragDrop from "../common/DragDrop";
import BasicForm from "../common/BasicForm";
import QuestionInputs from "./QuestionInputs";
import TextInputs from "./TextInputs";
import ChoiceInputs from "./ChoiceInputs";
import Tools from "./Tools";
import FloatingButtons from "./FloatingButtons";

const FormContainer = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.question.questions);

  const handleFormFocus = (index: number) => {
    dispatch(setIsTitleFocused(false));
    dispatch(clearAllFocus());
    dispatch(setIsQuestionFocused({ index: index, focused: true }));
  };

  const handleDragStart = (
    e: React.DragEvent,
    index: number,
    optionIndex?: number
  ) => {
    e.stopPropagation();
    dispatch(
      setDragIndex({ questionDragIndex: index, optionDragIndex: optionIndex })
    );
  };

  const handleDrop = (
    e: React.DragEvent,
    index: number,
    optionIndex?: number
  ) => {
    e.stopPropagation();
    dispatch(
      setDND({ questionDropIndex: index, optionDropIndex: optionIndex })
    );
  };

  return questions.map((question, index: number) => (
    <DragDrop
      key={question.id}
      mode="horizontal"
      isFocused={question.isFocused}
      onDragStart={(e) => handleDragStart(e, index, undefined)}
      onDrop={(e) => handleDrop(e, index, undefined)}
    >
      <BasicForm
        key={question.id}
        isTitleComponent={false}
        isFocused={question.isFocused}
        onFocus={() => handleFormFocus(index)}
      >
        {/* @NOTE: 질문 섹션 */}
        <QuestionInputs
          index={index}
          type={question.type}
          isFocused={question.isFocused}
        />
        {/* @NOTE: 옵션 섹션 - 답변 타입이 단답형 또는 장문형 텍스트인 경우 */}
        {["textShort", "textLong"].includes(question.type) && (
          <TextInputs type={question.type} />
        )}
        {/* @NOTE: 옵션 섹션 - 답변 타입이 객관식 질문, 체크박스, 드롭다운인 경우 */}
        {question.optionList.map((option, optionIndex) => {
          if (
            question.type === "dropdown" &&
            question.hasETC &&
            option.text === "기타"
          ) {
            return null;
          }
          return (
            ["radio", "checkbox", "dropdown"].includes(question.type) && (
              <DragDrop
                key={option.id}
                mode="vertical"
                draggable={option.text !== "기타"}
                isFocused={question.isFocused && option.text !== "기타"}
                onDragStart={(e) => handleDragStart(e, index, optionIndex)}
                onDrop={(e) => handleDrop(e, index, optionIndex)}
              >
                <ChoiceInputs
                  key={option.id}
                  index={index}
                  optionIndex={optionIndex}
                  editableMode={"edit"}
                  dropdownMode={"edit"}
                  type={question.type}
                  optionText={option.text}
                  isFocused={question.isFocused}
                  hasETC={question.hasETC}
                />
              </DragDrop>
            )
          );
        })}
        {/* @NOTE: 옵션 추가 또는 기타 추가 */}
        {question.isFocused &&
          ["radio", "checkbox", "dropdown"].includes(question.type) && (
            <ChoiceInputs
              index={index}
              editableMode={"read"}
              dropdownMode={"add"}
              type={question.type}
              isFocused={question.isFocused}
              hasETC={question.hasETC}
            />
          )}
        {/* @NOTE: 도구 섹션 */}
        {question.isFocused && (
          <Tools index={index} isRequired={question.isRequired} />
        )}
      </BasicForm>
      {/* @NOTE: 플로팅 버튼 */}
      {question.isFocused && <FloatingButtons index={index} />}
    </DragDrop>
  ));
};

export default FormContainer;
