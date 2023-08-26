// Libraries
import { useQuery, useQueryClient } from "react-query";

// Constants
import { QUERIES_KEYS } from "apps/constants/queries";

// Services
import { getProductsPage } from "apps/services/apis/product.api";

export const useGetDataProductPage = (page) => {
  const queryClient = useQueryClient();

  // Prefetch the data for the next page
  const nextPage = page + 1;

  queryClient.prefetchQuery([QUERIES_KEYS.GET_PRODUCTS, nextPage], () =>
    getProductsPage(nextPage)
  );

  const { data, isLoading } = useQuery(
    [QUERIES_KEYS.GET_PRODUCTS, page],
    () => getProductsPage(page),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    }
  );

  return { data: data, isLoading };
};
