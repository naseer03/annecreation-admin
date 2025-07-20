import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
        prepareHeaders: (headers, { getState, endpoint, type, forced, extra, arg }) => {
            if (typeof window !== 'undefined') {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    headers.set('authorization', `Bearer ${accessToken}`);
                }
            }

            const isFormData = typeof arg !== 'string' && arg?.body instanceof FormData;
            if (isFormData) {
                console.log('FormData detected, not setting Content-Type header');

                if (headers.has('Content-Type')) {
                    headers.delete('Content-Type');
                }
            } else {
                headers.set('Content-Type', 'application/json');
            }

            return headers;
        },
    }),
    tagTypes: [
        'Auth',
        'Products',
        'Categories',
        'Orders',
        'Customers',
        'Users',
        'Analytics',
        'Marketing',
        'Settings',
        'Dashboard'
    ],
    endpoints: () => ({}),
});

export const isErrorWithMessage = (
    error: unknown
): error is { data: { message: string } } => {
    return (
        typeof error === 'object' &&
        error != null &&
        'data' in error &&
        typeof (error as any).data === 'object' &&
        'message' in (error as any).data
    );
};

export const getErrorMessage = (error: FetchBaseQueryError | undefined): string => {
    if (!error) return 'An unknown error occurred';

    if (isErrorWithMessage(error)) {
        return error.data.message;
    }

    return 'Failed to process your request. Please try again.';
}; 