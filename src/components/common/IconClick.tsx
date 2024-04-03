import styled from "styled-components";

interface IIconClick {
  Icon: React.ElementType;
  areaLabel: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

const IconClick = ({ Icon, areaLabel, onClick, style }: IIconClick) => {
  return (
    <Container
      tabIndex={0}
      aria-label={areaLabel}
      onClick={onClick}
      style={style}
    >
      <Icon />
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default IconClick;
