import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setSingleChoiceResponse,
  setMultipleChoiceResponse,
} from "../../redux/reducers/questionSlice";

interface IChoiceTypeIcon {
  type: string;
  index?: number;
  optionIndex?: number;
  dropdownMode?: "add" | "edit";
  pageMode: "survey" | "preview";
  hasETC: boolean;
  optionText: string;
}

const ChoiceTypeIcon = ({
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
  const isCheckedForRadio = type === "radio" && responses.includes(optionText);
  const isCheckedForCheckbox =
    type === "checkbox" &&
    responses.some((response) => response === optionText);

  const handleChoiceResponse = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    console.log("handleChoiceResponse with RADIO", e.target.value);
    if (type === "radio") {
      dispatch(
        setSingleChoiceResponse({
          index,
          value: e.target.value,
        })
      );
    } else if (type === "checkbox") {
      dispatch(
        setMultipleChoiceResponse({
          index,
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
          name={optionIndex?.toString()}
          type={type}
          value={optionText || ""}
          checked={
            pageMode === "preview"
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
          disabled={pageMode === "survey"}
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
