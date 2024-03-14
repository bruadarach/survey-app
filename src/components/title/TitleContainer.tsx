import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setDesc,
  setIsTitleFocused,
  setTitle,
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
      draggable={false}
      isFocused={isFocused}
      onFocus={handleTitleFocus}
      style={{ position: "relative" }}
    >
      <EditableDiv
        contentEditable={true}
        placeholder="설문지 제목"
        style={{ fontSize: "32px", fontWeight: "500" }}
        onBlur={handleTitleInput}
      >
        제목 없는 설문지
      </EditableDiv>
      <EditableDiv
        contentEditable={true}
        placeholder="설문지 설명"
        style={{ color: "#555" }}
        onBlur={handleDescInput}
      />
    </BasicForm>
  );
};

export default TitleContainer;
