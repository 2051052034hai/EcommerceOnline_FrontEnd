import React, { useEffect, useState } from "react";
import { Divider, Pagination } from "antd";

//Components
import CardItem from "apps/components/molecules/CardItem";
import Slider from "apps/components/molecules/Slider";
import SlideProduct from "apps/components/molecules/SliderProduct";
import { useGetDataProductPage } from "apps/queries/product/useGetDataProduct";
import ProductSkeleton from "apps/components/molecules/ProductSkeleton";

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetDataProductPage(page);
  const [products, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (data) {
      setTotal(data.total);
      setProduct(data.data);
    }
  }, [data]);

  const handleOnchangePage = (page, pageSize) => {
    setPage(page);
  };

  return (
    <>
      <Slider />
      <div className="mx-auto px-2 max-w-screen-xl md:px-2 sm:px-1">
        <Divider
          style={{
            fontSize: "24px",
            color: "#31a9e0",
            textTransform: "uppercase",
          }}
        >
          Sản Phẩm Bán Chạy
        </Divider>

        {isLoading ? (
          <SlideProduct
            products={Array.from(Array(5), (_, index) => (
              <ProductSkeleton />
            ))}
          />
        ) : (
          <SlideProduct products={products} />
        )}
      </div>

      <section className="mt-12 mx-auto px-2 max-w-screen-xl md:px-2 sm:px-1">
        <Divider
          style={{
            fontSize: "24px",
            color: "#31a9e0",
            textTransform: "uppercase",
          }}
        >
          TẤT CẢ SẢN PHẨM
        </Divider>
        <div className="grid gap-5 py-4 px-2 md:px-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {products?.map((items, index) => (
            <CardItem key={index} product={items} />
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            className="text-base"
            onChange={handleOnchangePage}
            defaultCurrent={1}
            total={total}
            current={page}
            pageSize={5}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
