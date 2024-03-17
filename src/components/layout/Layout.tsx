import styled from "styled-components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;
