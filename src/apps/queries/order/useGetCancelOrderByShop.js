// Libraries
import { useQuery } from 'react-query'

// Constants
import { QUERIES_KEYS } from 'apps/constants/queries'

// Services
import { getOderCancelByShop } from 'apps/services/apis/order.api'

export const useGetCancelOrderByShop = (id) => {
  const { data, isLoading, error } = useQuery(
    [QUERIES_KEYS.GET_CANCEL_ORDER_BY_ID, id],
    () => getOderCancelByShop(id),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    },
  )
  return { data, isLoading, error }
}
