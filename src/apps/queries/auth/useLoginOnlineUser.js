// Libraries
import { useMutation } from 'react-query'
import cookie from 'react-cookies'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// Services
import { createUser } from 'apps/services/apis/user.api'

// userSlice
import { save_user } from 'store/userSlice/userSlice'

export const useCreateUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const mutation = useMutation({
    mutationFn: async (user) => createUser(user),
    onSuccess: (data) => {},
    onError: (error) => {},
    onMutate: () => {},
  })

  return {
    mutation,
    isLoading: mutation.isLoading,
  }
}
