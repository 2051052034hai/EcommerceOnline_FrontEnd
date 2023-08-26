// Libraries
import { useQuery } from "react-query";

// Constants
import { QUERIES_KEYS } from "apps/constants/queries";

// Services
import { getCategory } from "apps/services/apis/category.api";

export const useGetDataCategory = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERIES_KEYS.GET_CATEGORY],
    queryFn: getCategory,
    keepPreviousData: true,
    staleTime: 5 * 1000,
  });

  return { data: data, isLoading };
};
