import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products", "Customers", "Transactions", "Geography", "Sales", "Events", "Admins", "Performance", "Dashboard"],
    endpoints: (build) => ({       
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => "client/customers",
            providesTags: ["Customers"],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"],
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography"],
        }),
        getSales: build.query({
            query: () => "sales/sales",
            providesTags: ["Sales"],
        }),
        getAdmins : build.query({
            query: () => "management/admins",
            providesTags: ["Admins"],
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
        }),




        getEvent : build.query({
            query: (id) => ({ 
                url: `management/events/${id}`,
                method: "GET",
                providesTags: ["Events"],
            })
        }),
        postEvent : build.mutation({
            query: ({id, body}) => ({ 
                url: `management/events/${id}`,
                method: "POST",
                //providesTags: ["Events"],
                body, //: eventData, //{"Hello": "hi"},
                // headers: {
                //     'Content-type': 'application/json; charset=UTF-8',
                // }
            })
        }),
        deleteEvent : build.mutation({
            query: ({id, body}) => ({
                url: `management/events/${id}`,
                method: "DELETE",
                //providesTags: ["Events"],
                body,
            })
        }),
        putEvent : build.mutation({
            query: ({id, body}) => ({
                url: `management/events/${id}`,
                method: "PUT",
                //providesTags: ["Events"],
                body,
                // headers: {
                //    'Content-type': 'application/json; charset=UTF-8',
                // }
            })
        })
    }),
});

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetEventQuery,
    usePostEventMutation,
    useDeleteEventMutation,
    usePutEventMutation,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery,
} = api;
