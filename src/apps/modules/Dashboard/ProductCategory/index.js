//Libralies
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AppstoreOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Drawer, Pagination, Col, Divider, Result, Row } from 'antd'
import { faFilter, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Compoments
import { useGetProductBySubId } from 'apps/queries/subcategory'
import CardItem from 'apps/components/molecules/CardItem'

//CSS from styled.js
import { customItems, customStyle } from './styled'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const ProductCategory = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [selectedTitleId, setSelectedTitleId] = useState('0')
  const [selectedPriceId, setSelectedPriceId] = useState('0')
  const [maxPrice, setMaxPrice] = useState()
  const [minPrice, setMinPrice] = useState()
  const [sort, setSort] = useState()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(4)
  const [total, setTotal] = useState(0)
  const [productsSub, setProductsSub] = useState([])

  const { id } = useParams()
  const { data, isLoading } = useGetProductBySubId(
    id,
    minPrice,
    maxPrice,
    sort,
    page,
    pageSize,
  )

  useEffect(() => {
    setTotal(data?.total)
    setProductsSub(data?.product)
  }, [data, isLoading])

  useEffect(() => {
    setPage(1)
  }, [id])

  const showDrawer = (e) => {
    e.stopPropagation()
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const handleFilterAll = (keyId, typeSoft) => {
    setSelectedTitleId(keyId)

    switch (typeSoft) {
      case 'default':
        setSort(undefined)
        break
      case 'ascending':
        setSort('price')
        break
      case 'promotion':
        setSort('-discountPercentage')
        break
      case 'decrease':
        setSort('-price')
        break

      default:
        break
    }
  }

  const handleOnchangePage = (page, pageSize) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const softPrice = (a, b, keyPrice) => {
    setSelectedPriceId(keyPrice)
    setMinPrice(a)
    setMaxPrice(b)
  }

  const handleDeleteFillter = () => {
    setSelectedPriceId('1')
    setMinPrice(undefined)
    setMaxPrice(undefined)
  }

  const getItem = (label, key, icon, children, style, onClick) => {
    return {
      key,
      icon,
      children,
      label,
      style,
      onClick,
    }
  }

  const menuLeftSlice = [
    getItem(
      'Khoảng giá',
      'sub1',
      <AppstoreOutlined />,
      [
        getItem('Tất cả', '1', null, null, customItems, () =>
          softPrice(undefined, undefined, '1'),
        ),

        getItem('Từ dưới 100k', '2', null, null, customItems, () =>
          softPrice(1000, 100000, '2'),
        ),
        getItem('Từ 100 - 300k', '3', null, null, customItems, () =>
          softPrice(100000, 300000, '3'),
        ),
        getItem('Từ 300 - 700k', '4', null, null, customItems, () =>
          softPrice(300000, 700000, '4'),
        ),
        getItem('Từ 700 - 1 triệu', '5', null, null, customItems, () =>
          softPrice(700000, 1000000, '5'),
        ),
        getItem('Từ 1 triệu - 3 triệu', '6', null, null, customItems, () =>
          softPrice(1000000, 3000000, '5'),
        ),
      ],
      customStyle,
    ),
  ]

  function getSubItemsBySubKey(menuSlice, subKey) {
    const subItem = menuSlice.find((item) => item.key === subKey)
    return subItem ? subItem.children : []
  }

  const sub1Items = getSubItemsBySubKey(menuLeftSlice, 'sub1')
  const sub2Items = getSubItemsBySubKey(menuLeftSlice, 'sub2')

  const itemSlice = [
    {
      label: 'Mặc định',
      key: '0',
      value: 'default',
    },
    {
      label: 'Khuyến mãi tốt',
      key: '1',
      value: 'promotion',
    },
    {
      label: 'Giá giảm dần',
      key: '2',
      value: 'decrease',
    },
    {
      label: 'Giá tăng dần',
      key: '3',
      value: 'ascending',
    },
  ]

  const newItemSlice = itemSlice?.map((item, index) => {
    const isSelected = selectedTitleId === item.key

    return {
      label: (
        <div
          key={index}
          className={`${
            isSelected ? 'text-purple-900' : 'text-black'
          } border-b-2 border-gray-100 py-3 font-medium`}
          onClick={() => handleFilterAll(item.key, item.value)}
          data-key={item.key}
        >
          <p>{item.label}</p>
        </div>
      ),
      key: item.key,
    }
  })

  return (
    <>
      <Helmet>
        <title>Danh mục sản phẩm</title>
      </Helmet>
      <div className="bg-slate-100">
        <Row className="lg:hidden lg:bg-black">
          <Drawer
            placement="top"
            closable={false}
            onClose={onClose}
            open={open}
            key="top"
            className="lg:hidden lg:bg-black"
          >
            <Row className="py-2.5 w-full ">
              <Divider style={{ fontSize: '20px' }} orientation="left">
                Theo giá
              </Divider>
              <Row gutter={[16, 16]}>
                {sub1Items?.map((item, index) => {
                  return (
                    <Col key={index} sm={8} onClick={item.onClick}>
                      <div key={index}>
                        <span
                          className={`px-1 py-1 border border-solid border-gray-300 rounded
                                        ${
                                          selectedPriceId === item.key
                                            ? 'bg-indigo-600'
                                            : 'bg-white'
                                        }
                                        ${
                                          selectedPriceId === item.key
                                            ? 'text-white'
                                            : 'text-black'
                                        }
                                        `}
                        >
                          {item.label}
                        </span>
                      </div>
                    </Col>
                  )
                })}
                {/* <Divider style={{ fontSize: '20px' }} orientation="left">
                  Thương hiệu
                </Divider>
                <Row gutter={[4, 32]}>
                  {sub2Items?.map((item, index) => {
                    return (
                      <Col span={12} className="text-center">
                        <div key={index}>
                          <span className="px-1 py-1 border border-solid border-indigo-600 px-3 rounded">
                            {item.label}
                          </span>
                        </div>
                      </Col>
                    )
                  })}
                </Row> */}

                <Row className="mt-32 w-full">
                  <Col className="text-center p-1" onClose="false" span={12}>
                    <div className="border-indigo-600 border-2 border-solid bg-indigo-600 text-white py-2.5 rounded font-semibold text-base">
                      <span onClick={handleDeleteFillter}>Xoá bộ lọc</span>
                    </div>
                  </Col>

                  <Col span={12} onClick={onClose} className="text-center p-1">
                    <div className="border-indigo-600 border-2 border-solid text-blue-500 py-2.5 rounded font-semibold text-base">
                      <span>Đóng</span>
                    </div>
                  </Col>
                </Row>
              </Row>
            </Row>
          </Drawer>
        </Row>
        <Dropdown
          menu={{
            items: newItemSlice,
          }}
          trigger={['click']}
        >
          <Row className="bg-white lg:hidden">
            <Row className="mx-4 py-2.5 w-full">
              <Col lg={0} md={24} xs={19}>
                <span
                  className="text-red-600 text-base font-medium"
                  onClick={(e) => e.preventDefault()}
                >
                  Mặc định
                </span>
                <span
                  onClick={(e) => e.preventDefault()}
                  className="text-red-600 text-base font-medium"
                >
                  <FontAwesomeIcon className="text-xl mb-0.5 ml-1" icon={faSortDown} />
                </span>
              </Col>

              <Col lg={0} md={0} xs={5} className="ml-auto">
                <span
                  className="text-red-600 text-base font-medium"
                  onClick={(e) => showDrawer(e)}
                >
                  Bộ lọc
                </span>
                <span className="text-red-600 text-base font-medium">
                  <FontAwesomeIcon className="text-sm mb-0 ml-1" icon={faFilter} />
                </span>
              </Col>
            </Row>
          </Row>
        </Dropdown>
        <Row className="lg:mx-20 lg:py-8 sm:mx-2 sm:py-1 mx-2 ">
          <Col xs={0} sm={10} md={8} lg={6}>
            <Menu
              className="lg:w-64 md:w-60 sm:w-48 w-24"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1', 'sub2']}
              mode="inline"
              theme="light"
              items={menuLeftSlice}
            />
          </Col>
          <Col xs={24} sm={14} md={16} lg={18}>
            <Row gutter={[18, 16]}>
              <Col className="gutter-row text-center" lg={4} xs={0}>
                <div className="font-medium py-2.5 pr-px text-black lg:text-base rounded-lg ">
                  Sắp xếp theo:{' '}
                </div>
              </Col>
              {itemSlice?.map((item, index) => (
                <Col
                  key={index}
                  className="gutter-row font-normal px-0 text-center hover:cursor-pointer"
                  lg={4}
                  xs={0}
                  onClick={() => handleFilterAll(item.key, item.value)}
                >
                  <div
                    className={`text-${selectedTitleId === item.key ? 'white' : 'black'} 
                    ${selectedTitleId === item.key ? 'bg-indigo-500' : 'bg-white'} 
                  rounded-2xl py-2.5 font-medium`}
                  >
                    {item.label}
                  </div>
                </Col>
              ))}
            </Row>
            <Row gutter={[18, 16]}>
              {productsSub && productsSub.length === 0 ? (
                <div className="flex justify-center items-center w-full">
                  <Result status="404" title="Không có sản phẩm phù hợp với bạn" />
                </div>
              ) : (
                productsSub?.map((product, index) => (
                  <Col key={index} className="gutter-row" xs={12} sm={12} md={8} lg={6}>
                    <CardItem key={index} product={product} />
                  </Col>
                ))
              )}
            </Row>

            {productsSub && productsSub.length > 0 ? (
              <Row className="flex justify-center py-8">
                <div>
                  <Pagination
                    className="text-base"
                    onChange={handleOnchangePage}
                    defaultCurrent={page}
                    total={total}
                    current={page}
                    pageSize={pageSize}
                  />
                </div>
              </Row>
            ) : null}
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ProductCategory
