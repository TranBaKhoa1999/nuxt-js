import { computed } from 'vue'
import type { ProductsResponse } from '~/types/Product'

interface UseProductsOptions {
    page?: number
    limit?: number
}

// Cache store để lưu data theo key - dùng useState để persistent
const getCacheStore = () => useState<Map<string, ProductsResponse>>('products-cache', () => new Map())

export const useProducts = async (options: UseProductsOptions = {}) => {
    const route = useRoute()
    const router = useRouter()
    const { apiFetch } = useApi()

    //setup page and limit
    const page = computed(() => {
        const pageParam = route.query.page ?? options.page ?? 1
        const parsed = Number(pageParam)
        return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed
    })

    const limit = computed(() => {
        const limitParam = route.query.limit ?? options.limit
        if (!limitParam) return undefined
        const parsed = Number(limitParam)
        return Number.isNaN(parsed) || parsed < 1 ? undefined : parsed
    })

    //create key unique theo page và limit để cache đúng
    const getDataKey = () => `products-${page.value}-${limit.value ?? 'default'}`

    const cacheStore = getCacheStore()

    //fetcher function
    const fetcher = async () => {
        const params = new URLSearchParams()
        params.set('page', String(page.value))
        if (limit.value) params.set('limit', String(limit.value))

        const response = await apiFetch<ProductsResponse>(`products?${params.toString()}`)

        //save to cache
        const key = getDataKey()
        cacheStore.value.set(key, response)

        return response
    }

    //useAsyncData with cache
    const asyncData = await useAsyncData(
        getDataKey,
        fetcher,
        {
            watch: [page, limit],
            lazy: true, // not block navigation, fetch after component mounted
            default: () => null, // default value when loading
            // check cache before fetch
            getCachedData: (key) => {
                const cached = cacheStore.value.get(key)
                if (cached) {
                    console.log(`using cached data for key: ${key}`)
                    return cached
                }
                return undefined
            },
        }
    )

    const products = computed(() => asyncData.data.value?.data?.data ?? [])
    const meta = computed(() => asyncData.data.value?.data?.meta ?? null)
    const links = computed(() => asyncData.data.value?.data?.links ?? null)

    const goToPage = (targetPage: number) => {
        if (targetPage === page.value) return
        router.push({
            query: { ...route.query, page: targetPage }
        })
    }

    const updateLimit = (newLimit: number) => {
        router.push({
            query: { ...route.query, page: 1, limit: newLimit }
        })
    }

    return {
        ...asyncData,
        products,
        meta,
        links,
        page,
        limit,
        goToPage,
        updateLimit
    }
}

