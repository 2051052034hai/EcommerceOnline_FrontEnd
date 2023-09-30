import { create } from './https'

const pathUrl = '/user'
export const createUser = async (data) => {
  if (data.email !== undefined && data.username !== undefined) {
    const formData = new FormData()

    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('username', data.username)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    try {
      const result = await create(`${pathUrl}/register`, formData, config)
      return result.data.data
    } catch (error) {
    return error
    }

  }
}
