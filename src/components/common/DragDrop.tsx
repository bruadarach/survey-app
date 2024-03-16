import styled from "styled-components";
import { MdDragIndicator } from "react-icons/md";

interface IDragDrop {
  index?: number;
  mode?: "horizontal" | "vertical";
  isFocused?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const DragDrop = ({
  index,
  mode = "horizontal",
  isFocused,
  style,
  children,
}: IDragDrop) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", index?.toString() || "");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.dataTransfer.getData("text/plain"));
  };

  return (
    <IconWrapper
      draggable
      mode={mode}
      style={style}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isFocused && <Icon mode={mode} />}
      {children}
    </IconWrapper>
  );
};

export default DragDrop;

const Icon = styled(MdDragIndicator)<{ mode: "horizontal" | "vertical" }>`
  color: #bdbdbd;
  font-size: 20px;
  z-index: 5;
  cursor: move;
  visibility: ${({ mode }) => (mode === "horizontal" ? "visible" : "hidden")};
  transform: ${({ mode }) =>
    mode === "horizontal" ? "rotate(90deg)" : "none"};
  position: absolute;
  top: ${({ mode }) => (mode === "vertical" ? "14px" : "0")};
  left: ${({ mode }) => (mode === "vertical" ? "-19px" : "50%")};
`;

const IconWrapper = styled.div<{ mode: "horizontal" | "vertical" }>`
  width: 100%;
  height: 100%;
  position: relative;

  &:hover {
    ${({ mode }) =>
      mode === "vertical" &&
      `
      ${Icon} {
        visibility: visible;
      }
        `}
  }
`;
