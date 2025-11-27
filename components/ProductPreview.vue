<script setup lang="ts">
import type { Product } from '~/types/product';

const props = defineProps<{ product: Product }>()

</script>

<template>
    <div
        class="bg-gray-500 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <div class="p-1">
            <h5
                class="mb-1.5 text-base font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 transition-colors">
                {{ props.product.name }}
            </h5>
        </div>
        <div class="p-1">
            <p class="mb-2 text-xs text-gray-700 dark:text-gray-400 line-clamp-2">
                {{ props.product.description }}
            </p>
        </div>
        <div class="p-1">
            <p class="mb-2 text-xs text-gray-700 dark:text-gray-400 line-clamp-2">
                {{ props.product.price }} đ
            </p>
        </div>
    </div>
</template>

<style lang="css" scoped></style>