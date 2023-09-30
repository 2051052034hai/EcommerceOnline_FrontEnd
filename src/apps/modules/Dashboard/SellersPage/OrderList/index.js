//libaries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons'
import { Divider, Popconfirm, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

//Molecules
import ViewInfoOrder from 'apps/components/molecules/ViewInfoOrder'

//Queries
import { useGetOrderByShop, useUpdateStatusPayment } from 'apps/queries/order'
import { useGetShopbyUserId } from 'apps/queries/shop/useGetShopbyUserId'


//Utils
import {
  handleArrDataOrder,
  handleArrProductByOrderId,
} from 'apps/services/utils/sellersPage'

//Store
import { selectCurrentUser } from 'store/userSlice/userSelector'

const OrderList = () => {
  const currentUser = useSelector(selectCurrentUser)
  const [orderData, setOrderData] = useState([])
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [status, setStatus] = useState(false)
  const [orderId, setOrderId] = useState()

  const { data: shop_data } = useGetShopbyUserId(currentUser?._id)
  const { data: new_data, isLoading } = useGetOrderByShop(shop_data?._id)
  const { mutation } = useUpdateStatusPayment()

  useEffect(() => {
    setOrderData(new_data?.data)
    setTotal(new_data?.total)
  }, [new_data])

  const dataOrderList = handleArrDataOrder(orderData)
  const dataProductByOrderId = handleArrProductByOrderId(orderData, orderId)

  const handleViewProductList = (orderId) => {
    setOrderId(orderId)
    setStatus(true)
  }

  //Load data
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 1,
      render: (_, __, index) => <h3 className="font-medium">{index + 1}</h3>,
    },
    {
      title: 'Người Mua',
      dataIndex: 'username',
      key: 'username',
      render: (_, record) => (
        <h3 className="font-medium text-blue-800">{record?.username}</h3>
      ),
    },

    {
      title: 'Ngày Mua',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 250,
      render: (_, record) => <h3 className="font-medium ">{record?.createdAt}</h3>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',

      render: (_, record) => {
        let color = record?.status ? 'green' : 'volcano'
        let title = record?.status ? 'đã thanh toán' : 'chưa thanh toán'
        return (
          <>
            {!record?.status && (
              <Popconfirm
                title="Chuyển trạng thái sang đã thanh toán?"
                onConfirm={() =>
                  handleUpdateStatusPayment(shop_data?._id, record?.orderId)
                }
              >
                <span>
                  <FontAwesomeIcon
                    icon={faPen}
                    style={{ color: '#1b61da', cursor: 'pointer' }}
                  />
                </span>
              </Popconfirm>
            )}
            {!record?.status ? (
              <Tag className="font-medium ml-2" color={color}>
                {title.toUpperCase()}
              </Tag>
            ) : (
              <Tag className="font-medium ml-5" color={color}>
                {title.toUpperCase()}
              </Tag>
            )}
          </>
        )
      },
    },
    {
      title: 'Danh sách sản phẩm',
      dataIndex: 'view',
      key: 'view',

      render: (_, record) => (
        <h3
          onClick={() => handleViewProductList(record?.orderId)}
          className="font-medium "
        >
          <FontAwesomeIcon
            icon={faEye}
            style={{ color: '#516e9e', marginRight: '3px' }}
          />
          Xem chi tiết
        </h3>
      ),
    },
  ]

  const columnsListProduct = [
    {
      title: '',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 400,
      render: (_, record) => {
        return (
          <Link to={`/product/${record?.id}`}>
            <img
              className="lg:w-20 w-16 m-auto"
              alt="not found"
              src={record?.thumbnail}
            />
          </Link>
        )
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      width: 600,
      render: (_, record) => (
        <h3 className="text-justify font-medium">{record?.productName}</h3>
      ),
    },

    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (
        <h3 className="font-medium">
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(record?.price)}
        </h3>
      ),
    },

    {
      title: 'Số Lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 150,
      render: (_, record) => (
        <h3 className="font-medium text-center">{record?.quantity}</h3>
      ),
    },
  ]

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

  const handleUpdateStatusPayment = (shopId, orderId) => {
    const data = {
      shopId,
      orderId
    }
    if(data)
    {
      mutation.mutate(data)
    }
   
  }
  return (
    <>
      <div>
        <Divider
          style={{
            fontSize: '24px',
            color: '#31a9e0',
            textTransform: 'uppercase',
          }}
        >
          Đơn Hàng
        </Divider>
        <Table
          columns={columns}
          dataSource={dataOrderList}
          pagination={paginationConfig}
          loading={isLoading}
          scroll={{ x: 1100 }}
        />
        
      </div>

      <div>
        <ViewInfoOrder
          columns={columnsListProduct}
          data={dataProductByOrderId}
          status={status}
          onClose={() => setStatus(false)}
          cursor="pointer"
          total={dataProductByOrderId?.length}
        />
      </div>
    </>
  )
}

export default OrderList
