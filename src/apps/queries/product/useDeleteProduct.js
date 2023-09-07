// Libraries
import { useMutation, useQueryClient } from "react-query";

// services
import { deleteProduct } from "apps/services/apis/product.api";
import { toast } from "react-toastify";
import { QUERIES_KEYS } from "apps/constants/queries";
import { getProductsByShopId } from "apps/services/apis/shop.api";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => deleteProduct(data),
    onMutate: (data) => {
      const { user, page, pageSize } = data;
      queryClient.prefetchQuery(
        [QUERIES_KEYS.GET_PRODUCTS_BY_SHOPID, user, page, pageSize],
        () => getProductsByShopId(user, page, pageSize)
      );
    },
    onSuccess: (data) => {
      toast.success("Xóa dữ liệu thành công");
    },
    onError: () => {
      toast.error("Lỗi !!!");
    },
  });

  return {
    mutationDelete: mutation,
    isLoadingDelete: mutation.isLoading,
  };
};
