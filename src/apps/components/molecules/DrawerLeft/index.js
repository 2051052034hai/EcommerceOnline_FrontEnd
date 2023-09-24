import React, { useState } from 'react'
import { Drawer, Space } from 'antd'
import { BorderRightOutlined } from '@ant-design/icons'

//MenuSellerPage
import MenuSellerPage from '../MenuSellerPage'

const DrawerLeft = ({ data, onClick }) => {
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  data?.forEach((items) => {
    items.children.forEach((item) => {
      item.onClick = () => {
        setOpen(false)
      }
    })
  })

  return (
    <>
      <Space className="my-3 ml-3">
        <div
          className="flex border border-gray-100 border-solid py-1 px-2 rounded-lg"
          onClick={showDrawer}
        >
          <div>
            <BorderRightOutlined style={{ fontSize: '20px' }} />
          </div>
          <div>
            <span className="ml-1 font-medium" style={{ fontSize: '16px' }}>
              Danh Mục Bán Hàng
            </span>
          </div>
        </div>
      </Space>
      <div className="relative">
        <Drawer
          className="bg-red-600"
          title="Danh mục bán hàng"
          placement={'left'}
          width={300}
          onClose={onClose}
          open={open}
        >
          <MenuSellerPage data={data} onClick={onClick} />
        </Drawer>
      </div>
    </>
  )
}
export default DrawerLeft
