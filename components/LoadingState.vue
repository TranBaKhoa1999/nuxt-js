<template>
    <div class="flex justify-center items-center min-h-[400px] w-full">
        <div class="text-center space-y-4">
            <div
                class="mx-auto h-12 w-12 rounded-full border-4 border-blue-500 border-opacity-20 border-t-blue-500 animate-spin">
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ message }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface LoadingStateProps {
    message?: string
}

const props = defineProps<LoadingStateProps>()
const message = computed(() => props.message ?? 'Loading, please wait...')
</script>
