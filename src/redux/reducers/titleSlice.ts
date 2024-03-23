import { createSlice } from "@reduxjs/toolkit";

interface ITitleProps {
  title: string;
  desc: string;
  isFocused: boolean;
}

const initialState: ITitleProps = {
  title: "제목 없는 설문지",
  desc: "설문지 설명",
  isFocused: false,
};

export const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      const { title } = action.payload;
      state.title = title;
    },
    setDesc: (state, action) => {
      const { desc } = action.payload;
      state.desc = desc;
    },
    setIsTitleFocused(state, action) {
      state.isFocused = action.payload;
    },
  },
});

export const { setTitle, setDesc, setIsTitleFocused } = titleSlice.actions;

export default titleSlice.reducer;
