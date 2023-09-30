// Libraries
import { useQuery } from 'react-query'

// Constants
import { QUERIES_KEYS } from 'apps/constants/queries'

// Services
import { getProductsById } from 'apps/services/apis/product.api'

export const useGetDataProductById = (id) => {
  const { data, isLoading, error } = useQuery(
    [QUERIES_KEYS.GET_PRODUCTS, id],
    () => getProductsById(id),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    },
  )
  return { data, isLoading, error }
}
