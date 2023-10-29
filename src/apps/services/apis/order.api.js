import { create, get, remove, update } from './https'

const pathUrl = '/order'

export const getOderByShop = async (id) => {
  let url = `${pathUrl}-by-shop/${id}?populate=orderItems.product,userId`

  const result = await get(url)

  return result.data
}

export const getOderCancelByShop = async (id) => {
  let url = `${pathUrl}-cancel-by-shop/${id}?populate=orderItems.product,userId`

  const result = await get(url)
  return result.data.data
}

export const handleUpdateStatusPayment = async (data) => {
  const result = await update(`${pathUrl}/status`, data)
  return result.data
}

export const getOrderById = async (id) => {
  const result = await get(`${pathUrl}/${id}`)
  return result.data.data
}

export const cancelOrder = async (id) => {
  const result = await remove(`${pathUrl}/${id}`)
  return result.data.data
}
