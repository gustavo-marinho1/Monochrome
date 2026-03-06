import { SearchX } from "lucide-react"

interface Props {
  search?: string
}

const ProductsEmpty = ({search}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <SearchX className="size-8" />
      <p className="text-center text-md">
        {search ? `No results for "${search}"` : "No products found"}
      </p>
    </div>
  )
}

export { ProductsEmpty }