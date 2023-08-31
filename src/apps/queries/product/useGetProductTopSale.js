// Libraries
import { useQuery } from "react-query";

// Constants
import { QUERIES_KEYS } from "apps/constants/queries";

// Services
import { getTopSaleProduct } from "apps/services/apis/product.api";

export const useGetTopSaleProduct = () => {
  const { data, isLoading } = useQuery(
    [QUERIES_KEYS.GET_TOPSALE_PRODUCT],
    () => getTopSaleProduct(),
    {
      keepPreviousData: true,
      staleTime: 5 * 1000,
    }
  );

  return { data: data, isLoading };
};
