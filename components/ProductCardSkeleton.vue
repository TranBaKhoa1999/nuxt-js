<template>
    <div
        class="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 animate-pulse flex flex-col min-h-[320px] w-full">
        <!-- Image Skeleton -->
        <div class="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-t-xl"></div>

        <div class="p-3 flex-1 flex flex-col gap-2">
            <!-- Category Badge Skeleton -->
            <div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>

            <!-- Product Name Skeleton -->
            <div class="space-y-1">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>

            <!-- Price and Stock Skeleton -->
            <div class="flex items-center justify-between">
                <div class="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div class="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>

            <!-- SKU Skeleton -->
            <div class="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>

            <!-- Action Buttons Skeleton -->
            <div class="flex gap-1 mt-auto">
                <div class="flex-1 h-7 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div class="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
