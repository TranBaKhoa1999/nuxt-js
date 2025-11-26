<template>
    <div>
        Product detial for {{ id }}
    </div>
</template>

<script setup>


// definePageMeta({
//     layout:'custom'
// })
definePageMeta({
    layout: 'custom'
})
const route = useRoute();
const id = route.params.id;

</script>

<style lang="scss" scoped></style>