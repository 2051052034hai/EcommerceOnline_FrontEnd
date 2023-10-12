// Libraries
import React, { useEffect, useState } from 'react'
import * as styles from './styledCart'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { PayPalButton } from 'react-paypal-button-v2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Divider, Input, Radio } from 'antd'
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
import axios from 'axios'

const Cart = () => {
  const [valuePayment, setValuePayment] = useState(1)
  const [skdReady, setSdkReady] = useState(false)
  const [loadingAdd, setLoadingAdd] = useState(false)

  //
  const [provinceCode, setProvinceCode] = useState('')
  const [districtCode, setDistrictCode] = useState('')
  const [wardCode, setWardCode] = useState('')
  const [moneyShip, setMoneyShip] = useState(0)
  const [servicesShips, setServiceShip] = useState([])
  const [servicesCode, setServiceCode] = useState('')
  const [address, setAddress] = useState('')

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
    if (
      provinceCode === '' ||
      wardCode === '' ||
      districtCode === '' ||
      servicesCode === '' ||
      address === ''
    ) {
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
        total: totalAfterDiscount + moneyShip,
      }
      await mutation.mutateAsync(data_save)
      setLoadingAdd(false)
    }
  }

  const onChange = (e) => {
    setValuePayment(e.target.value)
  }

  const onChangeChooseService = (e) => {
    setServiceCode(e.target.value)
  }

  const onChangeAddress = (e) => {
    setAddress(e.target.value)
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
    if (
      provinceCode === '' ||
      wardCode === '' ||
      districtCode === '' ||
      servicesCode === '' ||
      address === ''
    ) {
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
        total: totalAfterDiscount + moneyShip,
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

  useEffect(() => {
    if (districtCode !== '') {
      axios
        .post(
          'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services',
          {
            shop_id: 4623102,
            from_district: 1461,
            to_district: districtCode,
          },
          {
            headers: {
              Token: 'eae718cc-68d4-11ee-b394-8ac29577e80e',
            },
          },
        )
        .then((response) => {
          setServiceShip(response.data.data)
        })
    }
  }, [districtCode])

  useEffect(() => {
    setServiceCode(servicesCode)
  }, [servicesCode])

  // Gom nhóm sản phẩm theo shop
  const groupedCartItems = listCart.reduce((grouped, cart) => {
    const shopId = cart.shop._id
    if (!grouped[shopId]) {
      grouped[shopId] = {
        shopName: cart.shop.name,
        products: [],
        totalWeight: 0,
        shopDistrictCode: cart.shop.districtCode,
        shopWardCode: cart.shop.wardCode,
      }
    }
    grouped[shopId].products.push(cart)
    grouped[shopId].totalWeight += cart.weight
    return grouped
  }, {})

  useEffect(() => {
    if (provinceCode !== '' && wardCode !== '' && districtCode !== '') {
      for (const shopId in groupedCartItems) {
        if (groupedCartItems.hasOwnProperty(shopId)) {
          const shop = groupedCartItems[shopId]

          // Thực hiện gọi API tính tiền ship cho cửa hàng này và cộng vào tổng
          axios
            .post(
              'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
              {
                service_type_id: 2,
                insurance_value: totalAfterDiscount + moneyShip,
                coupon: null,
                from_district_id: parseInt(shop.shopDistrictCode),
                from_ward_code: shop.shopWardCode,
                to_district_id: districtCode,
                to_ward_code: wardCode,
                height: 15,
                length: 15,
                weight: shop.totalWeight,
                width: 15,
              },
              {
                headers: {
                  token: 'eae718cc-68d4-11ee-b394-8ac29577e80e',
                  shop_id: '4623102',
                },
              },
            )
            .then((response) => {
              setMoneyShip((money) => {
                return money + response.data.data.total
              })
            })
            .catch((error) => {
              console.error(error)
            })
        }
      }
    }
  }, [provinceCode, districtCode, wardCode])

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
      total: totalAfterDiscount + moneyShip,
      updatedAt: details.update_time,
    }
    mutation.mutate(data_save)
  }

  // Render the grouped cart items
  const renderedCartItems = Object.values(groupedCartItems).map((group) => (
    <div key={group.shopName}>
      <h2>{group.shopName}</h2>
      {group.products.map((cart) => (
        <CartItem cart={cart} key={cart._id} />
      ))}
    </div>
  ))

  return (
    <>
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <div>
        <div className="grid md:grid-cols-12 lg:grid-cols-12 gap-4 mt-5 lg:px-8 ">
          <div className="lg:col-span-9 md:col-span-7 p-1 rounded-md mb-5">
            <styles.block__cart_item>
              {renderedCartItems}

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
            <div className="p-4">
              <Divider
                style={{
                  fontSize: '24px',
                  color: '#31a9e0',
                  textTransform: 'uppercase',
                }}
              >
                THÔNG TIN ĐẶT HÀNG
              </Divider>
              <LocationForm data={location} />
              <h4 className="font-bold pb-2">Chọn phương thức giao hàng</h4>
              <Radio.Group onChange={onChangeChooseService}>
                {servicesShips?.map((service) => (
                  <Radio value={service?.service_type_id}>{service?.short_name}</Radio>
                ))}
              </Radio.Group>
              <div className="mt-5">
                <Input placeholder="Nhập địa chỉ giao hàng" onChange={onChangeAddress} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 md:col-span-5 items-end p-4  ">
            <h3 className="text-center mb-2 font-bold">ĐỊA CHỈ GIAO HÀNG</h3>

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
                  <styles.value>
                    {Math.ceil(moneyShip).toLocaleString('vi-VN')} VND
                  </styles.value>
                </styles.tax>
                <hr className="my-3" />
              </styles.block__pay_caculator>

              <styles.block__pay_total>
                <div style={{ fontSize: '16px' }}>{t('CART.total_amount_payable')}:</div>
                <div style={{ fontSize: '16px' }}>
                  {Math.ceil(totalAfterDiscount + moneyShip).toLocaleString('vi-VN')} VND
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
                      {provinceCode === '' ||
                      wardCode === '' ||
                      districtCode === '' ||
                      servicesCode === '' ||
                      address === '' ? (
                        <p className="text-center">
                          Vui lòng nhập đầy đủ thông tin nhận hàng
                        </p>
                      ) : (
                        <PayPalButton
                          amount={Math.ceil((totalAfterDiscount + moneyShip) / 30000)}
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
