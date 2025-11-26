<template>
    <div>
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Product Detail
            </h1>
            <p>Category: {{ category }}</p>
            <p>Product Slug: {{ slug }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'custom'
})

const route = useRoute()
const category = route.params.category as string
const slug = route.params.slug as string
</script>

<style lang="scss" scoped></style>
