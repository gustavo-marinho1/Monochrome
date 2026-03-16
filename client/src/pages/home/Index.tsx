//import { ProductCard } from "../../components/products/product-card";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section>
        <div className="">
          <Link to="">
            <div className="relative inline dark:hidden flex-[1]">
              <img src="./moon-runner-white.png" className="flex-[1]" />
              <div className="absolute bottom-3 w-full flex flex-col items-center gap-1">
                <span className="text-xl font-semibold uppercase">
                  Moon runner
                </span>
                <button className="bg-black px-3 py-2 text-white rounded-lg">
                  Shop now
                </button>
              </div>
            </div>
          </Link>
          <Link to="">
            <div className="relative hidden dark:inline flex-[1]">
              <img src="./moon-runner-black.png" className="flex-[1]" />
              <div className="absolute bottom-3 w-full flex flex-col items-center gap-1">
                <span className="text-xl font-semibold uppercase">
                  Moon runner
                </span>
                <button className="bg-white px-3 py-2 text-black rounded-lg">
                  Shop now
                </button>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section id="home-products-grid">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 py-5">
          {/* {[].map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              subtitle={product.category}
              price={product.price}
              image={product.image}
            />
          ))} */}
        </div>
      </section>
    </>
  );
}

export default Home