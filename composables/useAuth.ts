import type { AuthResponse, AuthUser, LoginPayload, RegisterPayload } from '~/types/Auth'

interface UseAuthOptions {
    redirectOnLogin?: string
    redirectOnLogout?: string
}

export const useAuth = (options: UseAuthOptions = {}) => {
    const config = useRuntimeConfig()
    const { apiFetch } = useApi(false);
    const redirectOnLogin = options.redirectOnLogin ?? '/'
    const redirectOnLogout = options.redirectOnLogout ?? '/login'
    const router = useRouter()

    const user = useState<AuthUser | null>('auth-user', () => null)
    const loading = useState('auth-loading', () => false)
    const error = useState<string | null>('auth-error', () => null)
    const csrfLoaded = useState('auth-csrf-loaded', () => false)

    const setUser = (nextUser: AuthUser | null) => {
        user.value = nextUser
    }

    const resetError = () => {
        error.value = null
    }

    const ensureCsrfCookie = async () => {
        if (csrfLoaded.value) return

        try {
            await $fetch('/sanctum/csrf-cookie', {
                baseURL: config.public.apiBaseUrl,
                credentials: 'include',
            })
            csrfLoaded.value = true
        } catch (err) {
            throw new Error('CSRF cookie failed')
        }
    }

    const request = async <T>(endpoint: string, payload?: Record<string, unknown>): Promise<T> => {
        loading.value = true
        resetError()
        try {
            await ensureCsrfCookie()
            return await apiFetch<T>(endpoint, {
                method: 'POST',
                body: payload ? JSON.stringify(payload) : undefined
            })
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unexpected error'
            error.value = message
            throw err
        } finally {
            loading.value = false
        }
    }

    const login = async (payload: LoginPayload) => {
        const response = await request<AuthResponse>('api/login', { ...payload })
        if (response.data?.user) {
            setUser(response.data.user)
        }
        await router.push(redirectOnLogin)
        return response
    }

    const register = async (payload: RegisterPayload) => {
        const response = await request<AuthResponse>('api/register', { ...payload })
        return response
    }

    const logout = async () => {
        await request<AuthResponse>('auth/logout')
        setUser(null)
        await router.push(redirectOnLogout)
    }

    return {
        user,
        loading,
        error,
        login,
        register,
        logout,
        resetError,
        setUser
    }
}

