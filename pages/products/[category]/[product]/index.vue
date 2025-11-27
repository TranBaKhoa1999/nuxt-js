<script setup lang="ts">
import type { Product } from '~/types/product';

const route = useRoute();
const router = useRouter();
const categorySlug = computed(() => route.params.category as string);
const productSlug = computed(() => route.params.product as string);

const pageKey = computed(() => `product:${categorySlug.value}:${productSlug.value}`);
const apiUrl = computed(() => `products/${categorySlug.value}/${productSlug.value}`);
const { apiFetch } = useApi();

const { data, pending, error, refresh } = await useAsyncData(pageKey, async () => {
    const response = await apiFetch<{ data?: Product }>(apiUrl.value);
    return response.data ?? response as unknown as Product;
}, {
    default: () => null
});

const product = computed(() => data.value);

const goBack = () => router.back();

useHead({
    title: product.value ? product.value.name : 'Product Detail'
});
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <div class="mb-6 flex items-center justify-between gap-4">
            <button @click="goBack"
                class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </button>
            <button @click="() => refresh()"
                class="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 1019 5" />
                </svg>
                Refresh
            </button>
        </div>

        <div v-if="pending" class="grid gap-8 lg:grid-cols-2">
            <div class="h-96 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div class="space-y-4">
                <div class="h-10 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div class="h-6 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div class="h-32 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div class="h-16 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
        </div>

        <div v-else-if="product" class="grid gap-8 lg:grid-cols-2">
            <div class="rounded-2xl bg-white p-4 shadow dark:bg-gray-900">
                <div class="relative overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800">
                    <img :src="product.image_url" :alt="product.name" class="h-full w-full max-h-[480px] object-contain"
                        @error="handleImageError" />
                </div>
            </div>

            <div class="space-y-6 rounded-2xl bg-white p-6 shadow dark:bg-gray-900">
                <div>
                    <span
                        class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                        {{ product.category.name }}
                    </span>
                    <h1 class="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
                        {{ product.name }}
                    </h1>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        SKU: {{ product.sku }}
                    </p>
                </div>

                <div class="flex flex-col gap-2 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                    <div class="text-4xl font-bold text-gray-900 dark:text-white">
                        {{ product.price }} đ
                    </div>
                    <span :class="product.stock > 0 ? 'text-green-600' : 'text-red-500'" class="font-medium">
                        {{ product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng' }}
                    </span>
                </div>

                <div class="space-y-3">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Mô tả sản phẩm</h2>
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {{ product.description }}
                    </p>
                </div>

                <div class="grid gap-4 rounded-xl border border-gray-200 p-4 dark:border-gray-800 sm:grid-cols-2">
                    <div>
                        <p class="text-xs uppercase text-gray-500 dark:text-gray-400">Danh mục</p>
                        <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ product.category.name }}</p>
                    </div>
                    <div>
                        <p class="text-xs uppercase text-gray-500 dark:text-gray-400">Ngày cập nhật</p>
                        <p class="text-sm font-semibold text-gray-900 dark:text-white">
                            {{ new Date(product.updated_at).toLocaleDateString('vi-VN') }}
                        </p>
                    </div>
                </div>

                <div class="flex flex-col gap-3 sm:flex-row">
                    <button
                        class="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold shadow hover:bg-blue-700 transition disabled:bg-gray-400"
                        :disabled="product.stock === 0">
                        Thêm vào giỏ hàng
                    </button>
                    <button
                        class="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
                        Liên hệ tư vấn
                    </button>
                </div>
            </div>
        </div>

        <div v-else class="rounded-xl bg-white p-8 text-center shadow dark:bg-gray-900">
            <p class="text-lg font-medium text-gray-700 dark:text-gray-200">
                Không tìm thấy sản phẩm.
            </p>
            <NuxtLink to="/products"
                class="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                Quay lại danh sách
            </NuxtLink>
        </div>

        <div v-if="error"
            class="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
            {{ error.message || 'Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.' }}
        </div>
    </div>
</template>

<style scoped></style>