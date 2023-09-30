// Libraries
import { useQuery } from 'react-query'

// Constants
import { QUERIES_KEYS } from 'apps/constants/queries'
import { getShops } from 'apps/services/apis/shop.api'

// Services

export const useGetAllShops = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERIES_KEYS.GET_SHOPS],
    queryFn: getShops,
    keepPreviousData: true,
    staleTime: 5 * 1000,
  })

  return { data: data, isLoading }
}
