// composables/useGlobalCache.ts
interface CacheEntry<T> {
    data: T
    timestamp: number
    ttl: number // ms
}

const CACHE_STATE_KEY = 'global-cache'

export const useGlobalCache = () => {
    const cache = useState<Record<string, CacheEntry<any>>>(CACHE_STATE_KEY, () => ({}))

    const set = <T>(key: string, data: T, ttl: number = 1000 * 60 * 30): void => {
        cache.value[key] = {
            data,
            timestamp: Date.now(),
            ttl,
        }
    }

    const get = <T>(key: string, customTtl?: number): T | undefined => {
        const entry = cache.value[key]
        if (!entry) return undefined

        const effectiveTtl = customTtl ?? entry.ttl
        const age = Date.now() - entry.timestamp

        if (age < effectiveTtl) {
            return entry.data as T
        }

        // Cache expired → cleanup
        delete cache.value[key]
        return undefined
    }

    const read = <T>(key: string, logLabel?: string): T | undefined => {
        const cached = get<T>(key)
        if (cached && logLabel) {
            console.log(`Cache HIT: ${logLabel}`)
        }
        return cached
    }

    const clear = (prefix?: string): void => {
        if (!prefix) {
            cache.value = {}
            return
        }
        Object.keys(cache.value).forEach(k => {
            if (k.startsWith(prefix)) delete cache.value[k]
        })
    }

    return { set, get, read, clear }
}