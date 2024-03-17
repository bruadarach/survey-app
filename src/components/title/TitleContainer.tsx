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

const TitleContainer = () => {
  const dispatch = useDispatch();
  const { isFocused } = useSelector((state: RootState) => state.title);

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
    <BasicForm
      isTitleComponent={true}
      isFocused={isFocused}
      onFocus={handleTitleFocus}
    >
      {/* @NOTE: 설문지 제목 */}
      <EditableDiv
        placeholder="설문지 제목"
        contentEditable={true}
        onBlur={handleTitleInput}
        style={
          isFocused
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
        제목 없는 설문지
      </EditableDiv>
      {/* @NOTE: 설문지 설명 */}
      <EditableDiv
        placeholder="설문지 설명"
        contentEditable={true}
        onBlur={handleDescInput}
        style={
          isFocused
            ? {
                color: "#555",
                paddingBottom: "3px",
              }
            : { color: "#555", paddingBottom: "3px", borderBottom: "none" }
        }
      />
    </BasicForm>
  );
};

export default TitleContainer;
