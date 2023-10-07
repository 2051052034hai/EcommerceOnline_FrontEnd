import { create, get } from './https'

const pathUrl = '/create_payment_url'

export const createPaymentUrl = async (data) => {
  const result = await create(pathUrl, data)

  return result
}

export const getPayment = async (path) => {
  const result = await get('/vnpay_return')

  return result
}
