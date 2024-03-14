import styled from "styled-components";
import { MdDragIndicator } from "react-icons/md";

interface IDragDrop {
  index?: number;
  draggable: boolean;
  formRef?: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const DragDrop = ({ index, draggable, style, children }: IDragDrop) => {
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
    <>
      {draggable && (
        <IconWrapper
          draggable={true}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={style}
        >
          <Icon />
          {children}
        </IconWrapper>
      )}
    </>
  );
};

export default DragDrop;

const IconWrapper = styled.div`
  position: relative;
`;

const Icon = styled(MdDragIndicator)`
  transform: rotate(90deg);
  color: #bdbdbd;
  font-size: 20px;
  cursor: move;
  position: absolute;
  top: 0%;
  z-index: 5;
  left: 50%;
`;
