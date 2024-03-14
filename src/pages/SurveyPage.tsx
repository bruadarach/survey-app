import Layout from "../components/layout/Layout";
import TitleContainer from "../components/title/TitleContainer";
import FormContainer from "../components/form/FormContainer";

const SurveyPage = () => {
  /*
  const form = {
    title: "제목 없는 설문지",
    desc: "설문지 설명",
    questions: [
      {
        title: "제목 없는 질문",
        type: "radio",
        optionList: ["옵션1"],
        hasETC: false,
        isRequired: false,
        isFocused: true,
        response: [],
      },
    ],
  };
  */

  const isFocused = true;

  return (
    <Layout>
      <TitleContainer isFocused={isFocused} />
      <FormContainer isFocused={isFocused} />
    </Layout>
  );
};

export default SurveyPage;
