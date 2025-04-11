import { Order, Prisma } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OrderProductWithProduct = Prisma.OrderProductGetPayload<{
    include: { product: true };
}>;

type StateOrder = Order & { orderProducts: OrderProductWithProduct[] };

type CreateOrderPayload = {
    order: Omit<Order, "id" | "createdAt" | "updatedAt" | "orderProducts">;
    orderProducts: Omit<OrderProductWithProduct, "id" | "orderId" | "createdAt" | "updatedAt">;
};


// Init
const initialOrderState: StateOrder = {
    id: 0,
    total: 0,
    status: "PENDING",
    consumptionMethod: "",
    restaurantId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    orderProducts: []
}

// const initialOrderProductState: StateOrderProduct = [];

const orderSlice = createSlice({
    name: "order",
    initialState: initialOrderState,
    reducers: {
        setOrder: (state, action: PayloadAction<StateOrder>) => {
            return { ...action.payload };
        },

        resetOrder:()=> {
            return initialOrderState;
        },

        // Cria um novo pedido com o produto
        createOrderWithProduct: (state, action: PayloadAction<CreateOrderPayload>) => {
            state.status = action.payload.order.status;
            state.total = action.payload.order.total;
            state.consumptionMethod = action.payload.order.consumptionMethod;
            state.restaurantId = action.payload.order.restaurantId;
            state.createdAt = new Date();
            state.updatedAt = new Date();
            state.orderProducts.push(
                {
                    productId: action.payload.orderProducts.productId,
                    quantity: action.payload.orderProducts.quantity,
                    price: action.payload.orderProducts.price,
                    id: "", // ID temporário (será preenchido no banco depois)
                    orderId: 0, // Temporário (será preenchido no banco depois)
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    product: action.payload.orderProducts.product
                },
            )
        },

        // Adiciona um produto ao pedido no estado
        addProductToOrder: (state, action: PayloadAction<OrderProductWithProduct>) => {
            state.orderProducts.push(action.payload);
            state.total = (state.total || 0) + action.payload.price * action.payload.quantity;
        },
    }

})

export const { setOrder, addProductToOrder, createOrderWithProduct, resetOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
