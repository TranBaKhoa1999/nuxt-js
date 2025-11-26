<template>
    <div>
        <nav
            class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NuxtLink href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo">
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </NuxtLink>

                <div class="flex md:order-2 items-center space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <template v-if="!isAuthenticated">
                        <NuxtLink to="/login"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Login
                        </NuxtLink>
                        <NuxtLink to="/register"
                            class="text-sm font-medium px-4 py-2 rounded-lg text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900">
                            Register
                        </NuxtLink>
                    </template>
                    <template v-else>
                        <span class="text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2">
                            Hi, {{ authUser?.name || 'User' }}
                        </span>
                        <button @click="handleLogout" :disabled="authLoading"
                            class="text-sm font-medium px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-60 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800">
                            {{ authLoading ? 'Signing out...' : 'Logout' }}
                        </button>
                    </template>

                    <!-- Dark Mode Toggle -->
                    <button @click="toggleDark"
                        class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        <span v-if="!isDark">🌞</span>
                        <span v-else>🌙</span>
                    </button>

                    <button data-collapse-toggle="navbar-sticky" type="button"
                        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul
                        class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NuxtLink href="/products"
                                :class="isActive('/products') ? 'block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'">
                                Products</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink href="/about"
                                :class="isActive('/about') ? 'block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'">
                                About</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const route = useRoute();
const { user, logout, loading: authLoadingState } = useAuth({ redirectOnLogout: '/login' })

const authUser = computed(() => user.value)
const authLoading = computed(() => authLoadingState.value)
const isAuthenticated = computed(() => Boolean(authUser.value))
const isActive = (path: string) => route.path === path
const isDark = ref(false)

const toggleDark = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }
}

const handleLogout = async () => {
    try {
        await logout()
    } catch (error) {
        console.error('Logout failed', error)
    }
}

// save dark mode state when page is loaded
onMounted(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
        isDark.value = true
        document.documentElement.classList.add('dark')
    }
})
</script>