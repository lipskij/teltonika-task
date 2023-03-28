import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: "0",
      name: "Tianna",
      lastName: "Jenkins",
      age: 25,
      email: "test@test.com",
      password: "123123123",
      gender: "female",
      category: "Category 1",
    },
    {
      id: "1",
      name: "Jhon",
      lastName: "Doe",
      age: 31,
      email: "test@test.com",
      password: "123123123",
      gender: "male",
      category: "Category 1",
    },
  ],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: {
      reducer(state, action) {
        state.users.push(action.payload);
      },
      prepare: ({ name, lastName, email, age, password, gender, category }) => {
        return {
          payload: {
            id: nanoid(),
            name,
            lastName,
            email,
            age,
            password,
            gender,
            category,
          },
        };
      },
    },
    // update user with category
    // updateUser: {
    //   reducer(state, action) {
    //     const { id, category } = action.payload;
    //     const existingUser = state.find((user) => user.id === id);
    //     if (existingUser) {
    //       existingUser.category = category;
    //     }
    //   },
    // },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
