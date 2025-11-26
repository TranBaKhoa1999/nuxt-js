// composables/useCategories.ts
import type { CategoriesResponse } from '~/types/Category'
import { useGlobalCache } from './useCache'

interface UseCategoriesOptions {
    ttl?: number
}

export const useCategories = async (options: UseCategoriesOptions = {}) => {
    const { ttl = 1000 * 60 * 30 } = options;
    const { apiFetch } = useApi();
    const { set, read } = useGlobalCache();

    const cacheKey = 'categories:all'

    const fetcher = async (): Promise<CategoriesResponse> => {
        const response = await apiFetch<CategoriesResponse>('categories')
        set(cacheKey, response, ttl)
        return response
    }

    const { data, pending, error, refresh } = await useAsyncData(
        cacheKey,
        fetcher,
        {
            lazy: true,
            default: () => null as CategoriesResponse | null,
            getCachedData: () => read<CategoriesResponse>(cacheKey, 'categories'),
        }
    )
    const categories = computed(() => data.value?.data ?? [])
    return {
        categories,
        pending,
        error,
        refresh,
    }
}