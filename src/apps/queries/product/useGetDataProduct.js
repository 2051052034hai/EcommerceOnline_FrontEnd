// Libraries
import { useQuery, useQueryClient } from "react-query";

// Constants
import { QUERIES_KEYS } from "apps/constants/queries";

// Services
import { getProductsPage } from "apps/services/apis/product.api";

export const useGetDataProductPage = (page, pageSize, keyWord, subcategory, shopId) => {
  const queryClient = useQueryClient();

  const nextPage = page + 1;

  queryClient.prefetchQuery(
    [QUERIES_KEYS.GET_PRODUCTS, nextPage, pageSize, keyWord, subcategory, shopId],
    () => getProductsPage(nextPage, pageSize, keyWord, subcategory, shopId)
  );

  const { data, isLoading } = useQuery(
    [QUERIES_KEYS.GET_PRODUCTS, page, pageSize, keyWord, subcategory, shopId],
    () => getProductsPage(page, pageSize, keyWord, subcategory, shopId),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    }
  );

  return { data: data, isLoading };
};
