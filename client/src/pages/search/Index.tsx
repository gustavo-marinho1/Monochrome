import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../lib/products";
import { ProductsEmpty } from "../../components/products/empty";
import { ProductsLoading } from "../../components/products/loading";
import { ProdutsResults } from "../../components/products/results";
import type { FilterSearch } from "../../lib/search";
import apiProducts from "../../lib/api-products";

function Search() {
  const p = useParams();
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<FilterSearch>({
    search: "",
    page: Number(params.get("page")) || 1,
    color: "",
    sort: "price_asc"
  });

  useEffect(() => {
    const searchParams = params.get("search");
    const pageParams = params.get("page");
    const colorParams = params.get("color");
    const sortParams = params.get("sort");

    if (searchParams) {
      setFilters({
        search: searchParams,
        page: Number(pageParams) || 1,
        color: colorParams || "",
        sort: sortParams === "price_desc" ? "price_desc" : "price_asc"
      });
    }
    else
      navigate("/");
  }, [p]);

  useEffect(() => {
    if (filters.search) {
      getProducts();
    }
  }, [filters]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await apiProducts.get(`/products?search=${filters.search}&page=${filters.page}&color=${filters.color}&sort=${filters.sort}`);
      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error: Error | any) {
      console.log(error);
      console.log(error.response);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  //navigate(`/search?search=${filters.search}&page=${filters.page}&color=${filters.color}&sort=${filters.sort}`);

  return (
    <div className="flex-[1] pt-8">
      {loading ? (
        <ProductsLoading />
      ) : (
        products.length == 0 ? (
          <ProductsEmpty search={filters.search} />
        ) : (
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg mb-4">{filters.search}</h2>
              <div>Filter</div>
            </div>
            <ProdutsResults products={products} />
          </div>
        )
      )}
    </div>
  )
}

export default Search