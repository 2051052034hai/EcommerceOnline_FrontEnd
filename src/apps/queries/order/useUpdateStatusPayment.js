// Libraries
import { useMutation, useQueryClient } from 'react-query'

// services
import { toast } from 'react-toastify'
import { QUERIES_KEYS } from 'apps/constants/queries'
import { handleUpdateStatusPayment } from 'apps/services/apis/order.api'

export const useUpdateStatusPayment = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data) => handleUpdateStatusPayment(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        QUERIES_KEYS.GET_ORDER_BY_SHOP,
        data?.data.orderItems[0].shop,
      ])

      toast.success('Cập nhật dữ liệu thành công')
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
