import { Divider } from 'antd'
import { useGetCartByUserId } from 'apps/queries/cart/useGetCartByUserId'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCurrentUser } from 'store/userSlice/userSelector'

export const Purchase_History = () => {
  const currentUser = useSelector(selectCurrentUser)
  const { data } = useGetCartByUserId(currentUser?._id)

  return (
    <>
      <Divider
        style={{
          fontSize: '24px',
          color: '#31a9e0',
          textTransform: 'uppercase',
        }}
      >
        Lịch sử mua hàng
      </Divider>

      {data?.map((orderItem, index) => {
        const dataCreate = new Date(orderItem?.createdAt)

        const day = String(dataCreate.getDate()).padStart(2, '0')
        const month = String(dataCreate.getMonth() + 1).padStart(2, '0')
        const year = dataCreate.getFullYear()
        return (
          <section key={index}>
            <div className="max-w-screen-lg mx-auto px-4 md:px-8 mb-3">
              <div className="max-w-md">
                <h3 className="text-gray-800 text-base font-extrabold ">
                  Ngày mua hàng : {day}-{month}-{year}
                </h3>
              </div>
              <ul className="mt-12 divide-y space-y-3">
                {orderItem?.orderItems?.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50"
                    >
                      <Link to={`/product/${item?.product?._id}`} className="space-y-3">
                        <div className="flex  gap-x-3">
                          <div className=" w-20 h-20 border rounded-full flex items-center justify-center">
                            <img src={item?.product?.thumbnail} alt="tet" />
                          </div>
                          <div className="w-2/3">
                            <h3 className="text-base text-gray-800 font-semibold mt-1">
                              {item?.product?.title}
                            </h3>
                            <p>Số lượng: {item?.qty}</p>
                          </div>
                          <div>
                            {orderItem?.statusPayment ? (
                              <p>Đã Thanh Toán</p>
                            ) : (
                              <p className="text-red-800">Chưa thanh toán</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })}
                <p className="flex justify-end py-3 font-medium">
                  Tổng tiền :
                  <span className="ml-4 text-md  text-red-600">
                    {Math.ceil(orderItem?.total).toLocaleString('vi-VN')} VND
                  </span>
                </p>
              </ul>
            </div>
          </section>
        )
      })}
    </>
  )
}
