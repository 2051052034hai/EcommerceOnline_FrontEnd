import React, { useEffect, useState } from 'react'
import { Button, Drawer, Space, Table } from 'antd'

const ViewInfoOrder = ({ columns, data, status, onClose }) => {
  const [open, setOpen] = useState(status)

  useEffect(() => {
    setOpen(status)
  }, [status])

  const onCloseDrawer = () => {
    onClose()
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
          <Table columns={columns} dataSource={data} />
        </Drawer>
      </>
    )
  }
}

export default ViewInfoOrder
