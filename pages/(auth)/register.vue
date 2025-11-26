<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <div class="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
            <div class="text-center space-y-2">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    Fill the form below to get started
                </p>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Full name</label>
                    <input v-model="form.name" type="text" placeholder="Jane Doe" required
                        class="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                </div>

                <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input v-model="form.email" type="email" placeholder="you@example.com" required
                        class="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                </div>

                <div class="grid gap-4 md:grid-cols-2">
                    <div>
                        <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input v-model="form.password" type="password" placeholder="••••••••" required
                            class="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm password</label>
                        <input v-model="form.password_confirmation" type="password" placeholder="••••••••" required
                            class="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                    </div>
                </div>

                <button type="submit" :disabled="authLoading"
                    class="w-full rounded-md bg-blue-600 px-4 py-3 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400 dark:focus:ring-offset-gray-800">
                    {{ authLoading ? 'Creating account...' : 'Sign Up' }}
                </button>
            </form>

            <p v-if="authError" class="text-sm text-red-500 text-center">
                {{ authError }}
            </p>

            <p class="text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?
                <NuxtLink to="/login" class="font-semibold text-blue-600 hover:underline dark:text-blue-400">
                    Sign in
                </NuxtLink>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const { register, loading: authLoading, error: authErrorState, resetError } = useAuth({
    redirectOnLogin: '/products',
    redirectOnLogout: '/login'
})

const authError = computed(() => authErrorState.value)

watch(() => [form.name, form.email, form.password, form.password_confirmation], () => {
    if (authError.value) {
        resetError()
    }
})

const handleRegister = async () => {
    try {
        await register({ ...form })
        await navigateTo('/login')
    } catch (err) {
        // errors handled via useAuth state
    }
}
</script>

