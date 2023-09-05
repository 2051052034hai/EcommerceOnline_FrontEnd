// Libraries
import { useQuery} from "react-query";

// Constants
import { QUERIES_KEYS } from "apps/constants/queries";

// Services
import { getSubCategories } from "apps/services/apis/sub.api";

export const useGetSubCategories = () => {

  const { data, isLoading } = useQuery(
    [QUERIES_KEYS.GET_SUBCATEGORIES, ],
    () => getSubCategories() ,
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    }
  );

  return { data: data, isLoading };
};
