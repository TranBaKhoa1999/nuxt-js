<template>
    <div class="bg-gray-50 dark:bg-gray-900">

        <div class="header">
            <Header />
            <NavBar />
        </div>

        <div class="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-800" id="container">
            <slot />
        </div>

        <Footer />
    </div>
</template>

<script setup>
</script>

<style scoped></style>