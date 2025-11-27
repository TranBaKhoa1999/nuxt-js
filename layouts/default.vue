<template>
    <div class="bg-gray-50 dark:bg-gray-900">

        <div class="header">
            <Header />
            <NavBar />
        </div>

        <main class="min-h-screen bg-gray-200 dark:bg-gray-800 py-8" id="container">
            <slot />
        </main>

        <Footer />
    </div>
</template>

<script setup>
</script>

<style scoped></style>