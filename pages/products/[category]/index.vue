<script setup lang="ts">
import ProductsList from '~/components/ProductsList.vue';

definePageMeta({
    layout: 'default',
});
const route = useRoute();
const categorySlug = computed(() => route.params.category as string);
useHead({
    title: categorySlug.value ? categorySlug.value : 'Products'
});
</script>

<template>
    <ProductsList />
</template>
