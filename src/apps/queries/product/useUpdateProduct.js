// Libraries
import { useMutation, useQueryClient } from "react-query";

// services
import { updateProduct } from "apps/services/apis/product.api";
import { toast } from "react-toastify";
import { QUERIES_KEYS } from "apps/constants/queries";
import { getProductsByShopId } from "apps/services/apis/shop.api";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (product) => updateProduct(product),
    onSuccess: (data) => {
      toast.success("Cập nhật dữ liệu thành công");
    },
    onError: () => {
      toast.error("Lỗi !!!");
    },
    onMutate: (data) => {
      const { shop, page, pageSize } = data;
      queryClient.prefetchQuery(
        [QUERIES_KEYS.GET_PRODUCTS_BY_SHOPID, shop, page, pageSize],
        () => getProductsByShopId(shop, page, pageSize)
      );
    },
  });

  return {
    mutation,
    isLoading: mutation.isLoading,
  };
};
