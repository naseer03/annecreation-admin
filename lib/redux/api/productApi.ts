import { baseApi } from './baseApi';

// Define product interface to match API response
export interface Product {
    _id: string;
    product_id: number;
    model: string;
    sku: string;
    price: number;
    quantity: number;
    status: boolean;
    categories: number[];
    weight?: number;
    dimensions?: {
        width: number;
        height: number;
        length: number;
    };
    descriptions: Array<{
        language_id: number;
        name: string;
        description: string;
        meta_title?: string;
        meta_description?: string;
        meta_keyword?: string;
    }>;
    date_added: string;
    date_modified?: string;
    __v?: number;
    additional_images?: Array<{
        product_image_id: number;
        image: string;
        sort_order: number;
        _id: string;
    }>;
    attributes?: any[];
    discounts?: any[];
    downloads?: any[];
    file_verification_status?: {
        missing_files: any[];
        total_files: number;
        verified_files: number;
    };
    migration_notes?: any[];
    minimum?: number;
    options?: any[];
    points?: number;
    related_products?: any[];
    shipping?: boolean;
    sort_order?: number;
    special_prices?: any[];
    stores?: any[];
    subtract?: boolean;
    tags?: any[];
    viewed?: number;
}

// Define pagination interface to match API response
export interface PaginationResponse {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface ProductListResponse {
    products: Product[];
    pagination: PaginationResponse;
}

// Define pagination and filter interfaces
export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface ProductFilters {
    search?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    status?: boolean;
    manufacturer_id?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// Define product creation interface
export type ProductCreateRequest = FormData;

// Define image upload interface
export interface ProductImageUploadRequest {
    image: File;
    sort_order?: number;
}

// Define category interface
export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    parentId?: string;
}

// Create product API endpoints
export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductListResponse, Partial<PaginationParams & ProductFilters>>({
            query: (params) => ({
                url: '/api/products',
                method: 'GET',
                params: {
                    ...params,
                    page: params.page || 1,
                    limit: params.limit || 10
                },
                credentials: 'include'
            }),
            providesTags: (result) =>
                result?.products
                    ? [
                        ...result.products.map(({ product_id }) => ({
                            type: 'Products' as const,
                            id: product_id
                        })),
                        { type: 'Products', id: 'LIST' }
                    ]
                    : [{ type: 'Products', id: 'LIST' }]
        }),

        // Get product by ID
        getProductById: builder.query<Product, string>({
            query: (id) => `/api/products/${id}`,
            providesTags: (_, __, id) => [{ type: 'Products', id }],
        }),

        // Create new product
        createProduct: builder.mutation<Product, ProductCreateRequest>({
            query: (formData) => ({
                url: '/api/products',
                method: 'POST',
                body: formData,
                formData: true,
                credentials: 'include',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),

        // Update existing product
        updateProduct: builder.mutation<
            Product,
            { id: string; product: Partial<Product> }
        >({
            query: ({ id, product }) => ({
                url: `/api/products/${id}`,
                method: 'PUT',
                body: product,
                credentials: 'include',
            }),
            invalidatesTags: (_, __, { id }) => [
                { type: 'Products', id },
                { type: 'Products', id: 'LIST' },
            ],
        }),

        // Delete product
        deleteProduct: builder.mutation<
            { success: boolean; message: string },
            string
        >({
            query: (id) => ({
                url: `/api/products/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (_, __, id) => [
                { type: 'Products', id },
                { type: 'Products', id: 'LIST' },
            ],
        }),

        // Update product status
        updateProductStatus: builder.mutation<
            Product,
            { id: string; status: boolean }
        >({
            query: ({ id, status }) => ({
                url: `/api/products/${id}/status`,
                method: 'PATCH',
                body: { status },
                credentials: 'include',
            }),
            invalidatesTags: (_, __, { id }) => [
                { type: 'Products', id },
                { type: 'Products', id: 'LIST' },
            ],
        }),

        // Upload product images
        uploadProductImages: builder.mutation<
            { success: boolean; message: string; image: { image_id: number; image: string; sort_order: number } },
            { id: string; formData: FormData }
        >({
            query: ({ id, formData }) => {
                console.log(`Sending image upload request for product ${id}`);

                return {
                    url: `/api/products/${id}/images`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                    credentials: 'include',
                    headers: {},
                };
            },
            invalidatesTags: (_, __, { id }) => [
                { type: 'Products', id },
                { type: 'Products', id: `images-${id}` }
            ],
        }),

        // Get product images
        getProductImages: builder.query<
            { images: Array<{ image_id: number; image: string; sort_order: number }> },
            string
        >({
            query: (id) => ({
                url: `/api/products/${id}/images`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: (_, __, id) => [{ type: 'Products', id: `images-${id}` }],
        }),

        // Delete product image
        deleteProductImage: builder.mutation<
            { success: boolean },
            { productId: string; imageId: number }
        >({
            query: ({ productId, imageId }) => ({
                url: `/api/products/${productId}/images/${imageId}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (_, __, { productId }) => [
                { type: 'Products', id: `images-${productId}` },
                { type: 'Products', id: productId },
            ],
        }),

        // Get product analytics
        getProductAnalytics: builder.query<
            {
                totalViews: number;
                totalSales: number;
                conversionRate: number;
                popularityRank: number;
                recentSales: { date: string; count: number }[];
            },
            string
        >({
            query: (id) => `/api/products/${id}/analytics`,
            providesTags: (_, __, id) => [
                { type: 'Products', id },
                { type: 'Analytics', id: `product-${id}` },
            ],
        }),
    }),
});

// Export the generated hooks
export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useUpdateProductStatusMutation,
    useUploadProductImagesMutation,
    useGetProductImagesQuery,
    useDeleteProductImageMutation,
    useGetProductAnalyticsQuery,
} = productApi;
