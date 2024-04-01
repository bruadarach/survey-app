import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setQuestionType,
  setSingleChoiceResponse,
} from "../../redux/reducers/questionSlice";
import styled from "styled-components";

interface ISelectBox {
  index: number;
  type?: string;
  pageMode: "survey" | "preview" | "submit";
}

const SelectBox = ({ index, type, pageMode }: ISelectBox) => {
  const dispatch = useDispatch();
  const { optionList, responses } = useSelector(
    (state: RootState) => state.question.questions[index || 0]
  );
  const isResponseEmpty = responses.length === 0;

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setQuestionType({ index, type: e.target.value }));
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [optionId, optionValue] = e.target.value.split("-");
    dispatch(
      setSingleChoiceResponse({
        index,
        optionId: parseInt(optionId, 10),
        value: optionValue,
      })
    );
  };

  return (
    <Container $pageMode={pageMode}>
      {/* @NOTE: Survey Page인 경우 */}
      {pageMode === "survey" ? (
        <select value={type} onChange={handleTypeChange}>
          <option value="textShort">단답형</option>
          <option value="textLong">장문형</option>
          <option value="radio">객관식 질문</option>
          <option value="checkbox">체크박스</option>
          <option value="dropdown">드롭다운</option>
        </select>
      ) : null}
      {/* @NOTE: Preview Page 또는 Submit Page인 경우 */}
      {(pageMode === "preview" || pageMode === "submit") &&
        type === "dropdown" && (
          <select
            onChange={
              pageMode === "preview" ? handleSelectionChange : undefined
            }
            value={
              isResponseEmpty ? "" : `${responses[0].id}-${responses[0].text}`
            }
            disabled={pageMode === "submit"}
          >
            <option value="" disabled>
              선택
            </option>
            {optionList.map(
              (option) =>
                !option.isETC && (
                  <option key={option.id} value={`${option.id}-${option.text}`}>
                    {option.text}
                  </option>
                )
            )}
          </select>
        )}
    </Container>
  );
};

export default SelectBox;

const Container = styled.div<{ $pageMode: "survey" | "preview" | "submit" }>`
  width: ${({ $pageMode }) => ($pageMode === "survey" ? "100%" : "30%")};
  margin-top: ${({ $pageMode }) => ($pageMode === "survey" ? "0px" : "6px")};
  position: relative;

  select {
    width: 100%;
    padding: 15px;
    font-size: ${({ $pageMode }) => ($pageMode === "survey" ? "15px" : "14px")};
    border: 1px solid lightgray;
    border-radius: 5px;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
  }

  &::after {
    content: "";
    position: absolute;
    right: 16px;
    top: 50%;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #333;
    transform: translateY(-50%);
  }
`;
