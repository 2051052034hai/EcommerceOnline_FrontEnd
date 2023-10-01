// Libraries
import { handleCreateShop } from 'apps/services/apis/shop.api'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// services

export const useCreateShop = () => {
  //navigate
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (shop) => handleCreateShop(shop),
    onSuccess: (data) => {
      if (data?.EC !== 1) {
        toast.success('Yêu cầu đăng kí thành công')
        navigate('/')
      } else {
        toast.error('Đăng ký không thành công')
      }
    },
    onError: (error) => {
      console.log(error)
      toast.error('Đăng ký không thành công')
    },
  })

  return {
    mutation,
    isLoading: mutation.isLoading,
  }
}
