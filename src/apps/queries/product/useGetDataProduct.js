// Libraries
import { useQuery } from "react-query";

// Constants
import { QUERIES_KEYS } from "apps/constants/queries";

// Services
import { getProducts } from "apps/services/apis/product.api";

export const useGetDataProduct=()=>{

    const {data,isLoading}= useQuery({
        queryKey:[QUERIES_KEYS.GET_PRODUCTS],
        queryFn: getProducts,
        keepPreviousData:true,
        staleTime: 5*1000,
    });

   
    return {data:data, isLoading}
}

