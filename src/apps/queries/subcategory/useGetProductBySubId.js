// Libraries
import { useQuery } from "react-query";

// Constants
import { QUERIES_KEYS } from "apps/constants/queries";
import { getProductBySubId } from "apps/services/apis/sub.api";

// Services

export const useGetProductBySubId = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERIES_KEYS.SUBCATEGORY, id],
    queryFn: () => getProductBySubId(id),
    keepPreviousData: true,
    staleTime: 5 * 1000,
  });

  return { data: data, isLoading };
};
