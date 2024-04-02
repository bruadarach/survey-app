import styled from "styled-components";

interface IEditableDiv {
  placeholder?: string;
  contentEditable: boolean;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const EditableDiv = ({
  placeholder,
  contentEditable,
  onBlur,
  style,
  children,
}: IEditableDiv) => {
  return (
    <Div
      role="textbox"
      aria-label={placeholder || "Enter text here"}
      aria-multiline="true"
      tabIndex={0}
      placeholder={placeholder}
      contentEditable={contentEditable}
      suppressContentEditableWarning={true}
      style={style}
      onBlur={onBlur}
    >
      {children}
    </Div>
  );
};

export default EditableDiv;

const Div = styled.div<IEditableDiv>`
  width: 100%;
  font-size: 15px;
  outline: none;
  border-bottom: 1px solid lightgray;
  transition: border-bottom 0.3s ease-in-out;
  cursor: text;

  &:focus {
    border-bottom: 2px solid #673ab7;
  }

  &:empty::before {
    content: ${(props) =>
      props.placeholder ? `"${props.placeholder}"` : "normal"};
    color: #555;
  }
`;
