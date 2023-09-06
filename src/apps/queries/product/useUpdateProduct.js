// Libraries
import { useMutation, useQueryClient } from "react-query";

// services
import { updateProduct } from "apps/services/apis/product.api";
import { QUERIES_KEYS } from "apps/constants/queries";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (product) => updateProduct(product),
    onMutate: async (newData) => {
      console.log(newData, "new");
    },
    onSuccess: (data) => {},
  });

  return {
    mutation,
  };
};
