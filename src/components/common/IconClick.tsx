import styled from "styled-components";

interface IIconClick {
  Icon: React.ElementType;
  onClick: () => void;
  style?: React.CSSProperties;
}

const IconClick = ({ Icon, onClick, style }: IIconClick) => {
  return (
    <Container onClick={onClick} style={style}>
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
