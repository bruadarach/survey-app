import styled from "styled-components";
import { MdDragIndicator } from "react-icons/md";

interface IDragDrop {
  pageMode: "survey" | "preview";
  mode?: "horizontal" | "vertical";
  draggable?: boolean;
  isFocused?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const DragDrop = ({
  pageMode,
  mode = "horizontal",
  draggable = true,
  isFocused,
  onDragStart,
  onDrop,
  style,
  children,
}: IDragDrop) => {
  return (
    <IconWrapper
      draggable={pageMode === "survey" && draggable}
      $mode={mode}
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      style={style}
    >
      {pageMode === "survey" && isFocused && <Icon $mode={mode} />}
      {children}
    </IconWrapper>
  );
};

export default DragDrop;

const Icon = styled(MdDragIndicator)<{ $mode: "horizontal" | "vertical" }>`
  color: #bdbdbd;
  font-size: 23px;
  z-index: 5;
  cursor: move;
  visibility: ${({ $mode }) => ($mode === "horizontal" ? "visible" : "hidden")};
  transform: ${({ $mode }) =>
    $mode === "horizontal" ? "rotate(90deg)" : "none"};
  position: absolute;
  top: ${({ $mode }) => ($mode === "vertical" ? "8px" : "0")};
  left: ${({ $mode }) => ($mode === "vertical" ? "-19px" : "50%")};
`;

const IconWrapper = styled.div<{ $mode: "horizontal" | "vertical" }>`
  width: 100%;
  height: 100%;
  position: relative;

  &:hover {
    ${({ $mode }) =>
      $mode === "vertical" &&
      `
      ${Icon} {
        visibility: visible;
      }
        `}
  }
`;
