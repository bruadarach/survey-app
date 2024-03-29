import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setIsTitleFocused } from "../../redux/reducers/titleSlice";
import {
  clearAllFocus,
  setIsQuestionFocused,
  setDragIndex,
  setDND,
  resetResponses,
} from "../../redux/reducers/questionSlice";
import DragDrop from "../common/DragDrop";
import BasicForm from "../common/BasicForm";
import QuestionInputs from "../form/QuestionInputs";
import TextInputs from "../form/TextInputs";
import ChoiceInputs from "../form/ChoiceInputs";
import Tools from "../form/Tools";
import FloatingButtons from "../form/FloatingButtons";
import SelectBox from "../form/SelectBox";
import WarningMessage from "../form/WarningMessage";

interface IFormContainer {
  pageMode: "survey" | "preview";
}

const FormContainer = ({ pageMode }: IFormContainer) => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.question.questions);

  useEffect(() => {
    if (pageMode === "survey") dispatch(resetResponses());
  }, [pageMode]);

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
      pageMode={pageMode}
      mode={"horizontal"}
      isFocused={question.isFocused}
      onDragStart={(e) => handleDragStart(e, index, undefined)}
      onDrop={(e) => handleDrop(e, index, undefined)}
    >
      <BasicForm
        key={question.id}
        pageMode={pageMode}
        isTitleComponent={false}
        isFocused={question.isFocused}
        onFocus={() => handleFormFocus(index)}
        style={
          pageMode === "preview" &&
          question.isRequired &&
          !question.isResponseSufficient
            ? { border: "1px solid red" }
            : {}
        }
      >
        {/* @NOTE: 질문 섹션 */}
        <QuestionInputs
          index={index}
          pageMode={pageMode}
          type={question.type}
          isFocused={question.isFocused}
          isRequired={question.isRequired}
        />
        {/* @NOTE: 옵션 섹션 - 답변 타입이 단답형 또는 장문형 텍스트인 경우 */}
        {["textShort", "textLong"].includes(question.type) && (
          <TextInputs
            index={index}
            pageMode={pageMode}
            type={question.type}
            isFocused={question.isFocused}
          />
        )}
        {/* @NOTE: 옵션 섹션 - 답변 타입이 객관식 질문, 체크박스, 드롭다운인 경우 */}
        {question.optionList.map((option, optionIndex) => {
          if (question.type === "dropdown" && question.hasETC && option.isETC) {
            return null;
          }
          return ["radio", "checkbox", "dropdown"].includes(question.type) ? (
            <DragDrop
              key={`${question.id}-${option.id}`}
              pageMode={pageMode}
              mode={"vertical"}
              draggable={!option.isETC}
              isFocused={question.isFocused && !option.isETC}
              onDragStart={(e) => handleDragStart(e, index, optionIndex)}
              onDrop={(e) => handleDrop(e, index, optionIndex)}
              style={
                pageMode === "preview" && question.type === "dropdown"
                  ? { display: "none" }
                  : {}
              }
            >
              <ChoiceInputs
                key={`${question.id}-${option.id}`}
                index={index}
                optionIndex={optionIndex}
                pageMode={pageMode}
                editableMode={pageMode === "survey" ? "edit" : "read"}
                dropdownMode={"edit"}
                type={question.type}
                optionText={option.text}
                isFocused={pageMode === "survey" && question.isFocused}
                hasETC={question.hasETC}
                isETC={option.isETC}
              />
            </DragDrop>
          ) : null;
        })}
        {/* @NOTE: 옵션 섹션 - (Preview Page) 답변 타입이 드롭다운인 경우 */}
        {pageMode === "preview" && question.type === "dropdown" && (
          <SelectBox index={index} type={question.type} pageMode={pageMode} />
        )}
        {/* @NOTE: 옵션 추가 또는 기타 추가 */}
        {pageMode === "survey" &&
          question.isFocused &&
          ["radio", "checkbox", "dropdown"].includes(question.type) && (
            <ChoiceInputs
              index={index}
              editableMode={"read"}
              dropdownMode={"add"}
              type={question.type}
              isFocused={question.isFocused}
              hasETC={question.hasETC}
              pageMode={pageMode}
              optionText={""}
            />
          )}
        {/* @NOTE: 필수 질문 에러 메세지 */}
        {pageMode === "preview" &&
          question.isRequired &&
          !question.isResponseSufficient && <WarningMessage />}
        {/* @NOTE: 도구 섹션 */}
        {pageMode === "survey" && question.isFocused && (
          <Tools index={index} isRequired={question.isRequired} />
        )}
      </BasicForm>
      {/* @NOTE: 플로팅 버튼 */}
      {pageMode === "survey" && question.isFocused && (
        <FloatingButtons index={index} />
      )}
    </DragDrop>
  ));
};

export default FormContainer;
