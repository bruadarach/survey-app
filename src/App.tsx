import { Routes, Route } from "react-router-dom";
import SurveyPage from "./pages/SurveyPage";
import PreviewPage from "./pages/PreviewPage";
import SubmitPage from "./pages/SubmitPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SurveyPage />} />
      <Route path="/preview" element={<PreviewPage />} />
      <Route path="/submit" element={<SubmitPage />} />
    </Routes>
  );
};

export default App;
