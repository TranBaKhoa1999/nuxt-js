export interface Category {
    id: number
    name: string
    slug: string
    description?: string
}

export type CategoriesResponse = {
    status: number
    status_code: string
    message: string
    data: Category[]
}

