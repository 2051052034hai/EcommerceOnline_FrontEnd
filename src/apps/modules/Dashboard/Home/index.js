import React, { useEffect, useState } from 'react'
import { Divider, Pagination } from 'antd'

//Components
import CardItem from 'apps/components/molecules/CardItem'
import Slider from 'apps/components/molecules/Slider'
import SlideProduct from 'apps/components/molecules/SliderProduct'
import { useGetDataProductPage, useGetTopSaleProduct } from 'apps/queries/product'
import ProductSkeleton from 'apps/components/molecules/ProductSkeleton'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()
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
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <Slider />
      <div className="mx-auto px-2 max-w-screen-xl md:px-2 sm:px-1">
        <Divider
          style={{
            fontSize: '24px',
            color: '#31a9e0',
            textTransform: 'uppercase',
          }}
        >
          {t('HOME.selling_products')}
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
      <div className="container mx-auto py-9 md:py-12">
        <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
          <div className="flex flex-col md:flex-row items-strech justify-between bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12">
            <div className="flex flex-col justify-center md:w-1/2">
              <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
                Best Deal
              </h1>
              <p className="text-base lg:text-xl text-gray-800 dark:text-white mt-2">
                Save upto <span className="font-bold">50%</span>
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
              <img
                src="https://i.ibb.co/J2BtZdg/Rectangle-56-1.png"
                alt=""
                className=""
              />
            </div>
          </div>
          <div className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
                Game Console
              </h1>
              <p className="text-base lg:text-xl text-gray-800 dark:text-white">
                Save Upto <span className="font-bold">30%</span>
              </p>
            </div>
            <div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
              <img
                src="https://i.ibb.co/rGfP7mp/Rectangle-59-1.png"
                alt=""
                class="md:w-20 md:h-20 lg:w-full lg:h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12 mx-auto px-2 max-w-screen-xl md:px-2 sm:px-1">
        <Divider
          style={{
            fontSize: '24px',
            color: '#31a9e0',
            textTransform: 'uppercase',
          }}
        >
          {t('HOME.all_products')}
        </Divider>
        <div className="grid gap-5 py-4 px-2 md:px-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
      <div className="container relative mx-auto flex flex-col justify-center content-center px-12 py-20 bg-gradient-to-tl from-blue-900 to-blue-500 rounded shadow-lg overflow-hidden crossing-shapes mb-10">
        <div className="copy-container text-center mb-5 z-10">
          <p className="text-gray-50 text-4xl font-bold">{t('HOME.banner')}</p>
        </div>
        <div className="button-container mx-auto mt-8 sm:mt-0 z-10">
          <div className="inline">
            <label className="" for="email"></label>
            <input
              required=""
              placeholder="Enter your email"
              className="rounded mb-2 pl-6 pr-20 py-2"
              name="email"
              type="email"
            />
          </div>
          <button className="bg-blue-400 text-gray-50 px-6 py-2 mx-0 sm:mx-1 rounded text-base shadow hover:bg-blue-500 hover:shadow-lg transition ease-in-out mt-3 xs:mt-0">
            Notify Me
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
