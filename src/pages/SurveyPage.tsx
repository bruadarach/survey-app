import Layout from "../components/layout/Layout";
import TitleContainer from "../components/containers/TitleContainer";
import FormContainer from "../components/containers/FormContainer";
import ButtonsContainer from "../components/containers/ButtonsContainer";

const SurveyPage = ({
  pageMode,
}: {
  pageMode: "survey" | "preview" | "submit";
}) => {
  return (
    <Layout>
      <TitleContainer pageMode={pageMode} />
      <FormContainer pageMode={pageMode} />
      {pageMode === "preview" && <ButtonsContainer pageMode={pageMode} />}
    </Layout>
  );
};

export default SurveyPage;
