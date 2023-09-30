import React, { useEffect, useState } from 'react'
import { Divider, Pagination } from 'antd'

//Components
import CardItem from 'apps/components/molecules/CardItem'
import Slider from 'apps/components/molecules/Slider'
import SlideProduct from 'apps/components/molecules/SliderProduct'
import { useGetDataProductPage, useGetTopSaleProduct } from 'apps/queries/product'
import ProductSkeleton from 'apps/components/molecules/ProductSkeleton'

const Home = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [products, setProduct] = useState([])
  const [productTopSale, setProductTopSale] = useState([])

  const { data } = useGetDataProductPage(page, pageSize)
  const { data: dataTop, isLoading: isLoadingDataTop } = useGetTopSaleProduct()

  const [total, setTotal] = useState(0)
  useEffect(() => {
    if (data) {
      setTotal(data?.total)
      setProduct(data?.data)
    }
  }, [data])

  useEffect(() => {
    setProductTopSale(dataTop?.data)
  }, [dataTop?.data])

  const handleOnchangePage = (page, pageSize) => {
    setPage(page)
    setPageSize(pageSize)
  }

  return (
    <>
      <Slider />
      <div className="mx-auto px-2 max-w-screen-xl md:px-2 sm:px-1">
        <Divider
          style={{
            fontSize: '24px',
            color: '#31a9e0',
            textTransform: 'uppercase',
          }}
        >
          Sản Phẩm Bán Chạy
        </Divider>

        {isLoadingDataTop ? (
          <SlideProduct
            products={Array.from(Array(5), (_, index) => (
              <ProductSkeleton />
            ))}
          />
        ) : (
          <SlideProduct products={productTopSale} />
        )}
      </div>

      <section className="mt-12 mx-auto px-2 max-w-screen-xl md:px-2 sm:px-1">
        <Divider
          style={{
            fontSize: '24px',
            color: '#31a9e0',
            textTransform: 'uppercase',
          }}
        >
          TẤT CẢ SẢN PHẨM
        </Divider>
        <div className="grid gap-5 py-4 px-2 md:px-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {products?.map((items, index) => (
            <CardItem key={index} product={items} />
          ))}
        </div>
        <div className="flex justify-center py-12">
          <Pagination
            className="text-base"
            onChange={handleOnchangePage}
            defaultCurrent={1}
            total={total}
            current={page}
            pageSize={pageSize}
          />
        </div>
      </section>
    </>
  )
}

export default Home
