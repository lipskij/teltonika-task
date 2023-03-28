import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      id: "1",
      categoryName: "Category 1",
      subCategories: [
        {
          name: "Sub-category1",
          subsubCategory: [
            {
              subName: "sub-1",
              users: ["0", "1"],
            },
            {
              subName: "sub-2",
              users: ["1"],
            },
          ],
        },
      ],
    },
  ],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: {
      reducer: (state, action) => {
        console.log(action.payload)
        state.categories.push(action.payload);
      },
      prepare: ({ categoryName, subCategories }) => ({
        payload: {
          id: nanoid(),
          categoryName,
          subCategories,
        },
      }),
    },
  },
});

export const { addCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
