<script setup lang="ts">
import { toRefs } from 'vue'

interface Product {
    id: number
    name: string
    slug: string
    description: string
    price: string
    stock: number
    sku: string
    image: string
    image_url: string
    category_id: number
    category: {
        id: number
        name: string
        slug: string
        description: string
    }
    created_at: string
    updated_at: string
}

const props = defineProps<{ product: Product }>()
const { product } = toRefs(props)

const handleImageError = (e: Event) => {
    const target = e.target as HTMLImageElement
    if (target) {
        target.src = 'https://via.placeholder.com/400x300?text=No+Image'
    }
}
</script>

<template>
    <div
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <!-- Product Image -->
        <NuxtLink :to="`/products/${product.slug}`">
            <img class="rounded-t-lg w-full h-64 object-cover" :src="product.image_url" :alt="product.name"
                @error="handleImageError" />
        </NuxtLink>

        <div class="p-5">
            <!-- Category Badge -->
            <div class="mb-2">
                <span
                    class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {{ product.category.name }}
                </span>
            </div>

            <!-- Product Name -->
            <NuxtLink :to="`/products/${product.slug}`">
                <h5
                    class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 transition-colors">
                    {{ product.name }}
                </h5>
            </NuxtLink>

            <!-- Description -->
            <p class="mb-3 text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
                {{ product.description }}
            </p>

            <!-- Price and Stock -->
            <div class="flex items-center justify-between mb-3">
                <div>
                    <span class="text-2xl font-bold text-gray-900 dark:text-white">
                        {{ product.price }} đ
                    </span>
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                    <span :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
                        {{ product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng' }}
                    </span>
                </div>
            </div>

            <!-- SKU -->
            <div class="mb-3 text-xs text-gray-500 dark:text-gray-500">
                SKU: {{ product.sku }}
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2">
                <NuxtLink :to="`/products/${product.slug}`"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex-1 justify-center">
                    Xem chi tiết
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </NuxtLink>
                <button :disabled="product.stock === 0"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                        </path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>