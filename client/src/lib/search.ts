interface FilterSearch {
  search?: string
  page?: number
  color?: string | null
  sort?: "price_asc" | "price_desc" | null
}

export type { FilterSearch }