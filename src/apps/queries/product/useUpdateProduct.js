// Libraries
import { useMutation, useQueryClient } from "react-query";

// services
import { updateProduct } from "apps/services/apis/product.api";
import { toast } from "react-toastify";
import { QUERIES_KEYS } from "apps/constants/queries";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (product) => updateProduct(product),
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        QUERIES_KEYS.GET_PRODUCTS_BY_SHOPID,
        data.data.shop,
      ]);

      toast.success("Cập nhật dữ liệu thành công");
    },
    onError: () => {
      toast.error("Lỗi !!!");
    },
    onMutate: () => {},
  });

  return {
    mutation,
    isLoading: mutation.isLoading,
  };
};
