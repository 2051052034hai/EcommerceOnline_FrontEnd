import React from "react";
import CardItem from "apps/components/molecules/CardItem";
import Slider from "apps/components/molecules/Slider";
import SlideProduct from "apps/components/molecules/SliderProduct";
import { useGetDataProduct } from "apps/queries/product/useGetDataProduct";
import ProductSkeleton from "apps/components/molecules/ProductSkeleton";

const Home = () => {
  const { data, isLoading } = useGetDataProduct();

  return (
    <>
      <Slider />
      <div className="mx-auto px-2 max-w-screen-xl md:px-2 sm:px-1">
        {isLoading ? (
          <SlideProduct
            products={Array.from(Array(5), (_, index) => (
              <ProductSkeleton />
            ))}
          />
        ) : (
          <SlideProduct products={data} />
        )}
      </div>
      {isLoading ? (
        Array.from(10).map((_, index) => <p>TETS</p>)
      ) : (
        <section className="mt-12 mx-auto px-2 max-w-screen-xl md:px-2 sm:px-1">
          <div className="grid gap-5 py-4 px-2 md:px-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {data?.map((items, index) => (
              <CardItem key={index} product={items} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
