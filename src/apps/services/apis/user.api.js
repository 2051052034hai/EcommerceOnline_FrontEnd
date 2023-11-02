import { useDispatch } from 'react-redux'
import { get, create, update } from './https'
import { save_user } from 'store/userSlice/userSlice'

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

export const updateUser = async (user) => {
  const result = await update('/users', user)
  return result.data
}

export const getUserById = async (id) => {
  const result = await get(`/users/${id}`)
  return result.data.data
}
