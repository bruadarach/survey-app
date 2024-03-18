import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addDefaultQuestion,
  clearAllFocus,
} from "../../redux/reducers/questionSlice";
import { setIsTitleFocused } from "../../redux/reducers/titleSlice";
import styled from "styled-components";
import IconWrapper from "../common/IconWrapper";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const FloatingButtons = ({ index }: { index: number }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddQuestion = (index: number) => {
    dispatch(setIsTitleFocused(false));
    dispatch(clearAllFocus());
    dispatch(addDefaultQuestion({ index: index }));
  };

  const navigateToPreview = () => {
    navigate("/preview");
  };

  return (
    <Container>
      <IconWrapper
        Icon={IoMdAddCircleOutline}
        onClick={() => handleAddQuestion(index)}
        style={{ color: "gray", fontSize: "24px" }}
      />
      <IconWrapper
        Icon={MdOutlineRemoveRedEye}
        onClick={navigateToPreview}
        style={{ color: "gray", fontSize: "24px" }}
      />
    </Container>
  );
};

export default FloatingButtons;

const Container = styled.div`
  position: absolute;
  top: 0px;
  right: -55px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  gap: 10px;
  z-index: 9;
`;
