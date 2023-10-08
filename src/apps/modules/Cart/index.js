// Libraries
import React, { useEffect, useState } from 'react'
import * as styles from './styledCart'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { PayPalButton } from 'react-paypal-button-v2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Radio } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'

//Components
import CartItem from './CartItem/cartItem'

// Store
import { selectCurrentUser } from 'store/userSlice/userSelector'

// Queries
import { useSaveCart } from 'apps/queries/cart/useSaveCart'
import { useTranslation } from 'react-i18next'
import { useCreatePaymentUrl } from 'apps/queries/vnpay/create-payment'
import LocationForm from 'apps/components/molecules/LocationForm'
import { toast } from 'react-toastify'

const Cart = () => {
  const [valuePayment, setValuePayment] = useState(1)
  const [skdReady, setSdkReady] = useState(false)
  const [loadingAdd, setLoadingAdd] = useState(false)

  //
  const [provinceCode, setProvinceCode] = useState('')
  const [districtCode, setDistrictCode] = useState('')
  const [wardCode, setWardCode] = useState('')

  const location = {
    provinceCode,
    districtCode,
    wardCode,
    setProvinceCode,
    setWardCode,
    setDistrictCode,
  }
  const { t } = useTranslation()

  const listCart = useSelector((state) => state?.cart?.products)
  const totalAfterDiscount = useSelector((state) => state?.cart?.totalAfterDiscount)
  const totalBeforeDiscount = useSelector((state) => state?.cart?.totalBeforeDiscount)

  const totalDiscount = useSelector((state) => state?.cart?.totalDiscount)
  const currentUser = useSelector(selectCurrentUser)

  const { mutation } = useSaveCart()
  const { mutationUrl } = useCreatePaymentUrl()

  const handleOrder = async () => {
    if (provinceCode === '' || wardCode === '' || districtCode === '') {
      // Display an error message or handle the empty values as needed
      toast.error('Vui lòng điền đầy đủ thông tin giao hàng')
      return
    } else {
      setLoadingAdd(true)
      const saveNewCart = []
      for (var i = 0; i < listCart.length; i++) {
        var item = listCart[i]
        var newItem = {
          product: item._id,
          qty: item.quantity,
          shop: item.shop._id,
          providerPayment: 0,
        }
        saveNewCart.push(newItem)
      }
      const data_save = {
        userId: currentUser?._id,
        orderItems: saveNewCart,
        total: totalAfterDiscount,
      }
      await mutation.mutateAsync(data_save)
      setLoadingAdd(false)
    }
  }

  const onChange = (e) => {
    setValuePayment(e.target.value)
  }

  const addPayPalScript = async () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_CLIENT_ID_PAYPAL}`
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  const handlePaymentVnPay = async () => {
    if (provinceCode === '' || wardCode === '' || districtCode === '') {
      // Display an error message or handle the empty values as needed
      toast.error('Vui lòng điền đầy đủ thông tin giao hàng')
      return
    } else {
      setLoadingAdd(true)
      const saveNewCart = []
      for (var i = 0; i < listCart.length; i++) {
        var item = listCart[i]
        var newItem = {
          product: item._id,
          qty: item.quantity,
          shop: item.shop._id,
          providerPayment: 1,
        }
        saveNewCart.push(newItem)
      }
      const data_save = {
        userId: currentUser?._id,
        orderItems: saveNewCart,
        total: totalAfterDiscount,
      }
      await mutationUrl.mutate(data_save)

      setLoadingAdd(false)
    }
  }

  useEffect(() => {
    if (!window.paypal) {
      addPayPalScript()
    } else {
      setSdkReady(true)
    }
  }, [])

  const onSuccessPayment = (details, data) => {
    const saveNewCart = []
    for (var i = 0; i < listCart.length; i++) {
      var item = listCart[i]
      var newItem = {
        product: item._id,
        qty: item.quantity,
        shop: item.shop._id,
        statusPayment: true,
      }
      saveNewCart.push(newItem)
    }
    const data_save = {
      userId: currentUser?._id,
      orderItems: saveNewCart,
      total: totalAfterDiscount,
      updatedAt: details.update_time,
    }
    mutation.mutate(data_save)
  }

  return (
    <>
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <div>
        <div className="grid md:grid-cols-12 lg:grid-cols-12 gap-4 mt-5 lg:px-8 ">
          <div className="lg:col-span-9 md:col-span-7 p-1 rounded-md mb-5">
            <styles.block__cart_item>
              {listCart?.map((cart) => (
                <CartItem cart={cart} key={cart?._id} />
              ))}

              <styles.button__navigation>
                <styles.button__navigation_back>
                  <Link to="/">
                    <button>
                      <FontAwesomeIcon icon={faArrowLeft} />
                      <span>{t('CART.back_home')}</span>
                    </button>
                  </Link>
                </styles.button__navigation_back>
                <styles.button__navigation_remote>
                  <button>{t('CART.remove_all')}</button>
                </styles.button__navigation_remote>
              </styles.button__navigation>
              <div>
                <Radio.Group onChange={onChange} value={valuePayment}>
                  <Radio value={1}>{t('CART.payment_on_delivery')}</Radio>
                  <Radio value={2}>{t('CART.payment_by_paypal')}</Radio>
                  <Radio value={3}>{t('CART.payment_by_vnpay')}</Radio>
                </Radio.Group>
              </div>
            </styles.block__cart_item>
          </div>
          <div className="lg:col-span-3 md:col-span-5 items-end p-4  ">
            <h3 className="text-center mb-2 font-bold">ĐỊA CHỈ GIAO HÀNG</h3>
            <LocationForm data={location} />

            <styles.block__pay>
              <styles.block__pay_caculator>
                <styles.subtotal>
                  <styles.key>{t('CART.total_amount')}</styles.key>
                  <styles.value>
                    {Math.ceil(totalBeforeDiscount).toLocaleString('vi-VN')}
                    VND
                  </styles.value>
                </styles.subtotal>
                <styles.discount>
                  <styles.key>{t('CART.discount')}:</styles.key>
                  <styles.value>
                    {Math.ceil(totalDiscount).toLocaleString('vi-VN')} VND
                  </styles.value>
                </styles.discount>
                <styles.tax>
                  <styles.key>{t('CART.transport_fee')}:</styles.key>
                  <styles.value>+ $0</styles.value>
                </styles.tax>
                <hr className="my-3" />
              </styles.block__pay_caculator>

              <styles.block__pay_total>
                <div style={{ fontSize: '16px' }}>{t('CART.total_amount_payable')}:</div>
                <div style={{ fontSize: '16px' }}>
                  {Math.ceil(totalAfterDiscount).toLocaleString('vi-VN')} VND
                </div>
              </styles.block__pay_total>

              <styles.block__pay_checout>
                {currentUser?._id ? (
                  valuePayment === 1 && skdReady ? (
                    <Button
                      style={{
                        width: '300px',
                      }}
                      loading={loadingAdd}
                      onClick={handleOrder}
                    >
                      {t('CART.order')}
                    </Button>
                  ) : valuePayment === 2 ? (
                    <div style={{ width: '300px' }}>
                      {provinceCode === '' || wardCode === '' || districtCode === '' ? (
                        <p className="text-center">
                          Vui lòng nhập đầy đủ thông tin nhận hàng
                        </p>
                      ) : (
                        <PayPalButton
                          amount={Math.ceil(totalAfterDiscount / 30000)}
                          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                          onSuccess={onSuccessPayment}
                          onError={() => {
                            alert('Error')
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <Button
                      onClick={handlePaymentVnPay}
                      style={{
                        width: '300px',
                      }}
                    >
                      {t('CART.payment_by_vnpay')}
                    </Button>
                  )
                ) : (
                  <Link to="/login" className="w-full">
                    <Button className="w-full ">{t('HOME.login')}</Button>
                  </Link>
                )}
              </styles.block__pay_checout>
              <styles.block__pay_credit>
                <div>
                  <img src="https://img.upanh.tv/2023/10/07/pay1.png" alt="pay1" />
                </div>
                <div>
                  <img src="https://img.upanh.tv/2023/10/07/pay2.png" alt="pay2" />
                </div>
                <div>
                  <img src="https://img.upanh.tv/2023/10/07/pay3.png" alt="pay3" />
                </div>
                <div>
                  <img src="https://img.upanh.tv/2023/10/07/pay4.png" alt="pay4" />
                </div>
                <div>
                  <img src="https://img.upanh.tv/2023/10/07/pay5.png" alt="pay5" />
                </div>
              </styles.block__pay_credit>
            </styles.block__pay>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
