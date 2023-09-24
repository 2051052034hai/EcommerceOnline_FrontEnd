//libaries
import React, { useState } from 'react'
import {
  AppstoreOutlined,
  AreaChartOutlined,
  BorderInnerOutlined,
} from '@ant-design/icons'
import { Col, Row } from 'antd'

//Molecules
import DrawerLeft from 'apps/components/molecules/DrawerLeft'
import MenuSellerPage from 'apps/components/molecules/MenuSellerPage'

//Services
import { getItem } from 'apps/services/utils/sellersPage'

import ProductList from './ProductList'
import AddProduct from './AddProduct'
import OrderList from './OrderList'
import StatisticsPage from './Statistics'

const SellersPage = () => {
  const [selectedKeys, setSelectedKeys] = useState('1')

  const items = [
    getItem('Quản Lý Sản Phẩm', 'sub1', <AppstoreOutlined />, [
      getItem('Tất Cả Sản Phẩm', '1'),
      getItem('Thêm Sản Phẩm', '2'),
    ]),
    getItem('Quản Lý Đơn Hàng', 'sub2', <BorderInnerOutlined />, [
      getItem('Tất Cả ', '5'),
      getItem('Đơn Huỷ', '6'),
      getItem('Trả Hàng/Hoàn Tiền', '7'),
    ]),
    getItem('Dữ Liệu', 'sub3', <AreaChartOutlined />, [
      getItem('Phân Tích Bán Hàng ', '8'),
    ]),
  ]

  const handleOnclick = ({ key }) => {
    setSelectedKeys(key)
  }

  const renderPage = (key) => {
    switch (key) {
      case '1':
        return <ProductList />
      case '2':
        return <AddProduct />

      case '5':
        return <OrderList />

      case '8':
        return <StatisticsPage />
      
      default:
        return 'not found key'
    }
  }

  return (
    <>
      <Row className="block lg:hidden ">
        <DrawerLeft data={items} onClick={handleOnclick} />
      </Row>
      <Row>
        <Col lg={5} className="hidden lg:block ">
          <MenuSellerPage data={items} onClick={handleOnclick} />
        </Col>
        <Col lg={19}>{renderPage(selectedKeys)}</Col>
      </Row>
    </>
  )
}

export default SellersPage
