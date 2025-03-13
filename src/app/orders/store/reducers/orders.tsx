import { Order } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = Order[];

// Init
const initialState: State = []

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers:{
        addProductToOrders: (state, action: PayloadAction<Order>) => {
            state.push(action.payload)
        }
    }
})

export const { addProductToOrders } = ordersSlice.actions;

export default ordersSlice.reducer;