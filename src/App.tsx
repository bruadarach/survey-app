import { Routes, Route } from "react-router-dom";
import SurveyPage from "./pages/SurveyPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SurveyPage pageMode="survey" />} />
      <Route path="/preview" element={<SurveyPage pageMode="preview" />} />
      <Route path="/submit" element={<SurveyPage pageMode="preview" />} />
    </Routes>
  );
};

export default App;
