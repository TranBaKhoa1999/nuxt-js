export interface AuthUser {
    id: number
    name: string
    email: string
    [key: string]: unknown
}

export interface AuthData {
    token?: string
    user?: AuthUser
    [key: string]: unknown
}

export interface AuthResponse {
    status?: number
    status_code?: string
    message?: string
    data?: AuthData
    [key: string]: unknown
}

export interface LoginPayload {
    email: string
    password: string
}

export interface RegisterPayload {
    name: string
    email: string
    password: string
    password_confirmation?: string
}

