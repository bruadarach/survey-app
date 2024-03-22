import Layout from "../components/layout/Layout";
import TitleContainer from "../components/title/TitleContainer";
import FormContainer from "../components/form/FormContainer";
import ButtonsContainer from "../components/buttons/ButtonsContainer";

const SurveyPage = ({ pageMode }: { pageMode: "survey" | "preview" }) => {
  return (
    <Layout>
      <TitleContainer pageMode={pageMode} />
      <FormContainer pageMode={pageMode} />
      <ButtonsContainer pageMode={pageMode} />
    </Layout>
  );
};

export default SurveyPage;
