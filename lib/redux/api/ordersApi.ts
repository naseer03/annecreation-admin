import { baseApi } from './baseApi';

// Order product interface
export interface OrderProduct {
    product_id: number;
    name: string;
    model: string;
    quantity: number;
    price: number;
    total: number;
}

// Customer interface
export interface OrderCustomer {
    name: string;
    email: string;
    telephone: string;
}

// Order interface
export interface Order {
    order_id: number;
    customer: OrderCustomer;
    total: number;
    date_added: string;
    status_id: number;
    payment_method: string;
    shipping_method: string;
    products: OrderProduct[];
}

// Orders list response
export interface OrdersListResponse {
    count: number;
    orders: Order[];
}

export const ordersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecentOrders: builder.query<OrdersListResponse, { limit?: number }>({
            query: ({ limit = 100 }) => ({
                url: '/api/dashboard/orders/recent',
                method: 'GET',
                params: { limit },
                credentials: 'include',
            }),
            providesTags: [{ type: 'Orders', id: 'LIST' }],
        }),
    }),
});

export const { useGetRecentOrdersQuery } = ordersApi;
