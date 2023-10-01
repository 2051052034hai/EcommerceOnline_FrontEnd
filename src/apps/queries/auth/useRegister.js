// Libraries
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// services
import { handleCreateUser } from 'apps/services/apis/auth.api'

export const useRegisterUser = () => {
  //navigate
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (user) => handleCreateUser(user),
    onSuccess: (data) => {
      if (data.status !== 'ERR') {
        toast.success('Đăng ký thành công')
        navigate('/login')
      }
    },
    onError: (error) => {
      if (error.response.data.EC === 1) {
        toast.error('Email này đã tồn tại')
      } else {
        toast.error('Đăng ký thất bại')
      }
    },
  })

  return {
    mutation,
    isLoading: mutation.isLoading,
  }
}
