import styled from "styled-components";

interface IIconWrapper {
  Icon: React.ElementType;
  onClick: () => void;
  style?: React.CSSProperties;
}

const IconWrapper = ({ Icon, onClick, style }: IIconWrapper) => {
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

export default IconWrapper;
