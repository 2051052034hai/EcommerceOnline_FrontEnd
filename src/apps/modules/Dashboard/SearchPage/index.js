//Libaries
import { useEffect, useState } from 'react'
import { Row, Col, Select, Divider, Pagination, Result, Skeleton, Button } from 'antd'
import Search from 'antd/es/input/Search'

//Queries
import { useGetDataProductPage } from 'apps/queries/product'
import { useGetSubCategories } from 'apps/queries/subcategory'
import { useGetAllShops } from 'apps/queries/shop'

//Molecules
import CardItem from 'apps/components/molecules/CardItem'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const SearchPage = () => {
  const { t } = useTranslation()
  const [productSubId, setProductSubId] = useState()
  const [shopId, setShopId] = useState()
  const [subData, setSubdata] = useState([])
  const [products, setProduct] = useState([])
  const [shopsData, setShopsData] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [keyWord, setKeyWord] = useState()
  const [valueSeach, setValueSeach] = useState('')
  const [productLoading, setProductLoading] = useState(true)
  const [subName, setSubName] = useState()
  const [shopName, setShopName] = useState(t('SEARCHPRODUCT.shop_type'))
  const [isDeleteteFilter, setIsDeleteteFilter] = useState(true)

  const { data: subcateData, isLoading: subLoading } = useGetSubCategories()
  const { data: shopData, isLoading: shopLoading } = useGetAllShops()
  const { data, isLoading } = useGetDataProductPage(
    page,
    pageSize,
    keyWord,
    productSubId,
    shopId,
  )

  useEffect(() => {
    if (data) {
      setTotal(data?.total)
      setProduct(data?.data)
      setProductLoading(false)
    }
  }, [data, isLoading])

  useEffect(() => {
    setSubdata(subcateData)
  }, [subcateData, subLoading])

  useEffect(() => {
    setShopsData(shopData)
  }, [shopData, shopLoading])

  const options = subData?.map((item, index) => {
    return {
      value: index,
      label: item?.name,
      key: item?._id,
    }
  })

  const optionShops = shopsData?.map((item, index) => {
    return {
      value: index,
      label: item?.name,
      key: item?._id,
    }
  })

  const handleProductSubChange = (value, item) => {
    setSubName(value)
    setProductSubId(item.key)
    setProductLoading(true)
    setIsDeleteteFilter(true)
    setPage(1)
  }

  const handleShopChange = (value, item) => {
    setShopName(value)
    setShopId(item.key)
    setIsDeleteteFilter(true)
    setProductLoading(true)
    setPage(1)
  }

  const handleOnchangePage = (page, pageSize) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const handleClickSearch = () => {
    setProductLoading(true)
    setKeyWord(valueSeach)
  }

  const handleValueChange = (e) => {
    const { value } = e.target
    setValueSeach(value)
    setIsDeleteteFilter(true)
  }

  const handleDeleteFilter = () => {
    setValueSeach('')
    setSubName('Loại sản phẩm')
    setShopName('Cửa hàng')
    setIsDeleteteFilter(false)
    setPage(1)
    setProductSubId()
    setShopId()
    setValueSeach('')
    setKeyWord()
  }

  return (
    <>
      <Helmet>
        <title>Tìm kiếm sản phẩm</title>
      </Helmet>
      <Divider
        style={{
          fontSize: '24px',
          color: '#31a9e0',
          textTransform: 'uppercase',
        }}
      >
        {t('SEARCHPRODUCT.search_products')}
      </Divider>

      <Row className="p-5 items-center w-full justify-center">
        <Col lg={5} md={7} xs={24} className="lg:justify-center">
          <Search
            className="lg:w-11/12"
            placeholder={t('SEARCHPRODUCT.enter_product_name')}
            onChange={handleValueChange}
            value={valueSeach}
            enterButton
            onSearch={handleClickSearch}
          />
        </Col>
        <Col
          lg={5}
          md={7}
          xs={24}
          className="lg:justify-center mt-3 lg:mt-0 md:mt-0 md:mx-1"
        >
          <Select
            onChange={handleProductSubChange}
            showSearch
            className="lg:w-11/12 w-full"
            placeholder={t('SEARCHPRODUCT.search_by_type')}
            value={subName}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label?.toLowerCase() ?? '').includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label?.toLowerCase() ?? '').localeCompare(
                optionB?.label?.toLowerCase(),
              )
            }
            loading={subLoading}
            options={options}
          />
        </Col>

        <Col lg={5} md={7} xs={24} className="lg:justify-center mt-3 lg:mt-0 md:mt-0">
          <Select
            onChange={handleShopChange}
            showSearch
            value={shopName}
            className="lg:w-11/12 w-full"
            placeholder={t('SEARCHPRODUCT.product_type')}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label?.toLowerCase() ?? '').includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label?.toLowerCase() ?? '').localeCompare(
                optionB?.label?.toLowerCase(),
              )
            }
            loading={shopLoading}
            options={optionShops}
          />
        </Col>

        {(productSubId || shopId || valueSeach) && isDeleteteFilter ? (
          <>
            <Col
              lg={5}
              md={21}
              className="lg:justify-center justify-start mt-3 lg:mt-0 w-full"
            >
              <Button htmlType="text" type="primary" onClick={handleDeleteFilter}>
                {t('SEARCHPRODUCT.clear_filter')}
              </Button>
            </Col>
          </>
        ) : null}
      </Row>

      <Divider style={{ fontSize: '20px', fontWeight: 'bold' }} orientation="left">
        {t('SEARCHPRODUCT.result')}
      </Divider>

      <div className="grid gap-5 py-4 px-2 md:px-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 lg:mx-14 ">
        {productLoading ? (
          <div style={{ width: '100%' }}>
            <Skeleton
              active
              paragraph={{
                rows: 10,
                width: '1200px',
              }}
            />
          </div>
        ) : (
          products?.length !== 0 &&
          products.map((item, index) => <CardItem key={index} product={item} />)
        )}
      </div>

      {products?.length === 0 && !productLoading && (
        <div className="flex justify-center items-center w-full">
          <Result status="404" title="Không có sản phẩm phù hợp với bạn" />
        </div>
      )}

      <div className="flex justify-center py-12">
        <Pagination
          className="text-base"
          onChange={handleOnchangePage}
          defaultCurrent={1}
          total={total}
          current={page}
          pageSize={10}
        />
      </div>
    </>
  )
}

export default SearchPage
