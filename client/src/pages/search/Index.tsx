import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../lib/products";
import { ProductsEmpty } from "../../components/products/empty";
import { ProductsLoading } from "../../components/products/loading";
import { ProdutsResults } from "../../components/products/results";

function Search() {
  const p = useParams();
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const searchParams = params.get("s");
    if (searchParams)
      setSearch(searchParams);
    else
      navigate("/");
  
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [p, params]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-[1] pt-8">
      {loading ? (
        <ProductsLoading />
      ) : (
        filteredProducts.length == 0 ? (
          <ProductsEmpty search={search} />
        ) : (
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg mb-4">{search}</h2>
              <div>Filter</div>
            </div>
            <ProdutsResults products={filteredProducts} />
          </div>
        )
      )}
    </div>
  )
}

export default Search