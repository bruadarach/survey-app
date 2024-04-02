import styled from "styled-components";

interface IToggleButton {
  isRequired: boolean;
  onClick: () => void;
}

const ToggleButton = ({ isRequired, onClick }: IToggleButton) => {
  const themeMode = isRequired ? "light" : "dark";

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick();
    }
  };

  return (
    <Button
      role="checkbox"
      $themeMode={themeMode}
      onClick={onClick}
      aria-checked={isRequired}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      aria-label={isRequired ? "Required" : "Optional"}
    >
      <Circle $themeMode={themeMode} />
    </Button>
  );
};

export default ToggleButton;

const Button = styled.div<{ $themeMode: string }>`
  width: 40px;
  height: 22px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 2px;
  position: relative;
  cursor: pointer;
  background-color: ${(props) =>
    props.$themeMode === "light" ? "#E1D8F1" : "lightgray"};
  justify-content: ${(props) =>
    props.$themeMode === "light" ? "flex-end" : "flex-start"};
  transition: all 0.5s ease;
`;

const Circle = styled.div<{ $themeMode: string }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$themeMode === "light" ? "#673AB7" : "white"};
  transition: background-color 0.5s ease;
`;
