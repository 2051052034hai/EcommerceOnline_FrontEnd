import { Button, Divider, Popconfirm, message } from 'antd'
import { useGetCartByUserId } from 'apps/queries/cart/useGetCartByUserId'
import { useCancelOrder } from 'apps/queries/order/useCancelOrder'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCurrentUser } from 'store/userSlice/userSelector'

export const Purchase_History = () => {
  const { t } = useTranslation()
  const currentUser = useSelector(selectCurrentUser)
  const { data } = useGetCartByUserId(currentUser?._id)
  const { mutation, isLoading } = useCancelOrder()

  const confirm = (id) => {
    mutation.mutate(id)
  }
  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }

  return (
    <>
      <Helmet>
        <title>{t('PURCHARE_HISTORRY.title')}</title>
      </Helmet>
      <Divider
        style={{
          fontSize: '24px',
          color: '#31a9e0',
          textTransform: 'uppercase',
        }}
      >
        {t('PURCHARE_HISTORRY.title')}
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
                  {t('PURCHARE_HISTORRY.purchase_date')} : {day}-{month}-{year}
                </h3>
              </div>
              <ul className="mt-12 divide-y space-y-3">
                {orderItem?.orderItems?.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className="px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50"
                    >
                      <div className="flex  gap-x-3">
                        <div className=" w-20 h-20 border rounded-full flex items-center justify-center">
                          <img src={item?.product?.thumbnail} alt="tet" />
                        </div>
                        <div className="w-2/3">
                          <h3 className="text-base text-gray-800 font-semibold mt-1">
                            {item?.product?.title}
                          </h3>
                          <p>
                            {t('PURCHARE_HISTORRY.quantity')}: {item?.qty}
                          </p>
                        </div>
                        <div>
                          {orderItem?.statusPayment ? (
                            <p>{t('PURCHARE_HISTORRY.paid')}</p>
                          ) : (
                            <p className="text-red-800">
                              {t('PURCHARE_HISTORRY.unpaid')}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  )
                })}

                <div className="flex justify-end py-3 gap-2 font-medium">
                  {t('PURCHARE_HISTORRY.total_amount')} :
                  <span className="ml-4 text-md  text-red-600">
                    {Math.ceil(orderItem?.total).toLocaleString('vi-VN')} VND
                  </span>
                  <div>
                    {orderItem.isDelivery ? (
                      <p className="text-blue-400">Đã giao hàng</p>
                    ) : (
                      <Popconfirm
                        title="Huỷ đơn hàng"
                        onConfirm={() => confirm(orderItem._id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger loading={isLoading}>
                          Huỷ đơn hàng
                        </Button>
                      </Popconfirm>
                    )}
                  </div>
                </div>
              </ul>
            </div>
          </section>
        )
      })}
    </>
  )
}
