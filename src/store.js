/*eslint-disable*/
import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "neo", age: 20 },
  reducers: {
    changeName(state) {
      state.name = "cute";
    },
    increase(state, action) {
      state.age += action.payload;
    },
  },
});

export let { changeName, increase } = user.actions;

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 1 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      let 번호 = state.findIndex((a) => {
        return a.id === action.payload;
      }); //일치하면 몇번째에 있는지 남겨줌
      state[번호].count++;
    },
    addItem(state, action) {
      state.push(action.payload);
    },
  },
});
export let { addCount, addItem } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
