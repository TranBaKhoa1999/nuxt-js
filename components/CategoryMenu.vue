<script setup lang="ts">
import { useCategories } from '~/composables/useCategories'

const route = useRoute()
const router = useRouter()

// Fetch categories using composable
const { categories, pending: categoriesPending } = await useCategories()

// Read category from params
const selectedCategory = computed(() => {
    const paramCategory = route.params.category;
    if (typeof paramCategory === 'string' && paramCategory) {
        return paramCategory
    }
    return undefined
})

const selectCategory = (categorySlug?: string) => {
    if (categorySlug) {
        // Navigate to /products/{category-slug} (without query params)
        router.push({
            path: `/products/${categorySlug}`
        })
    } else {
        // Navigate to /products (without query params)
        router.push({
            path: '/products'
        })
    }
}
</script>

<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Danh mục
        </h3>

        <!-- Loading State -->
        <div v-if="categoriesPending" class="space-y-2">
            <div v-for="i in 5" :key="i" class="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        <!-- Categories List -->
        <div v-else class="space-y-1">
            <!-- All Categories -->
            <button @click="selectCategory()" :class="[
                'w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                !selectedCategory
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            ]">
                Tất cả
            </button>

            <!-- Category Items -->
            <button v-for="category in categories" :key="category.id" @click="selectCategory(category.slug)" :class="[
                'w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedCategory === category.slug
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            ]">
                {{ category.name }}
            </button>
        </div>

        <!-- Empty State -->
        <div v-if="!categoriesPending && categories.length === 0" class="text-sm text-gray-500 dark:text-gray-400">
            Không có danh mục nào
        </div>
    </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
