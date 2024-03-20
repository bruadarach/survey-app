import { createSlice } from "@reduxjs/toolkit";

interface Option {
  id: number;
  text: string;
  isETC?: boolean;
}

interface Question {
  id: number;
  title: string;
  type: string;
  optionList: Option[];
  hasETC: boolean;
  isRequired: boolean;
  isFocused: boolean;
  responses: string[];
}

interface DragInfo {
  questionDragIndex: number | undefined;
  optionDragIndex?: number | undefined;
}

interface IQuestionListProps {
  questions: Question[];
  dragInfo?: DragInfo;
}

export const initialState: IQuestionListProps = {
  questions: [
    {
      id: Date.now(),
      title: "제목없는 질문",
      type: "radio",
      optionList: [{ id: Date.now(), text: "옵션 1", isETC: false }],
      hasETC: false,
      isRequired: false,
      isFocused: true,
      responses: [],
    },
  ],
  dragInfo: {
    questionDragIndex: undefined,
    optionDragIndex: undefined,
  },
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addDefaultQuestion(state, action) {
      const { index } = action.payload;
      const defaultQuestion: Question = {
        id: Date.now(),
        title: "제목없는 질문",
        type: "radio",
        optionList: [
          {
            id: Date.now(),
            text: "옵션 1",
            isETC: false,
          },
        ],
        hasETC: false,
        isRequired: false,
        isFocused: true,
        responses: [],
      };
      state.questions.splice(index + 1, 0, defaultQuestion);
    },
    copyQuestion(state, action) {
      const { index } = action.payload;
      const duplicatedQuestion: Question = {
        ...state.questions[index],
        id: Date.now(),
        isFocused: true,
        responses: [],
      };
      state.questions.splice(index + 1, 0, duplicatedQuestion);
    },
    deleteQuestion(state, action) {
      const { index } = action.payload;
      state.questions.splice(index, 1);
    },
    toggleRequired(state, action) {
      const { index } = action.payload;
      state.questions[index].isRequired = !state.questions[index].isRequired;
    },
    setIsQuestionFocused(state, action) {
      const { index, focused } = action.payload;
      state.questions[index].isFocused = focused;
    },
    clearAllFocus(state) {
      state.questions.forEach((question) => {
        question.isFocused = false;
      });
    },
    setQuestionTitle(state, action) {
      const { index, title } = action.payload;
      state.questions[index].title = title;
    },
    setQuestionType(state, action) {
      const { index, type } = action.payload;
      state.questions[index].type = type;
      if (type === "textShort" || type === "textLong") {
        state.questions[index].optionList = [
          { id: Date.now(), text: "옵션 1" },
        ];
      }
    },
    addOption(state, action) {
      const { index } = action.payload;
      const question = state.questions[index];
      let insertIndex = question.optionList.length;
      if (question.hasETC) {
        insertIndex -= 1;
      }
      const newOption = {
        id: Date.now(),
        text: `옵션 ${insertIndex + 1}`,
        isETC: false,
      };
      question.optionList.splice(insertIndex, 0, newOption);
    },
    addETCOption(state, action) {
      const { index } = action.payload;
      const question = state.questions[index];
      if (!question.hasETC) {
        question.optionList.push({
          id: Date.now(),
          text: "기타",
          isETC: true,
        });
        question.hasETC = true;
      }
    },
    deleteOption(state, action) {
      const { index, optionIndex } = action.payload;
      const isETCOption = state.questions[index].optionList[optionIndex].isETC;
      state.questions[index].optionList.splice(optionIndex, 1);
      if (isETCOption) state.questions[index].hasETC = false;
    },
    setOptionContent(state, action) {
      const { index, optionIndex, content } = action.payload;
      if (
        state.questions[index] &&
        state.questions[index].optionList[optionIndex]
      ) {
        state.questions[index].optionList[optionIndex].text = content;
      }
    },
    setTextResponse(state, action) {
      const { index, text } = action.payload;
      state.questions[index].responses[0] = text;
    },
    setSingleChoiceResponse(state, action) {
      const { index, value } = action.payload;
      state.questions[index].responses[0] = value;
    },
    setMultipleChoiceResponse(state, action) {
      const { index, value, checked } = action.payload;
      if (checked) {
        state.questions[index].responses.push(value);
      } else
        state.questions[index].responses = state.questions[
          index
        ].responses.splice(state.questions[index].responses.indexOf(value), 1);
    },
    setDragIndex(state, action) {
      const { questionDragIndex, optionDragIndex } = action.payload;
      state.dragInfo = { questionDragIndex, optionDragIndex };
    },
    setDND(state, action) {
      const { questionDropIndex, optionDropIndex } = action.payload;
      // @NOTE: 질문폼 드래그 앤 드롭
      if (state.dragInfo && state.dragInfo.questionDragIndex !== undefined) {
        const questionDragIndex = state.dragInfo.questionDragIndex;
        if (optionDropIndex === undefined) {
          const item = state.questions[questionDragIndex];
          state.questions.splice(questionDragIndex, 1);
          state.questions.splice(questionDropIndex, 0, item);
        }
        // @NOTE: 옵션폼 드래그 앤 드롭
        if (
          state.dragInfo.optionDragIndex !== undefined &&
          !state.questions[questionDragIndex].optionList[optionDropIndex].isETC
        ) {
          const optionDragIndex = state.dragInfo.optionDragIndex;
          const item =
            state.questions[questionDragIndex].optionList[optionDragIndex];
          state.questions[questionDragIndex].optionList.splice(
            optionDragIndex,
            1
          );
          state.questions[questionDropIndex].optionList.splice(
            optionDropIndex,
            0,
            item
          );
        }
      }
    },
  },
});

export const {
  addDefaultQuestion,
  copyQuestion,
  deleteQuestion,
  toggleRequired,
  setIsQuestionFocused,
  clearAllFocus,
  setQuestionTitle,
  setQuestionType,
  addOption,
  addETCOption,
  deleteOption,
  setOptionContent,
  setTextResponse,
  setSingleChoiceResponse,
  setMultipleChoiceResponse,
  setDragIndex,
  setDND,
} = questionSlice.actions;

export default questionSlice.reducer;
