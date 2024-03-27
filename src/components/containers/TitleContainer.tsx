import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setTitle,
  setDesc,
  setIsTitleFocused,
} from "../../redux/reducers/titleSlice";
import { clearAllFocus } from "../../redux/reducers/questionSlice";
import BasicForm from "../common/BasicForm";
import EditableDiv from "../common/EditableDiv";
import FloatingButtons from "../form/FloatingButtons";

interface ITitleContainer {
  pageMode: "survey" | "preview" | "submit";
}

const TitleContainer = ({ pageMode }: ITitleContainer) => {
  const dispatch = useDispatch();
  const { title, desc, isFocused } = useSelector(
    (state: RootState) => state.title
  );

  const handleTitleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    dispatch(setTitle({ title: target.textContent || "" }));
  };

  const handleDescInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    dispatch(setDesc({ desc: target.textContent || "" }));
  };

  const handleTitleFocus = () => {
    dispatch(clearAllFocus());
    dispatch(setIsTitleFocused(true));
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <BasicForm
        pageMode={pageMode}
        isTitleComponent={true}
        isFocused={pageMode === "survey" && isFocused}
        onFocus={handleTitleFocus}
      >
        {/* @NOTE: 설문지 제목 */}
        <EditableDiv
          placeholder="설문지 제목"
          contentEditable={pageMode === "survey"}
          onBlur={handleTitleInput}
          style={
            pageMode === "survey" && isFocused
              ? {
                  fontSize: "32px",
                  fontWeight: "500",
                  paddingBottom: "2px",
                }
              : {
                  fontSize: "32px",
                  fontWeight: "500",
                  paddingBottom: "2px",
                  borderBottom: "none",
                }
          }
        >
          {title}
        </EditableDiv>
        {/* @NOTE: 설문지 설명 */}
        <EditableDiv
          placeholder="설문지 설명"
          contentEditable={pageMode === "survey"}
          onBlur={handleDescInput}
          style={
            pageMode === "survey" && isFocused
              ? {
                  color: "#555",
                  paddingBottom: "3px",
                }
              : { color: "#555", paddingBottom: "3px", borderBottom: "none" }
          }
        >
          {desc}
        </EditableDiv>
        {pageMode === "preview" && (
          <div
            style={{
              fontSize: "14px",
              color: "red",
              borderTop: "1px solid #ddd",
              paddingTop: "13px",
            }}
          >
            * 표시는 필수 질문임
          </div>
        )}
      </BasicForm>
      {pageMode === "survey" && isFocused && <FloatingButtons index={-1} />}
    </div>
  );
};

export default TitleContainer;
