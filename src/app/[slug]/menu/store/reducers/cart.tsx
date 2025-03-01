import { OrderProduct } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = OrderProduct[];

// Init
const initialState: State = []

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addProductToCart: (state, action: PayloadAction<OrderProduct>) => {
            state.push(action.payload)
        }
    }
})

export const { addProductToCart } = cartSlice.actions;

export default cartSlice.reducer;