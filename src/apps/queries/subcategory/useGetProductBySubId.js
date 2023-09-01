// Libraries
import { useQuery } from "react-query";

// Constants
import { QUERIES_KEYS } from "apps/constants/queries";
import { getProductBySubId } from "apps/services/apis/sub.api";

// Services

export const useGetProductBySubId = (id, minPrice, maxPrice, sort) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERIES_KEYS.SUBCATEGORY, id, minPrice, maxPrice, sort],
    queryFn: () => getProductBySubId(id, minPrice, maxPrice, sort),
    keepPreviousData: true,
    staleTime: 5 * 1000,
  });

  return { data: data, isLoading };
};
