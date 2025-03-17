// Libraries
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { handleAddOrder } from 'apps/services/apis/cart.api'
import { toast } from 'react-toastify'

export const useSaveCart = (order) => {
  const mutation = useMutation({
    mutationFn: async (order) => handleAddOrder(order),
    onSuccess: (data) => {},
    onError: () => toast.error('Đặt hàng không thành công !!'),
  })

  return {
    mutation,
    isLoading: mutation.isLoading,
  }
}
