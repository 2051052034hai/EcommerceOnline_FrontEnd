import { Button, Skeleton } from 'antd'
import { useSaveCart } from 'apps/queries/cart/useSaveCart'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { selectCurrentUser } from 'store/userSlice/userSelector'

const ResultPayment = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { mutation, isLoading } = useSaveCart()

  const listCart = useSelector((state) => state?.cart?.products)
  const currentUser = useSelector(selectCurrentUser)
  const totalAfterDiscount = useSelector((state) => state?.cart?.totalAfterDiscount)

  const vnp_ResponseCode = params.get('vnp_ResponseCode')

  useEffect(() => {
    if (vnp_ResponseCode === '00') {
      const saveNewCart = []
      for (var i = 0; i < listCart.length; i++) {
        var item = listCart[i]
        var newItem = {
          product: item._id,
          qty: item.quantity,
          shop: item.shop._id,
          providerPayment: 2,
        }
        saveNewCart.push(newItem)
      }
      const data_save = {
        userId: currentUser?._id,
        orderItems: saveNewCart,
        total: totalAfterDiscount,
      }
      mutation.mutateAsync(data_save)
    } else if (vnp_ResponseCode === '07') {
      toast.error(
        'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).!',
      )
    } else if (vnp_ResponseCode === '09') {
      toast.error(
        'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
      )
    } else if (vnp_ResponseCode === '10') {
      toast.error(
        'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
      )
    } else if (vnp_ResponseCode === '11') {
      toast.error(
        'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
      )
    } else if (vnp_ResponseCode === '12') {
      toast.error('Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa')
    } else if (vnp_ResponseCode === '13') {
      toast.error(
        'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
      )
    } else if (vnp_ResponseCode === '24') {
      toast.error('Giao dịch không thành công do: Khách hàng hủy giao dịch! ')
    } else if (vnp_ResponseCode === '51') {
      toast.error(
        'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
      )
    } else if (vnp_ResponseCode === '65') {
      toast.error(
        'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày. ',
      )
    } else if (vnp_ResponseCode === '75') {
      toast.error('Ngân hàng thanh toán đang bảo trì.')
    } else if (vnp_ResponseCode === '79') {
      toast.error(
        'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch ! ',
      )
    } else {
      toast.error('Giao dịch thất baị! ')
    }
  }, [])

  const backToHome = () => {
    navigate('/')
  }

  return (
    <div
      className="w-full h-screen  flex flex-col items-center justify-center px-4"
      style={{ height: '500px' }}
    >
      {isLoading ? (
        <Skeleton
          avatar
          paragraph={{
            rows: 10,
          }}
        />
      ) : (
        <Button onClick={backToHome}>Quay về trang chủ</Button>
      )}
    </div>
  )
}

export default ResultPayment
