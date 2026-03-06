import { type Product } from "../../lib/products";
import { ProductCard } from "./product-card"

type Props = {
  products: Product[];
}

const ProdutsResults = ({products}: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.name}
          subtitle={product.category}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  )
}

export { ProdutsResults }