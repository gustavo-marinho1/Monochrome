import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsEmpty } from "../../components/products/empty";
import { ProductsLoading } from "../../components/products/loading";
import { ProdutsResults } from "../../components/products/results";
import type { FilterSearch } from "../../lib/search";
import apiProducts from "../../lib/api-products";
import { ModalFilter } from "@/components/search/modal-filter";
import { Pagination } from "@/components/search/pagination";

function Search() {
  const p = useParams();
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState([]);

  const [filter, setFilter] = useState<FilterSearch>({
    search: "",
    page: Number(params.get("page")) || 1,
    color: null,
    sort: null
  });

  useEffect(() => {
    const searchParams = params.get("search");
    const pageParams = params.get("page");
    const colorParams = params.get("color");
    const sortParams = params.get("sort");

    if (searchParams) {
      setFilter({
        search: searchParams,
        page: Number(pageParams) || 1,
        color: colorParams || null,
        sort: sortParams === "price_desc" && "price_desc" || sortParams === "price_asc" && "price_asc" || null
      });
    }
    else
      navigate("/");
  }, [p]);

  useEffect(() => {
    if (filter.search) getProducts();
  }, [filter]);

  const changeFilter = (color: string | null, sort: string | null) => {
    if (color === filter.color && sort === filter.sort) return;
    const filterColor = color ? `&color=${color}` : ``;
    const filterSort = sort ? `&sort=${sort}` : ``;
    navigate(`/search?search=${filter.search}&page=${filter.page}` + filterColor + filterSort);
  }

  const changePage = (page: number) => {
    const color = filter.color ? `&color=${filter.color}` : ``;
    const sort = filter.sort ? `&sort=${filter.sort}` : ``;
    navigate(`/search?search=${filter.search}&page=${page}` + color + sort);
  }

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await apiProducts.get(`/products`, {
        params: {
          search: filter.search,
          page: filter.page,
          color: filter.color,
          sort: filter.sort
        }
      });
      if (res.status === 200) {
        setProducts(res.data);
      }
    } catch (error: Error | any) {
      console.log(error);
      console.log(error.response);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-[1] pt-8">
      {loading ? (
        <ProductsLoading />
      ) : (
        products.length == 0 ? (
          <ProductsEmpty search={filter.search} />
        ) : (
          <div className="container mx-auto px-4">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg">{filter.search}</h2>
              <div>
                <ModalFilter filter={filter} changeFilter={changeFilter} disabled={loading} />
              </div>
            </div>

            <ProdutsResults products={products} />

            <Pagination page={filter.page || 1} setPage={changePage} disabled={loading} />

          </div>
        )
      )}
    </div>
  )
}

export default Search