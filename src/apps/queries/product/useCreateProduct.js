// Libraries
import { useMutation } from 'react-query'

// services
import { createProduct } from 'apps/services/apis/product.api'
import { toast } from 'react-toastify'

export const useCreateProduct = () => {
  const mutation = useMutation({
    mutationFn: async (product) => createProduct(product),
    onSuccess: (data) => {
      console.log(data, 'data')
      //   queryClient.invalidateQueries([
      //     QUERIES_KEYS.GET_PRODUCTS_BY_SHOPID,
      //     data.data.shop,
      //   ]);

      toast.success('Thêm dữ liệu thành công')
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
