// Libraries
import { useQuery } from 'react-query'

// Constants
import { QUERIES_KEYS } from 'apps/constants/queries'

// Services
import { getOrderById } from 'apps/services/apis/order.api'

export const useGetOrderById = (id) => {
  const { data, isLoading, error } = useQuery(
    [QUERIES_KEYS.GET_ORDER_BY_ID, id],
    () => getOrderById(id),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    },
  )
  return { data, isLoading, error }
}
