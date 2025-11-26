// composables/useApi.ts (Nuxt 3 automatically recognizes composables)
import { useRuntimeConfig } from '#imports'

export const useApi = () => {
    const config = useRuntimeConfig()

    const apiBase = config.public.apiBaseUrl;
    const apiPrefix = config.public.apiPrefix;

    // function to call API, automatically add /api, handle token, error...
    const apiFetch = async <T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> => {
        const token = useCookie('XSRF-TOKEN')?.value || '' // Sanctum uses XSRF + laravel_session
        // or if you use bearer token (JWT/Passport)
        // const token = useCookie('auth_token')?.value

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            // Sanctum needs 2 of these for csrf protection
            'X-XSRF-TOKEN': token,
            // if you use referrer same domain then no need
            // Referer: apiBase,
            ...options.headers,
        }

        // if you use Bearer token (Passport or Sanctum spa)
        // if (token) headers.Authorization = `Bearer ${token}`

        const url = `${apiBase}/${apiPrefix}/${endpoint}`;
        console.log(url);
        const response = await fetch(url, {
            credentials: 'include', // IMPORTANT: to send cookie (laravel_session + XSRF-TOKEN)
            ...options,
            headers,
        })

        if (!response.ok) {
            const error = await response.json().catch(() => ({}))
            throw new Error(error.message || `HTTP ${response.status}`)
        }

        return response.json()
    }

    return { apiFetch }
}