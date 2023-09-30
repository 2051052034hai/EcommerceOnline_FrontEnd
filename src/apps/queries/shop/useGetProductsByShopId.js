// Libraries
import { useQuery, useQueryClient } from 'react-query'

// Constants
import { QUERIES_KEYS } from 'apps/constants/queries'

// Services
import { getProductsByShopId } from 'apps/services/apis/shop.api'

export const useGetProductsByShopId = (id) => {
  const { data, isLoading, error } = useQuery(
    [QUERIES_KEYS.GET_PRODUCTS_BY_SHOPID, id],
    () => getProductsByShopId(id),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    },
  )
  return { data, isLoading, error }
}
