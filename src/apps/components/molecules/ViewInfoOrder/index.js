import React, { useEffect, useState } from 'react'
import { Button, Drawer, Space, Table } from 'antd'

const ViewInfoOrder = ({ columns, data, status, onClose, total }) => {
  const [pageSize, setPageSize] = useState(5)
  const [open, setOpen] = useState(status)

  useEffect(() => {
    setOpen(status)
  }, [status])

  const onCloseDrawer = () => {
    onClose()
  }

  //Pagination
  const paginationConfig = {
    pageSize: pageSize,
    total: total,
    showSizeChanger: true,
    locale: {
      items_per_page: '/ Trang',
    },
    position: ['bottomCenter'],
    onChange: (_, pageSize) => {
      setPageSize(pageSize)
    },
  }

  if (columns && data?.length > 0) {
    return (
      <>
        <Drawer
          title={`Danh sách sản phẩm`}
          placement="right"
          width={600}
          onClose={onCloseDrawer}
          open={open}
          extra={
            <Space>
              <Button type="primary" onClick={onCloseDrawer}>
                Thoát
              </Button>
            </Space>
          }
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={paginationConfig}
            className="overscroll-x-auto"
            scroll={{ x: 500 }}
          />
        </Drawer>
      </>
    )
  }
}

export default ViewInfoOrder
