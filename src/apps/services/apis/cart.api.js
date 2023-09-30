import { create, get } from './https'

const pathUrl = '/order'

export const handleAddOrder = async (order) => {
  const result = await create(pathUrl, order)
  return result.data
}

export const getOrderByUserId = async (id) => {
  const idAsString = String(id)
  const url = `/order-by-user/${idAsString}?populate=orderItems.product`

  const result = await get(url)
  return result.data.data
}
