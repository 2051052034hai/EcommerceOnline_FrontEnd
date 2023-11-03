// Libraries
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

// services
import { handlecheckPassword } from 'apps/services/apis/auth.api'

export const useCheckedPassword = () => {
  const mutation = useMutation({
    mutationFn: async (data) => handlecheckPassword(data),
    onSuccess: (data) => {
      if (data.data) {
        toast.success('Hợp lệ, vui lòng nhập vào mật khẩu mới!')
      } else {
        toast.error('Mật khẩu bạn nhập không đúng!!')
      }
    },
    onError: () => {
      toast.error('Lỗi..!!')
    },
  })

  return {
    mutation,
    isLoading: mutation.isLoading,
  }
}
