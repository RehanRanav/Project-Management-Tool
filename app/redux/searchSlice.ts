import { TaskObject, Tasklist } from "@/definition";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  matchCradIds: [],
};

const searchSlice: any = createSlice({
  name: "search",
  initialState,
  reducers: {
    filterCards: (state, action: PayloadAction<Tasklist[] | undefined>) => {
        const tasklist = action.payload;
        console.log(tasklist?.map((item:Tasklist)=>{
            return item.cards.map((card:TaskObject)=>{
                return card.id
            })
        }))
    },
  },
});

export const { filterCards } = searchSlice.actions;
export default searchSlice.reducer;