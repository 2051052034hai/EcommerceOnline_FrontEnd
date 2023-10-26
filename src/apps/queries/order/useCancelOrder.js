// Libraries
import { useMutation, useQueryClient } from 'react-query'

// services
import { toast } from 'react-toastify'
import { QUERIES_KEYS } from 'apps/constants/queries'
import { cancelOrder } from 'apps/services/apis/order.api'

export const useCancelOrder = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data) => cancelOrder(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERIES_KEYS.GET_ORDER, data])

      toast.success('Cập nhật dữ liệu thành công')
    },
    onError: () => {
      toast.error('Lỗi !!!')
    },
  })

  return {
    mutation,
    isLoading: mutation.isLoading,
  }
}
