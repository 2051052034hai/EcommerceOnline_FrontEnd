import { get } from './https'

const pathUrl = '/order'

export const getOderByShop = async (id) => {
  let url = `${pathUrl}-by-shop/${id}?populate=orderItems.product,userId`

  const result = await get(url)
  return result.data
}
