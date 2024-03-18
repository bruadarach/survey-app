import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  addOption,
  addETCOption,
  setOptionContent,
  deleteOption,
} from "../../redux/reducers/questionSlice";
import styled from "styled-components";
import ChoiceTypeIcon from "./ChoiceTypeIcon";
import EditableDiv from "../common/EditableDiv";
import IconWrapper from "../common/IconWrapper";
import { IoClose } from "react-icons/io5";

interface IChoiceInputs {
  index: number;
  optionIndex?: number;
  type: string;
  editableMode: "edit" | "read";
  dropdownMode: "add" | "edit";
  hasETC: boolean;
  optionText?: string;
  isFocused: boolean;
}

const ChoiceInputs = ({
  index,
  optionIndex,
  type,
  editableMode,
  dropdownMode,
  hasETC,
  optionText,
  isFocused,
}: IChoiceInputs) => {
  const dispatch = useDispatch();
  const optionListLength = useSelector(
    (state: RootState) => state.question.questions[index].optionList.length
  );

  const handleAddOption = (index: number) => {
    dispatch(addOption({ index }));
  };

  const handleETCOption = (index: number) => {
    dispatch(addETCOption({ index }));
  };

  const handleOptionContent = (
    e: React.FormEvent<HTMLDivElement>,
    index: number,
    optionIndex: number
  ) => {
    const target = e.target as HTMLDivElement;
    dispatch(
      setOptionContent({
        index: index,
        optionIndex: optionIndex,
        content: target.textContent,
      })
    );
  };

  const handleDeleteOption = (index: number, optionIndex: number) => {
    dispatch(deleteOption({ index: index, optionIndex: optionIndex }));
  };

  return (
    <Choice>
      {/* @NOTE: 옵션 아이콘 */}
      <ChoiceTypeIcon
        type={type}
        optionIndex={optionIndex}
        dropdownMode={dropdownMode}
        hasETC={hasETC}
      />
      <EditableDiv
        contentEditable={
          editableMode === "edit" && isFocused && optionText !== "기타"
        }
        onBlur={(e) => handleOptionContent(e, index, optionIndex!)}
        style={{
          ...(editableMode === "read" || !isFocused
            ? { borderBottom: "none" }
            : {}),
          ...(optionText === "기타"
            ? { borderBottom: "1px dotted lightgray", cursor: "default" }
            : {}),
        }}
      >
        {/* @NOTE: 옵션 텍스트 */}
        <OptionText>
          {dropdownMode === "edit" && <span>{optionText}</span>}
          {dropdownMode === "add" && (
            <AddOption>
              <span onClick={() => handleAddOption(index)}>옵션 추가</span>
              {!hasETC && type !== "dropdown" && (
                <>
                  <span> 또는</span>
                  <span
                    onClick={() => handleETCOption(index)}
                    style={{ color: "#007bff", marginLeft: "2px" }}
                  >
                    '기타' 추가
                  </span>
                </>
              )}
            </AddOption>
          )}
        </OptionText>
      </EditableDiv>
      {/* @NOTE: 옵션 삭제 버튼 */}
      {dropdownMode === "edit" && isFocused && optionListLength > 1 && (
        <IconWrapper
          Icon={IoClose}
          onClick={() => handleDeleteOption(index, optionIndex!)}
          style={{ color: "gray", fontSize: "22px" }}
        />
      )}
    </Choice>
  );
};

export default ChoiceInputs;

const Choice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-left: -6px;
`;

const OptionText = styled.div`
  font-size: 14px;
  padding: 10px 0;
  margin-top: 3px;
`;

const AddOption = styled.div`
  font-size: 14px;
  color: #777;
  cursor: pointer;
`;
