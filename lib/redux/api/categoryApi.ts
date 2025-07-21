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
    parent_id: string;
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

        // Create category (admin, supports FormData for file upload)
        createCategory: builder.mutation<Category, FormData>({
            query: (formData) => {
                // Extract file names for category, banner, and thumbnail images
                const categoryImageNames: string[] = [];
                const bannerImageNames: string[] = [];
                const thumbnailImageNames: string[] = [];
                // FormData does not provide a direct way to get all files, so we rely on the keys used in append
                // The frontend should append files with keys: categoryImages, bannerImages, thumbnailImages
                formData.forEach((value, key) => {
                    if (key === 'categoryImages' && value instanceof File) categoryImageNames.push(value.name);
                    if (key === 'bannerImages' && value instanceof File) bannerImageNames.push(value.name);
                    if (key === 'thumbnailImages' && value instanceof File) thumbnailImageNames.push(value.name);
                });
                // Add a JSON string with the image file names
                formData.append('imageNames', JSON.stringify({
                    categoryImages: categoryImageNames,
                    bannerImages: bannerImageNames,
                    thumbnailImages: thumbnailImageNames,
                }));
                return {
                    url: '/api/categories',
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                };
            },
            invalidatesTags: [
                { type: 'Categories', id: 'LIST' },
                { type: 'Categories', id: 'TREE' },
                { type: 'Categories', id: 'TOP' }
            ],
        }),

        // Update category (admin, supports FormData for file upload)
        updateCategory: builder.mutation<Category, { id: number; body: any }>(
            {
                query: ({ id, body }) => {
                    return {
                        url: `/api/categories/${id}`,
                        method: 'PUT',
                        body,
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    };
                },
                invalidatesTags: (result, error, { id }) => [
                    { type: 'Categories', id: 'LIST' },
                    { type: 'Categories', id: 'TREE' },
                    { type: 'Categories', id: 'TOP' },
                    { type: 'Categories', id }
                ],
            }
        ),
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
    useUpdateCategoryMutation,
} = categoryApi;