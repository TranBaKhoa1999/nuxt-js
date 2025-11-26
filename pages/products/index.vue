<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { products, meta, pending, error, goToPage } = await useProducts({ limit: 5 })
</script>
<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Page Title -->
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Danh sách sản phẩm
        </h1>

        <!-- Loading State -->
        <div v-if="pending" class="flex justify-center items-center min-h-[400px]">
            <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p class="mt-4 text-gray-600 dark:text-gray-400">Đang tải sản phẩm...</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p class="font-bold">Lỗi:</p>
            <p>{{ error.message || 'Không thể tải danh sách sản phẩm' }}</p>
        </div>

        <!-- Products Grid -->
        <div v-else-if="products && products.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
            <p class="text-gray-600 dark:text-gray-400 text-lg">Không có sản phẩm nào</p>
        </div>

        <!-- Pagination -->
        <div v-if="meta && meta.last_page > 1" class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
                <button v-if="meta.current_page > 1" @click="goToPage(meta.current_page - 1)"
                    class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Trước
                </button>

                <button v-for="page in meta.last_page" :key="page" @click="goToPage(page)" :class="[
                    'px-4 py-2 text-sm font-medium rounded-lg',
                    page === meta.current_page
                        ? 'text-white bg-blue-600 hover:bg-blue-700'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
                ]">
                    {{ page }}
                </button>

                <button v-if="meta.current_page < meta.last_page" @click="goToPage(meta.current_page + 1)"
                    class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Sau
                </button>
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
