// Libraries
import { useQuery, useQueryClient } from "react-query";

// Constants
import { QUERIES_KEYS } from "apps/constants/queries";

// Services
import { getProductsPage } from "apps/services/apis/product.api";

export const useGetDataProductPage = (page, pageSize) => {
  const queryClient = useQueryClient();

  const nextPage = page + 1;

  queryClient.prefetchQuery(
    [QUERIES_KEYS.GET_PRODUCTS, nextPage, pageSize],
    () => getProductsPage(nextPage, pageSize)
  );

  const { data, isLoading } = useQuery(
    [QUERIES_KEYS.GET_PRODUCTS, page, pageSize],
    () => getProductsPage(page, pageSize),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    }
  );

  return { data: data, isLoading };
};
