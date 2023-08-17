import {create,update,remove,get} from './https'

const pathUrl="/products/";

export const getProducts = async()=>{
    const result = await get(pathUrl)
    return result.data.results
}

export const getProductsById = async (id)=>{
    const result = await get(`/products/${id}/get`);
    return result.data;
}

