// Libraries
import { useMutation, useQueryClient } from 'react-query'

// services
import { toast } from 'react-toastify'
import { QUERIES_KEYS } from 'apps/constants/queries'
import { updateUser } from 'apps/services/apis/user.api'

export const useUpdateUserById = (_id) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (user) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERIES_KEYS.GET_USER_BY_ID, _id])
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
