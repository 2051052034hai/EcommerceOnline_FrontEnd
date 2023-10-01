// Libraries
import { useQuery } from 'react-query'

// Constants
import { QUERIES_KEYS } from 'apps/constants/queries'

// Services
import { getComment } from 'apps/services/apis/comment.api'

export const useGetComment = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERIES_KEYS.COMMENT, id],
    queryFn: () => getComment(id),
    keepPreviousData: true,
    staleTime: 10 * 1000,
  })

  return { dataComment: data, isLoading }
}
