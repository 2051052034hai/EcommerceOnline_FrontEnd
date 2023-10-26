import { create, get, update } from './https'

const pathUrl = '/order'

export const getOderByShop = async (id) => {
  let url = `${pathUrl}-by-shop/${id}?populate=orderItems.product,userId`

  const result = await get(url)
  return result.data
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
  const result = await create(`${pathUrl}/${id}`)
  return result.data.data
}
