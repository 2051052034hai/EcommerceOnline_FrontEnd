// Libraries
import { useMutation } from 'react-query'

// services
import { handleResendMailRegister } from 'apps/services/apis/auth.api'

//UserSlice
import { toast } from 'react-toastify'

export const useSendEmailRegister = () => {
  const mutation = useMutation({
    mutationFn: async (email, username) => handleResendMailRegister(email, username),
    onSuccess: (data) => {
      if (data?.EC === 0) {
        toast.success('Đường dẫn đăng ký tài khoản đã được gửi đến email!')
      }
    },
  })

  return {
    mutation,
    isLoading: mutation.isLoading,
  }
}
