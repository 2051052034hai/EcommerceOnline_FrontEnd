// Libraries
import { useQuery } from 'react-query'

// Constants
import { QUERIES_KEYS } from 'apps/constants/queries'
import { getProductBySubId } from 'apps/services/apis/sub.api'
import { getPayment } from 'apps/services/apis/vn.api'

// Services

export const useGetStatusPayment = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ['TEST', id],
    queryFn: () => getPayment(),
    keepPreviousData: true,
    staleTime: 10 * 1000,
  })

  return { data: data, isLoading }
}
