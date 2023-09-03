// Libraries
import { useQuery } from "react-query";

// Constants
import { QUERIES_KEYS } from "apps/constants/queries";

// Services
import { getOrderByUserId } from "apps/services/apis/cart.api";

export const useGetCartByUserId = (id) => {
  const { data, isLoading, error } = useQuery(
    [QUERIES_KEYS.GET_ORDER, id],
    () => getOrderByUserId(id),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    }
  );
  return { data, isLoading, error };
};
