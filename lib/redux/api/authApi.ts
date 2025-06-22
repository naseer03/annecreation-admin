import { baseApi } from './baseApi';
import { updateSession } from '@/lib/auth';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    password: string;
    confirmPassword: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface AuthResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
    admin: {
        id: number;
        username: string;
        name: string;
        isAdmin: boolean;
    };
}

export interface TokenResponse {
    accessToken: string;
    refreshToken?: string;
}

export interface MessageResponse {
    message: string;
    success: boolean;
}

// Create auth API endpoints
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Login endpoint
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/api/admin/login',
                method: 'POST',
                body: credentials,
                credentials: 'include',
            }),
            // Handle success by storing tokens
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    // Use updateSession to store tokens and user data
                    if (data.accessToken && data.admin) {
                        updateSession(data.accessToken, data.refreshToken, data.admin);
                    }
                } catch (error) {
                    console.error('Login failed:', error);
                }
            },
            invalidatesTags: ['Auth'],
        }),

        // Register endpoint
        // register: builder.mutation<AuthResponse, RegisterRequest>({
        //     query: (userData) => ({
        //         url: '/api/register',
        //         method: 'POST',
        //         body: userData,
        //         credentials: 'include',
        //     }),
        //     invalidatesTags: ['Auth'],
        // }),

        // Forgot password endpoint
        forgotPassword: builder.mutation<MessageResponse, ForgotPasswordRequest>({
            query: (data) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: data,
            }),
        }),

        // Reset password endpoint
        resetPassword: builder.mutation<MessageResponse, ResetPasswordRequest>({
            query: (data) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: data,
            }),
        }),

        // Refresh token endpoint
        refreshToken: builder.mutation<TokenResponse, void>({
            query: () => {
                // Get the refresh token from localStorage
                const refreshToken = localStorage.getItem('refreshToken');

                return {
                    url: '/api/admin/refresh-token',
                    method: 'POST',
                    body: { refreshToken },
                    credentials: 'include',
                };
            },
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    if (data.accessToken) {
                        updateSession(data.accessToken, data.refreshToken);
                    }
                } catch (error) {
                    console.error('Token refresh failed:', error);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('user');
                    if (typeof window !== 'undefined') {
                        window.location.href = '/';
                    }
                }
            },
        }),

        // Logout endpoint
        logout: builder.mutation<MessageResponse, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                credentials: 'include',
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('user');
                } catch (error) {
                    console.error('Logout failed:', error);
                }
            },
            invalidatesTags: ['Auth'],
        }),

        // Get current user profile
        getCurrentUser: builder.query<AuthResponse['admin'], void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
    }),
});

// Export the generated hooks
export const {
    useLoginMutation,
    // useRegisterMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useRefreshTokenMutation,
    useLogoutMutation,
    useGetCurrentUserQuery,
} = authApi;
