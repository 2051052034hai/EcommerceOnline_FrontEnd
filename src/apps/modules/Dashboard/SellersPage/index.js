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
import { getItem, renderPage } from 'apps/services/utils/sellersPage'
import { Helmet } from 'react-helmet'

const SellersPage = (key) => {
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

  const handleCheckedPage = (isHidden) => {}

  return (
    <>
      <Helmet>
        <title>Quản lý bán hàng</title>
      </Helmet>
      <Row className="block lg:hidden">
        <DrawerLeft data={items} onClick={handleOnclick} />
      </Row>
      <Row>
        <Col lg={5} className="hidden lg:block ">
          <MenuSellerPage data={items} onClick={handleOnclick} />
        </Col>

        <Col lg={19}>{renderPage(selectedKeys, handleCheckedPage)}</Col>
      </Row>
    </>
  )
}

export default SellersPage
