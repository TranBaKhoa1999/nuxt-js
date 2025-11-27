<script setup lang="ts">
import type { Product } from '~/types/product';

const props = defineProps<{ product: Product }>();

const isHovering = ref(false);

const handleImageError = (e: Event) => {
    const target = e.target as HTMLImageElement
    if (target) {
        target.src = 'https://via.placeholder.com/400x300?text=No+Image'
    }
}
</script>

<template>
    <div
        class="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow relative flex flex-col min-h-[320px] w-full">
        <!-- Product Image -->
        <div class="relative w-full h-32 bg-gray-100 dark:bg-gray-700">
            <NuxtLink :to="`/products/${props.product.category.slug}/${props.product.slug}`"
                class="block w-full h-full">
                <img class="rounded-t-lg w-full h-full object-contain" :src="props.product.image_url"
                    :alt="props.product.name" @error="handleImageError" @mouseenter="isHovering = true"
                    @mouseleave="isHovering = false" loading="lazy" />
            </NuxtLink>
            <!-- Product Preview on Hover -->
            <Transition name="fade">
                <div v-if="isHovering" class="absolute top-full left-0 z-50 mt-2 w-80">
                    <ProductPreview :product="props.product" />
                </div>
            </Transition>
        </div>

        <div class="p-3 flex-1 flex flex-col gap-2">
            <!-- Category Badge -->
            <div class="mb-1.5">
                <span
                    class="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {{ props.product.category.name }}
                </span>
            </div>

            <!-- Product Name -->
            <NuxtLink :to="`/products/${props.product.category.slug}/${props.product.slug}`">
                <h5
                    class="text-sm font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 transition-colors">
                    {{ props.product.name }}
                </h5>
            </NuxtLink>

            <!-- Price and Stock -->
            <div class="flex items-center justify-between">
                <div>
                    <span class="text-base font-bold text-gray-900 dark:text-white">
                        {{ props.product.price }} đ
                    </span>
                </div>
                <div class="text-[11px] text-gray-600 dark:text-gray-400">
                    <span :class="props.product.stock > 0 ? 'text-green-600' : 'text-red-600'">
                        {{ props.product.stock > 0 ? `Còn ${props.product.stock}` : 'Hết hàng' }}
                    </span>
                </div>
            </div>

            <!-- SKU -->
            <div class="text-[11px] text-gray-500 dark:text-gray-500">
                SKU: {{ props.product.sku }}
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-1 mt-auto">
                <NuxtLink :to="`/products/${props.product.category.slug}/${props.product.slug}`"
                    class="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex-1 justify-center">
                    Chi tiết
                    <svg class="rtl:rotate-180 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </NuxtLink>
                <button :disabled="props.product.stock === 0"
                    class="inline-flex items-center justify-center px-2 py-1 text-[11px] font-medium text-center text-white bg-green-600 rounded-md hover:bg-green-700 focus:ring-2 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>