import { SearchState } from "@/definition";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: SearchState = {
  input: "",
};

const searchSlice: any = createSlice({
  name: "search",
  initialState,
  reducers: {
    filterCards: (state, action: PayloadAction<string | undefined>) => {
      const input = action.payload;
      state.input = input || "";
    },
  },
});

export const { filterCards } = searchSlice.actions;
export const selectSearchInput = (state: { search: SearchState }) =>
  state.search.input;
export default searchSlice.reducer;
