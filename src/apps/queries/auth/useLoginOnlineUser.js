// Libraries
import { useMutation } from 'react-query'
import cookie from "react-cookies";
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// Services
import { createUser } from 'apps/services/apis/user.api'

// userSlice
import { save_user } from 'store/userSlice/userSlice'


export const useCreateUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [checkEmail, setCheckEmail] = useState(1)

  const mutation = useMutation({
    mutationFn: async (user) => createUser(user),
    onSuccess: (data) => {
      if(data)
      {
        console.log("data:", data)
        const { access_token, refresh_token, ...other } = data
        setCheckEmail(0)
        cookie.save('access-token', access_token)
        cookie.save('refresh_token', refresh_token)
        dispatch(save_user(other))
        toast.success('Đăng nhập thành công')
        navigate('/')
      }
    },
    onError: (error) => {
      setCheckEmail(error.response.data.EC)
      toast.success('Đăng nhập thành công')
      navigate('/')
    },
    onMutate: () => {},
  })

  return {
    mutation,
    isLoading: mutation.isLoading,
    checkEmail,
  }
}
