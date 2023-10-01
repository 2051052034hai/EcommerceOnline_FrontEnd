import { create, get } from './https'

const pathUrl = '/comment'

export const createComment = async (comment) => {
  const result = await create(pathUrl, comment)
  return result.data
}

export const getComment = async (productId) => {
  if (productId) {
    const path = `${pathUrl}?populate=userId&productId=${productId}`

    const result = await get(path)
    return result.data.data
  }
}
