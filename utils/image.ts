export const FALLBACK_IMAGE = 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg'

export const handleImageError = (event: Event, fallback = FALLBACK_IMAGE) => {
    const img = event.target as HTMLImageElement
    if (img && img.src !== fallback) {
        img.src = fallback
    }
}