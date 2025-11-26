// composables/useApi.ts
import { useRuntimeConfig } from '#imports'

export const useApi = (usePrefix: boolean = true) => {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBaseUrl;
    const apiPrefix = config.public.apiPrefix;

    const apiFetch = async <T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> => {
        const xsrfToken = useCookie('XSRF-TOKEN', { readonly: true }).value // Sanctum uses XSRF + laravel_session

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            ...(xsrfToken ? { 'X-XSRF-TOKEN': xsrfToken } : {}),
            ...options.headers,
        }

        const url = usePrefix
            ? `${apiBase}/${apiPrefix}/${endpoint}`
            : `${apiBase}/${endpoint}`

        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',
        })

        if (!response.ok) {
            const err = await response.json().catch(() => ({}))
            throw new Error(err.message || `HTTP ${response.status}`)
        }

        return response.json()
    }

    return { apiFetch }
}