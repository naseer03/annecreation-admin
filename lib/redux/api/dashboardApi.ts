export interface RecentOrdersResponse {
  count: number;
  orders: Array<{
    order_id: number;
    customer: {
      name: string;
      email: string;
      telephone: string;
    };
    total: number;
    date_added: string;
    status_id: number;
    payment_method: string;
    shipping_method: string;
    products: Array<{
      product_id: number;
      name: string;
      model: string;
      quantity: number;
      price: number;
      total: number;
    }>;
  }>;
}
    
 import { baseApi } from './baseApi';

export interface SalesResponse {
  total_revenue: number;
  period: string;
  start_date: string;
  end_date: string;
}

export interface NewOrdersResponse {
  total_orders: number;
  period: string;
  start_date: string;
  end_date: string;
}

export interface NewCustomersResponse {
  period: string;
  start_date: string;
  end_date: string;
  total_new_customers: number;
  customers: Array<{
    customer_id: number;
    name: string;
    email: string;
    date_added: string;
  }>;
}

export interface OnlineCustomersResponse {
  total_online_customers: number;
  customers: Array<{
    customer_id: number;
    name: string;
    email: string;
    last_active: string;
  }>;
}

export interface YearlyRevenueResponse {
  year: number;
  total_revenue: number;
  total_orders: number;
  monthly_data: Array<{
    month: number;
    month_name: string;
    revenue: number;
    order_count: number;
  }>;
}

export interface TopProductsResponse {
  period: string;
  start_date: string;
  end_date: string;
  top_products: Array<{
    product_id: number;
    name: string;
    model: string;
    image: string;
    quantity_sold: number;
    total_sales: number;
  }>;
}
   
 
    


export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query<SalesResponse, { days: number }>({
      query: ({ days }) => ({
        url: `/api/dashboard/sales?days=${days}`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
    getNewOrders: builder.query<NewOrdersResponse, { days: number }>({
      query: ({ days }) => ({
        url: `/api/dashboard/orders/new?days=${days}`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
    getNewCustomers: builder.query<NewCustomersResponse, void>({
      query: () => ({
        url: `/api/dashboard/customers/new`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
    getOnlineCustomers: builder.query<OnlineCustomersResponse, void>({
      query: () => ({
        url: `/api/dashboard/customers/online`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
    getYearlyRevenue: builder.query<YearlyRevenueResponse, { year: number }>({
      query: ({ year }) => ({
        url: `/api/dashboard/revenue/yearly?year=${year}`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
    getTopProducts: builder.query<TopProductsResponse, { days: number; limit: number }>({
      query: ({ days, limit }) => ({
        url: `/api/dashboard/products/top?days=${days}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
    getRecentOrders: builder.query<RecentOrdersResponse, { limit: number }>({
      query: ({ limit }) => ({
        url: `/api/dashboard/orders/recent?limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetSalesQuery, useGetNewOrdersQuery, useGetNewCustomersQuery, useGetOnlineCustomersQuery, useGetYearlyRevenueQuery, useGetTopProductsQuery, useGetRecentOrdersQuery } = dashboardApi;

