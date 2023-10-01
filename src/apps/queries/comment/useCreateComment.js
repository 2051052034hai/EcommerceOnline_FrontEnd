// Libraries
import { useMutation, useQueryClient } from 'react-query'

// services
import { toast } from 'react-toastify'
import { createComment } from 'apps/services/apis/comment.api'
import { QUERIES_KEYS } from 'apps/constants'

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (comment) => createComment(comment),
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERIES_KEYS.COMMENT, data.data.productId])
      queryClient.invalidateQueries([QUERIES_KEYS.GET_PRODUCTS, data.data.productId])
    },
    onError: () => {
      toast.error('Lỗi !!!')
    },
  })

  return {
    mutationComment: mutation,
    isLoadingCreateComment: mutation.isLoading,
  }
}
