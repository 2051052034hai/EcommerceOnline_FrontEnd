// Libraries
import { useQuery } from "react-query";

// Constants
import { QUERIES_KEYS } from "apps/constants/queries";

// Services
import { getShopbyUserId } from "apps/services/apis/shop.api";

export const useGetShopbyUserId = (id) => {



  const { data, isLoading, error } = useQuery(
    [QUERIES_KEYS.GET_SHOP_BY_USERID, id],
    () => getShopbyUserId(id),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    }
  );
  return { data, isLoading, error };
};
