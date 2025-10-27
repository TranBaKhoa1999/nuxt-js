<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div class="max-w-md w-full space-y-8">
        <h2 class="text-center text-3xl font-bold text-gray-900">Đăng nhập</h2>
        
        <form @submit.prevent="handleLogin" class="space-y-4">
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
            class="w-full p-3 border rounded-md"
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="Mật khẩu"
            required
            class="w-full p-3 border rounded-md"
          />
          
          <button
            type="submit"
            :disabled="loading"
            class="w-full p-3 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
          </button>
        </form>
        
        <div v-if="error" class="text-red-500 text-center">
          {{ error }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const form = ref({
    email: '',
    password: ''
  })
  
  const loading = ref(false)
  const error = ref('')
  
  const handleLogin = async () => {
    loading.value = true
    error.value = ''
    
    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: form.value
      })
      
      await navigateTo('/dashboard')
    } catch (err) {
      error.value = 'Đăng nhập thất bại!'
    } finally {
      loading.value = false
    }
  }
  </script>