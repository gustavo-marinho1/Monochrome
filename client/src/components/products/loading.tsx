import { LoaderCircle } from "lucide-react"

const ProductsLoading = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <LoaderCircle className="size-8 animate-spin" />
      <p className="text-center text-md font-bold">Searching...</p>
    </div>
  )
}

export { ProductsLoading }