// Libraries
import { useMutation } from 'react-query'

// services
import { toast } from 'react-toastify'
import { handelResetPassword } from 'apps/services/apis/auth.api'
import { useNavigate } from 'react-router-dom'

export const useResetPassword = () => {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: async (user) => handelResetPassword(user),
    onSuccess: () => {
      toast.success('Khôi phục tài khoản thành công')
      navigate('/login')
    },
    onError: () => {
      toast.error('Lỗi !!!')
    },
    onMutate: () => {},
  })

  return {
    mutation,
    isLoading: mutation.isLoading,
  }
}
