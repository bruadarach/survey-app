import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setTextResponse } from "../../redux/reducers/questionSlice";
import EditableDiv from "../common/EditableDiv";

interface ITextInputs {
  index: number;
  pageMode: "survey" | "preview" | "submit";
  type: string;
  isFocused: boolean;
}

const TextInputs = ({ index, pageMode, type, isFocused }: ITextInputs) => {
  const dispatch = useDispatch();
  const textResponse = useSelector(
    (state: RootState) => state.question.questions[index].responses[0] || ""
  );

  const handleTextResponse = (e: React.FocusEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    dispatch(
      setTextResponse({
        index: index,
        text: target.textContent || "",
      })
    );
  };

  return (
    <>
      <EditableDiv
        placeholder={type === "textShort" ? "단답형 텍스트" : "장문형 텍스트"}
        contentEditable={
          pageMode === "survey" || pageMode === "submit" ? false : true
        }
        onBlur={pageMode === "preview" ? handleTextResponse : undefined}
        style={{
          ...(pageMode === "survey" && {
            color: "#555",
            fontSize: "14px",
            borderBottom: "1px dotted #999",
            padding: "10px 0 5px 2px",
            width: type === "textShort" ? "50%" : "85%",
          }),
          ...(pageMode === "preview"
            ? isFocused
              ? {
                  fontSize: "14px",
                  marginTop: "15px",
                  width: type === "textShort" ? "50%" : "100%",
                }
              : {
                  fontSize: "14px",
                  marginTop: "15px",
                  borderBottom: "1px solid lightgray",
                  width: type === "textShort" ? "50%" : "100%",
                }
            : {}),
          ...(pageMode === "submit" && {
            borderBottom: "1px solid lightgray",
          }),
        }}
      >
        {(pageMode === "preview" || pageMode === "submit") && textResponse.text}
      </EditableDiv>
    </>
  );
};

export default TextInputs;
