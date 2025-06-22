import { baseApi } from './baseApi';

// Define category interfaces
export interface Category {
    id: number;
    parent_id: number;
    image?: string;
    top: boolean;
    column: number;
    sort_order: number;
    status: boolean;
    descriptions?: CategoryDescription[];
}

export interface CategoryDescription {
    language_id: number;
    name: string;
    description?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keyword?: string;
}

export interface CategoryCreateRequest {
    parent_id: number;
    image?: string;
    top: boolean;
    column: number;
    sort_order: number;
    status: boolean;
    descriptions: CategoryDescription[];
}

// Create category API endpoints
export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all categories
        getCategories: builder.query<Category[], { include_inactive?: boolean }>({
            query: (params) => ({
                url: '/api/categories',
                method: 'GET',
                params,
                credentials: 'include',
            }),
            providesTags: [{ type: 'Categories', id: 'LIST' }],
        }),

        // Get category tree
        getCategoryTree: builder.query<Category[], { max_depth?: number, include_counts?: boolean }>({
            query: (params) => ({
                url: '/api/categories/tree',
                method: 'GET',
                params,
                credentials: 'include',
            }),
            providesTags: [{ type: 'Categories', id: 'TREE' }],
        }),

        // Get top categories
        getTopCategories: builder.query<Category[], { limit?: number }>({
            query: (params) => ({
                url: '/api/categories/top',
                method: 'GET',
                params,
                credentials: 'include',
            }),
            providesTags: [{ type: 'Categories', id: 'TOP' }],
        }),

        // Search categories
        searchCategories: builder.query<Category[], { q: string, limit?: number }>({
            query: (params) => ({
                url: '/api/categories/search',
                method: 'GET',
                params,
                credentials: 'include',
            }),
            providesTags: [{ type: 'Categories', id: 'SEARCH' }],
        }),

        // Get category by ID
        getCategoryById: builder.query<Category, { id: number, page?: number, limit?: number, sort?: string, order?: 'asc' | 'desc' }>({
            query: ({ id, ...params }) => ({
                url: `/api/categories/${id}`,
                method: 'GET',
                params,
                credentials: 'include',
            }),
            providesTags: (_, __, { id }) => [{ type: 'Categories', id }],
        }),

        // Get category path (breadcrumbs)
        getCategoryPath: builder.query<Category[], number>({
            query: (id) => ({
                url: `/api/categories/${id}/path`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: (_, __, id) => [{ type: 'Categories', id: `path-${id}` }],
        }),

        // Create category (admin)
        createCategory: builder.mutation<Category, CategoryCreateRequest>({
            query: (data) => ({
                url: '/api/categories',
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: [
                { type: 'Categories', id: 'LIST' },
                { type: 'Categories', id: 'TREE' },
                { type: 'Categories', id: 'TOP' }
            ],
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetCategoriesQuery,
    useGetCategoryTreeQuery,
    useGetTopCategoriesQuery,
    useSearchCategoriesQuery,
    useGetCategoryByIdQuery,
    useGetCategoryPathQuery,
    useCreateCategoryMutation,
} = categoryApi; 