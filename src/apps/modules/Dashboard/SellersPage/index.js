//libaries
import React, { useMemo, useState } from 'react'
import {
  AppstoreOutlined,
  AreaChartOutlined,
  BorderInnerOutlined,
} from '@ant-design/icons'
import { Col, Modal, Row, Space, DatePicker, Input, Select, Divider } from 'antd'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Helmet } from 'react-helmet'

//Store
import { selectCurrentUser } from 'store/userSlice/userSelector'

//Molecules
import DrawerLeft from 'apps/components/molecules/DrawerLeft'
import MenuSellerPage from 'apps/components/molecules/MenuSellerPage'

//Services
import {
  generateExcelReport,
  getItem,
  handleGetFullEmail,
  renderPage,
} from 'apps/services/utils/sellersPage'

//Queries
import { useGetShopbyUserId } from 'apps/queries/shop/useGetShopbyUserId'
import { useGetOrderByShop } from 'apps/queries/order'

const SellersPage = (key) => {
  const [selectedKeys, setSelectedKeys] = useState('1')
  const currentUser = useSelector(selectCurrentUser)
  const { data: shop_data } = useGetShopbyUserId(currentUser?._id)
  const { data: new_data } = useGetOrderByShop(shop_data?._id)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const { RangePicker } = DatePicker

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
      getItem('Xuất báo cáo', '9'),
    ]),
  ]

  const handleExcel = () => {
    let arrCheck = {
      email,
      fromDate,
      toDate,
    }
    generateExcelReport(new_data, arrCheck)
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleOnclick = ({ key }) => {
    if (key == '9') {
      setIsModalOpen(true)
    } else {
      setSelectedKeys(key)
    }
  }

  const allFullEmail = handleGetFullEmail(new_data)

  const handleChange = (value) => {
   setEmail(value)
  }
  const onOpenChange = (_, value) => {
    setFromDate(value[0])
    setToDate(value[1])
  }
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

        <Col lg={19}>{renderPage(selectedKeys)}</Col>
      </Row>

      <Modal open={isModalOpen} onOk={handleExcel} onCancel={handleCancel}>
        <Divider
          style={{
            fontSize: '20px',
            color: '#31a9e0',
            textTransform: 'uppercase',
          }}
        >
          Báo cáo quản lý đơn hàng
        </Divider>
        <Row className="mt-3">
          <label className="font-medium test-base">Chọn ngày: </label>
          <Space className="ml-3">
            <RangePicker onChange={onOpenChange} />
          </Space>
        </Row>

        <Row className="mt-3">
          <label className="mb-1 font-medium test-base">Khách hàng: </label>
          <Select
            mode="tags"
            style={{
              width: '100%',
            }}
            placeholder="Chọn khách hàng..."
            onChange={handleChange}
            options={allFullEmail}
          />
        </Row>
      </Modal>
    </>
  )
}

export default SellersPage
