// Libraries
import { useQuery, useQueryClient } from "react-query";

// Constants
import { QUERIES_KEYS } from "apps/constants/queries";

// Services
import { getProductsByShopId } from "apps/services/apis/shop.api";

export const useGetProductsByShopId = (id, page, pageSize) => {

  const queryClient = useQueryClient();

  const nextPage = page + 1;

  queryClient.prefetchQuery(
    [QUERIES_KEYS.GET_PRODUCTS_BY_SHOPID, id, nextPage, pageSize],
    () => getProductsByShopId(id, nextPage, pageSize)
  );

  const { data, isLoading, error } = useQuery(
    [QUERIES_KEYS.GET_PRODUCTS_BY_SHOPID, id, page, pageSize],
    () => getProductsByShopId(id, page, pageSize),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    }
  );
  return { data, isLoading, error };
};
