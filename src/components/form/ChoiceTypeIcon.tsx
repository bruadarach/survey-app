import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ChoiceTypeIcon = ({
  type,
  index,
  optionIndex,
  dropdownMode,
  hasETC,
}: {
  type: string;
  index?: number;
  optionIndex?: number;
  dropdownMode?: "add" | "edit";
  hasETC: boolean;
}) => {
  const optionListLength = useSelector(
    (state: RootState) => state.question.questions[index || 0].optionList.length
  );

  return (
    <>
      {["radio", "checkbox"].includes(type) ? (
        <input
          type={type}
          style={{ pointerEvents: "none", marginLeft: "7px", opacity: "0.5" }}
        />
      ) : type === "dropdown" ? (
        <span style={{ marginLeft: "10px", fontSize: "15px" }}>
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
