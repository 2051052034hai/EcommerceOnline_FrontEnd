// Libraries
import { useQuery } from 'react-query'

// Constants
import { QUERIES_KEYS } from 'apps/constants/queries'

// Services
import { getUserById } from 'apps/services/apis/user.api'

export const useGetUserByUserId = (id) => {
  const { data, isLoading, error } = useQuery(
    [QUERIES_KEYS.GET_USER_BY_ID, id],
    () => getUserById(id),
    {
      keepPreviousData: false,
      staleTime: 0,
    },
  )
  return { data, isLoading, error }
}
