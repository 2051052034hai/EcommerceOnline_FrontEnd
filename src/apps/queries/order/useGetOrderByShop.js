// Libraries
import { useQuery } from 'react-query'

// Constants
import { QUERIES_KEYS } from 'apps/constants/queries'

// Services
import { getOderByShop } from 'apps/services/apis/order.api'

export const useGetOrderByShop = (id) => {
  const { data, isLoading, error } = useQuery(
    [QUERIES_KEYS.GET_ORDER_BY_SHOP, id],
    () => getOderByShop(id),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    },
  )
  return { data, isLoading, error }
}
