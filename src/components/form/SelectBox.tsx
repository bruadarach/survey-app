import { useDispatch } from "react-redux";
import { setQuestionType } from "../../redux/reducers/questionSlice";
import styled from "styled-components";

const SelectBox = ({ index, type }: { index: number; type: string }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <select
        value={type}
        onChange={(e) => {
          dispatch(setQuestionType({ index, type: e.target.value }));
        }}
      >
        <option value="textShort">단답형</option>
        <option value="textLong">장문형</option>
        <option value="radio">객관식 질문</option>
        <option value="checkbox">체크박스</option>
        <option value="dropdown">드롭다운</option>
      </select>
    </Container>
  );
};

export default SelectBox;

const Container = styled.div`
  width: 100%;
  position: relative;

  select {
    width: 100%;
    padding: 15px;
    font-size: 15px;
    border: 1px solid lightgray;
    border-radius: 5px;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
  }

  &::after {
    content: "";
    position: absolute;
    right: 16px;
    top: 50%;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #333;
    transform: translateY(-50%);
  }
`;
