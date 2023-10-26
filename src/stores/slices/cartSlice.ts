import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { movieItems } from "./types";


interface CartState {
  movie: movieItems[];
  total: number;
}

const initialState: CartState = {
  movie: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action:PayloadAction<movieItems> ) => {
      state.movie.push(action.payload);
      state.total = state.movie.length
    },
    removeCart: (state, action: PayloadAction<number>) => {
      // Assuming the payload is the index of the item to be removed
      const indexToRemove = action.payload;
      if (indexToRemove >= 0 && indexToRemove < state.movie.length) {
        state.movie.splice(indexToRemove, 1);
        state.total = state.movie.length;
      }
    },
    resetCart: (state) => {
      state.movie = [];
      state.total = 0
    },
  },
});

export const { addToCart, resetCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
