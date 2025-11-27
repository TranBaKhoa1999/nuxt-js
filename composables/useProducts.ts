// composables/useProducts.ts
import { computed, watch } from 'vue'
import type { ProductsResponse } from '~/types/product'
import { useGlobalCache } from './useCache'
import { DEFAULT_SHOW_ITEM_PER_PAGE } from '~/constants'

interface UseProductsOptions {
    page?: number
    limit?: number
    ttl?: number
}

export const useProducts = async (options: UseProductsOptions = {}) => {
    const { page: optPage, limit: optLimit, ttl = 1000 * 60 * 30 } = options

    const route = useRoute();
    const { apiFetch } = useApi();
    const { set, read } = useGlobalCache();

    // Initial page/limit only from options or defaults (no query params)
    const initialPage = (() => {
        const n = Number(optPage ?? 1);
        return Number.isNaN(n) || n < 1 ? 1 : n;
    })();

    const initialLimit = (() => {
        if (optLimit !== undefined) {
            return optLimit > 0 ? optLimit : DEFAULT_SHOW_ITEM_PER_PAGE;
        }
        return DEFAULT_SHOW_ITEM_PER_PAGE;
    })();

    // State to store page and limit (not displayed in URL)
    const pageState = useState('products-page', () => initialPage)
    const limitState = useState('products-limit', () => initialLimit)
    const lastCategoryState = useState('products-last-category', () => undefined as string | undefined)

    // Reactive page & limit from state
    const page = computed({
        get: () => pageState.value,
        set: (val) => { pageState.value = val }
    })

    const limit = computed({
        get: () => limitState.value,
        set: (val) => { limitState.value = val }
    })

    const category = computed(() => {
        // Read from route params (products/[category]) or query (products?category=...)
        const paramCategory = route.params.category

        if (typeof paramCategory === 'string' && paramCategory) {
            return paramCategory
        }
        return undefined
    })

    // Watch category to reset page to 1 when category changes
    watch(category, (newCategory, oldCategory) => {
        if (newCategory !== oldCategory) {
            pageState.value = 1
            lastCategoryState.value = newCategory
        }
    }, { immediate: true })

    // Unique cache key (includes category)
    const cacheKey = computed(() => `products:${page.value}:${limit.value}:${category.value ?? 'all'}`);

    // Fetcher
    const fetcher = async (): Promise<ProductsResponse> => {
        const params = new URLSearchParams()
        params.set('page', String(page.value))
        params.set('limit', String(limit.value))

        // API endpoint: products/{category-slug}?page=1&limit=2 or products?page=1&limit=2
        const endpoint = category.value
            ? `products/${category.value}?${params.toString()}`
            : `products?${params.toString()}`

        const response = await apiFetch<ProductsResponse>(endpoint)

        // Save to global cache
        set(cacheKey.value, response, ttl)

        return response
    }

    // useAsyncData + use getCachedData to read from global cache
    const { data, pending, error, refresh } = await useAsyncData(
        () => cacheKey.value,
        fetcher,
        {
            watch: [page, limit, category],
            lazy: true,
            default: () => null,
            dedupe: 'cancel', // Prevent duplicate requests when navigating quickly

            // Read cache from global cache
            getCachedData: () => read<ProductsResponse>(cacheKey.value, cacheKey.value),
        }
    )

    // Helpers
    const products = computed(() => data.value?.data?.data ?? [])
    const meta = computed(() => data.value?.data?.meta ?? null)
    const links = computed(() => data.value?.data?.links ?? null)

    const goToPage = (targetPage: number) => {
        if (targetPage === page.value) return

        // Only update state
        page.value = targetPage
    }

    const updateLimit = (newLimit?: number) => {
        const newLimitValue = newLimit && newLimit > 0 ? newLimit : DEFAULT_SHOW_ITEM_PER_PAGE

        // Update both page and limit in state
        limit.value = newLimitValue
        page.value = 1 // Reset to page 1
    }


    return {
        // Raw async data
        data,
        pending,
        error,
        refresh,

        // Parsed data
        products,
        meta,
        links,

        // Current state
        page,
        limit,

        // Actions
        goToPage,
        updateLimit,
    }
}