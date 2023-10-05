// Libraries
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'

// services
import { handleResendMail } from 'apps/services/apis/auth.api'

//UserSlice
import { save_otp } from 'store/userSlice/userSlice'
import { toast } from 'react-toastify'

export const useResendMail = () => {

  const dispatch = useDispatch()

  const mutation = useMutation({
    mutationFn: async (email) => handleResendMail(email),
    onSuccess: (data) => {
      if(data?.EC === 0){
        dispatch(save_otp(data?.data))
        toast.success('Đã gửi mã thành công!')
      }
    },
  })

  return {
    mutation,
    isLoading: mutation.isLoading,
  }
}
