// Libraries
import { useQuery, useQueryClient } from 'react-query'

// Constants
import { QUERIES_KEYS } from 'apps/constants/queries'
import { getProductBySubId } from 'apps/services/apis/sub.api'

// Services

export const useGetProductBySubId = (id, minPrice, maxPrice, sort, page, pageSize) => {
  const queryClient = useQueryClient()

  const nextPage = page + 1

  queryClient.prefetchQuery(
    [QUERIES_KEYS.SUBCATEGORY, id, minPrice, maxPrice, sort, nextPage, pageSize],
    () => getProductBySubId(id, minPrice, maxPrice, sort, nextPage, pageSize),
  )

  const { data, isLoading } = useQuery({
    queryKey: [QUERIES_KEYS.SUBCATEGORY, id, minPrice, maxPrice, sort, page, pageSize],
    queryFn: () => getProductBySubId(id, minPrice, maxPrice, sort, page, pageSize),
    keepPreviousData: true,
    staleTime: 5 * 1000,
  })

  return { data: data, isLoading }
}
