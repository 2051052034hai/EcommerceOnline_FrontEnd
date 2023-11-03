import { create } from './https'

const pathUrl = '/user/login'

export const handleLoginUser = async (user) => {
  const result = await create(pathUrl, user)
  return result.data
}

export const handleLoginSocial = async (user) => {
  const result = await create('/user/login-gg', user)
  return result.data
}

export const handleCreateUser = async (user) => {
  const result = await create('/user/register', user)
  return result.data
}

export const handelResetPassword = async (user) => {
  const result = await create('/user/resetPassword', user)
  return result.data
}

export const handleResendMail = async (data) => {
  const result = await create('/user/resend-email', data)
  return result.data
}

export const handlecheckPassword = async (data) => {
  const result = await create('/user/checkedPassword', data)
  return result.data
}
