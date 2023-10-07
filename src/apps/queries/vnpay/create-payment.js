// Libraries
import { createPaymentUrl } from 'apps/services/apis/vn.api'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// services

export const useCreatePaymentUrl = () => {
  //navigate

  const mutation = useMutation({
    mutationFn: async (data) => createPaymentUrl(data),
    onSuccess: (data) => {
      window.location.href = data.data
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return {
    mutationUrl: mutation,
    isLoading: mutation.isLoading,
  }
}
