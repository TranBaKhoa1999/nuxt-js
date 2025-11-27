<script setup lang="ts">

const { products, meta, pending, error, goToPage, updateLimit, limit } = await useProducts();

const limitOptions = [5, 10, 20, 50, 100];

// Limit model cho select
const limitModel = computed({
    get: () => limit.value,
    set: (val) => updateLimit(val)
});
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Page Title and Limit Selector -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                Danh sách sản phẩm
            </h1>

            <!-- Limit Selector -->
            <div class="flex items-center gap-2">
                <label for="limit-select" class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Hiển thị:
                </label>
                <select id="limit-select" v-model="limitModel"
                    class="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option v-for="option in limitOptions" :key="option" :value="option">
                        {{ option }}
                    </option>
                </select>
                <span class="text-sm text-gray-600 dark:text-gray-400">sản phẩm/trang</span>
            </div>
        </div>

        <!-- Main Content with Sidebar -->
        <div class="flex flex-col lg:flex-row gap-6">
            <!-- Category Menu Sidebar -->
            <aside class="lg:w-64 flex-shrink-0">
                <CategoryMenu />
            </aside>

            <!-- Products Content -->
            <div class="flex-1 min-h-[400px]">
                <!-- Loading State with Skeleton -->
                <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <ProductCardSkeleton v-for="n in limit" :key="`skeleton-${n}`" />
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
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
