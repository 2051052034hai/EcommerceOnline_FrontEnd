// // Libraries
// import { useQuery } from "react-query";

// // Constants
// import { QUERIES_KEYS } from "apps/constants/queries";

// // Services
// import { getProductsByCateName } from "apps/services/apis/product.api";

// export const useGetDataProductByName = (name) => {
//   const { data, isLoading, error } = useQuery(
//     [QUERIES_KEYS.GET_PRODUCTS, name],
//     () => getProductsByCateName(name), // Truyền hàm chứa lời gọi getProductsById
//     {
//       keepPreviousData: true,
//       staleTime: 5 * 1000,
//     }
//   );
//   return {
//     productsCate: data?.products,
//     isLoadingProductByName: isLoading,
//     error,
//   };
// };
