import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setSingleChoiceResponse,
  setMultipleChoiceResponse,
} from "../../redux/reducers/questionSlice";

interface IChoiceTypeIcon {
  optionId?: number;
  type: string;
  index?: number;
  optionIndex?: number;
  dropdownMode?: "add" | "edit";
  pageMode: "survey" | "preview" | "submit";
  hasETC: boolean;
  optionText: string;
}

const ChoiceTypeIcon = ({
  optionId,
  type,
  index,
  optionIndex,
  dropdownMode,
  pageMode,
  hasETC,
  optionText,
}: IChoiceTypeIcon) => {
  const dispatch = useDispatch();
  const optionListLength = useSelector(
    (state: RootState) => state.question.questions[index || 0].optionList.length
  );
  const responses = useSelector(
    (state: RootState) => state.question.questions[index || 0].responses
  );
  const isCheckedForRadio = responses.some(
    (response) => response.id === optionId
  );
  const isCheckedForCheckbox = responses.some(
    (response) => response.id === optionId
  );

  const handleChoiceResponse = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type === "radio") {
      dispatch(
        setSingleChoiceResponse({
          index,
          optionId,
          value: e.target.value,
        })
      );
    } else if (type === "checkbox") {
      dispatch(
        setMultipleChoiceResponse({
          index,
          optionId,
          value: e.target.value,
          checked: e.target.checked,
        })
      );
    }
  };

  return (
    <>
      {/* @NOTE: 객관식 질문, 체크박스인 경우 */}
      {["radio", "checkbox"].includes(type) ? (
        <input
          name={type === "radio" ? index?.toString() : `${index}-${optionId}`}
          type={type}
          value={optionText || ""}
          checked={
            pageMode === "preview" || pageMode === "submit"
              ? type === "radio"
                ? isCheckedForRadio
                : isCheckedForCheckbox
              : false
          }
          onChange={
            pageMode === "preview"
              ? (e) => handleChoiceResponse(e, type)
              : undefined
          }
          disabled={pageMode !== "preview"}
          style={{
            pointerEvents: pageMode === "survey" ? "none" : "auto",
            marginLeft: "7px",
            marginBottom: "5px",
            opacity: "0.5",
          }}
        />
      ) : // @NOTE: 드롭다운인 경우
      pageMode === "survey" && type === "dropdown" ? (
        <span
          style={{ marginLeft: "10px", marginBottom: "3px", fontSize: "15px" }}
        >
          {dropdownMode === "edit" && optionIndex !== undefined
            ? optionIndex + 1
            : null}
          {dropdownMode === "add" && hasETC && optionListLength}
          {dropdownMode === "add" && !hasETC && optionListLength + 1}
        </span>
      ) : null}
    </>
  );
};

export default ChoiceTypeIcon;
