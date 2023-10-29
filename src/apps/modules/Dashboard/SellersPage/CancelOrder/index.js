//libaries
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons'
import { Divider, Popconfirm, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

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
import { getTitleForProvider } from 'apps/services/utils/chart'

//Store
import { selectCurrentUser } from 'store/userSlice/userSelector'
import TableFilterAll from 'apps/components/molecules/TableFilterAll'
import { useGetCancelOrderByShop } from 'apps/queries/order/useGetCancelOrderByShop'

const CancelOrder = () => {
  const currentUser = useSelector(selectCurrentUser)
  const [orderData, setOrderData] = useState([])
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [status, setStatus] = useState(false)
  const [orderId, setOrderId] = useState()

  const { data: shop_data } = useGetShopbyUserId(currentUser?._id)
  const { data: new_data, isLoading } = useGetCancelOrderByShop(shop_data?._id)

  useEffect(() => {
    setOrderData(new_data?.result)
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
      title: 'Phương Thức Thanh Toán',
      dataIndex: 'providerPayment',
      key: 'providerPayment',
      width: 220,
      render: (_, record) => {
        let titleProvider = getTitleForProvider(record?.providerPayment)
        return (
          <>
            <h3 className="font-medium text-center">{titleProvider}</h3>
          </>
        )
      },
      filters: [
        {
          text: 'Tại nhà',
          value: 0,
        },
        {
          text: 'PayPal',
          value: 1,
        },
        {
          text: 'VNPAY',
          value: 2,
        },
      ],
      onFilter: (value, record) => record?.providerPayment === value,
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

  return (
    <>
      <Helmet>
        <title>Bán hàng | Danh sách đơn đặt hàng</title>
      </Helmet>
      <div>
        <Divider
          style={{
            fontSize: '24px',
            color: '#31a9e0',
            textTransform: 'uppercase',
          }}
          className="uppercase"
        >
          Đơn Hàng đã huỷ
        </Divider>
        <TableFilterAll
          dataSource={dataOrderList}
          columns={columns}
          pagination={paginationConfig}
          loading={isLoading}
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

export default CancelOrder
