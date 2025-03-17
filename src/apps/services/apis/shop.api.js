import { create, get } from './https'

const pathUrl = '/shop/'

export const getShops = async () => {
  const result = await get(pathUrl)
  return result.data.data
}

export const getProductsByShopId = async (id, page, pageSize) => {
  if (id) {
    let url = `/productShop/${id}?populate=subcategory&`

    if (page !== undefined && pageSize !== undefined) {
      url += `page=${page}&limit=${pageSize}&`
    }

    const result = await get(url)

    return result.data.data
  }
}

export const getShopbyUserId = async (id) => {
  console.log('id', id)
  if (id) {
    let url = `${pathUrl}${id}`
    const result = await get(url)
    return result.data.data
  }
}

export const handleCreateShop = async (shop) => {
  const result = await create(pathUrl, shop)
  return result.data
}
