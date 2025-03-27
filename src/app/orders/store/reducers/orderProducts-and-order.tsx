import { Order, OrderProduct, Prisma } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OrderProductWithProduct = Prisma.OrderProductGetPayload<{
    include: { product: true };
}>;

type StateOrder = Order & { orderProduct: OrderProductWithProduct[] };

type CreateOrderPayload = {
    order: Omit<Order, "id" | "createdAt" | "updatedAt" | "orderProducts">;
    orderProduct: Omit<OrderProductWithProduct, "id" | "orderId" | "createdAt" | "updatedAt">;
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
    orderProduct: []
}

// const initialOrderProductState: StateOrderProduct = [];

const orderSlice = createSlice({
    name: "order",
    initialState: initialOrderState,
    reducers: {
        setOrder: (state, action: PayloadAction<StateOrder>) => {
            return { ...action.payload };
        },

        // Cria um novo pedido com o produto
        createOrderWithProduct: (state, action: PayloadAction<CreateOrderPayload>) => {
            state.status = action.payload.order.status;
            state.total = action.payload.order.total;
            state.consumptionMethod = action.payload.order.consumptionMethod;
            state.restaurantId = action.payload.order.restaurantId;
            state.createdAt = new Date();
            state.updatedAt = new Date();
            state.orderProduct.push(
                {
                    productId: action.payload.orderProduct.productId,
                    quantity: action.payload.orderProduct.quantity,
                    price: action.payload.orderProduct.price,
                    id: "", // ID temporário (será preenchido no banco depois)
                    orderId: 0, // Temporário (será preenchido no banco depois)
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    product: action.payload.orderProduct.product
                },
            )
        },

        // Adiciona um produto ao pedido no estado
        addProductToOrder: (state, action: PayloadAction<OrderProductWithProduct>) => {
            state.orderProduct.push(action.payload);
            state.total = (state.total || 0) + action.payload.price * action.payload.quantity;
        },
    }

})

export const { setOrder, addProductToOrder, createOrderWithProduct } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
