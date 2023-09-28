import React, { useEffect, useState } from 'react'
import { Button, Drawer, Space, Table } from 'antd'

const ViewInfoOrder = ({ columns, data, status, onClose, total}) => {
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
                Cancel
              </Button>
            </Space>
          }
        >
          <Table columns={columns} dataSource={data}  pagination={paginationConfig}/>
         {/* <div>
          <h3>Số lượng: <span>150</span></h3>
          <h3>Tổng tiền: <span>150000 vnđ</span></h3>
         </div> */}
        </Drawer>
      </>
    )
  }
}

export default ViewInfoOrder
