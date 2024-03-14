import styled from "styled-components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  max-width: 768px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
