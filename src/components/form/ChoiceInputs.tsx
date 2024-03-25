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
  pageMode: "survey" | "preview";
  editableMode: "edit" | "read";
  dropdownMode: "add" | "edit";
  hasETC: boolean;
  isETC?: boolean;
  optionText: string;
  isFocused: boolean;
}

const ChoiceInputs = ({
  index,
  optionIndex,
  type,
  pageMode,
  editableMode,
  dropdownMode,
  hasETC,
  isETC,
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
        index={index}
        optionIndex={optionIndex}
        dropdownMode={dropdownMode}
        pageMode={pageMode}
        hasETC={hasETC}
        optionText={optionText}
      />
      <EditableDiv
        contentEditable={editableMode === "edit" && isFocused && !isETC}
        onBlur={(e) => handleOptionContent(e, index, optionIndex!)}
        style={{
          ...(editableMode === "read" || !isFocused
            ? { borderBottom: "none" }
            : {}),
          ...(isETC && isFocused
            ? { borderBottom: "1px dotted lightgray", cursor: "default" }
            : {}),
          ...(pageMode === "preview" && type === "dropdown"
            ? { display: "none", paddingTop: "0px" }
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
      {dropdownMode === "edit" &&
        isFocused &&
        !(
          (optionListLength === 1 && !hasETC) ||
          (optionListLength === 2 && hasETC && !isETC)
        ) && (
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
`;

const AddOption = styled.div`
  font-size: 14px;
  color: #777;
  cursor: pointer;
`;
