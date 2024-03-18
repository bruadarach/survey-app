import styled from "styled-components";

interface IBasicForm {
  isTitleComponent: boolean;
  isFocused?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onFocus: (e: React.FocusEvent) => void;
}

const BasicForm = ({
  isTitleComponent = false,
  isFocused = false,
  onFocus,
  style,
  children,
}: IBasicForm) => {
  return (
    <>
      <Form tabIndex={0} onFocus={onFocus} style={style}>
        <HeaderBar $isTitleComponent={isTitleComponent} />
        <SideBar $isTitleComponent={isTitleComponent} $isFocused={isFocused} />
        <Contents>{children}</Contents>
      </Form>
    </>
  );
};

export default BasicForm;

const Form = styled.section`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 7px;
  overflow: hidden;
  z-index: 1;
  position: relative;

  & > div:last-child {
    padding: 1.5rem;
  }

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const HeaderBar = styled.div<{ $isTitleComponent: boolean }>`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 10px;
  background-color: ${({ $isTitleComponent }) =>
    $isTitleComponent ? "#673ab7" : "transparent"};
`;

const SideBar = styled.div<{
  $isTitleComponent: boolean;
  $isFocused: boolean;
}>`
  position: absolute;
  top: ${({ $isTitleComponent }) => ($isTitleComponent ? "10px" : "0")};
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 6px;
  background-color: ${({ $isFocused }) =>
    $isFocused ? "#2196f3" : "transparent"};
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
