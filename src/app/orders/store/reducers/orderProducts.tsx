import { Order,OrderProduct } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type StateOrder = Order & {orderProducts:OrderProduct[]};
type StateOrderProduct = OrderProduct[];


// Init
const initialOrderState: StateOrder = {
    id: 0,
    total:0,
    status:"PENDING",
    consumptionMethod:"",
    restaurantId:"",
    createdAt: new Date(),
    updatedAt: new Date(),
    orderProducts: []
}

const initialOrderProductState : StateOrderProduct = [];

const orderSlice = createSlice({
    name: "order",
    initialState: initialOrderState,
    reducers:{
        setOrder: (state, action: PayloadAction<Order>) => {
            return { ...action.payload, orderProducts: [] };
        },
    }

})
const orderProductSlice = createSlice({
    name: "orderProduct",
    initialState: initialOrderProductState,
    reducers:{
        addProductToOrderProduct: (state, action: PayloadAction<OrderProduct>) => {
            state.push(action.payload)
            // Add ao backend
            
        }
    }
})


// Enviar payload que foi adicionado para o banco de dados

export const { setOrder } = orderSlice.actions;
export const { addProductToOrderProduct } = orderProductSlice.actions;

export const orderProductReducer = orderProductSlice.reducer;
export const orderReducer = orderSlice.reducer; 