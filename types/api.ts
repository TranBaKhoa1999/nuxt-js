export interface ApiMeta {
    current_page: number
    from: number
    last_page: number
    links: Array<{
        url: string | null
        label: string | number
        active: boolean
    }>
    path: string
    per_page: number
    to: number
    total: number
}
export interface ApiPageLink {
    first: string
    last: string
    prev: string | null
    next: string | null
}