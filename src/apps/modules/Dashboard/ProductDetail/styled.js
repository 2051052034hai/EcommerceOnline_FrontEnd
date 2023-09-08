import styled from "styled-components";

export const ProductImage = styled.div`
  padding: 0px 10px;
  background-color: #fff;

  img {
    height: 345px;
    width: 345px;
    object-fit: cover;
    border: 1px solid #dee2e7;
    border-radius: 6px;
  }
`;

export const ProductImageThumb = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    height: 48px;
    object-fit: cover;
    width: 100%;
  }
  div {
    border: 1px solid #dee2e7;
    background: #fff;
    width: 20%;
    margin: 20px 10px;
    border-radius: 6px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const ProductContent = styled.div`
  padding: 0px 20px 30px 20px;

  p {
    margin-bottom: 0;
  }
  div {
    margin-bottom: 10px;
  }
`;

export const InStock = styled.div`
  display: flex;
  align-items: center;
  color: #00b517;
  font-size: 16px;
  p {
    padding-left: 10px;
  }
`;

export const ProductContentTitle = styled.div`
  padding-top: 5px;
  font-size: 20px;
  color: #1c1c1c;
`;

export const ProductContentValuate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

export const Comment = styled.div`
  display: flex;
  align-items: center;
  color: #787a80;
  height: 20px;

  p {
    padding-left: 10px;
    padding-right: 10px;
  }
`;
export const IconRating = styled.div`
  padding-right: 5px;
`;
export const TextIconRating = styled.div`
  padding-right: 10px;
  display: flex;
  height: 20px;
`;
export const Sold = styled.div`
  display: flex;
  align-items: center;
  color: #787a80;
  p {
    padding-left: 10px;
  }
`;
export const ProductContentDetail = styled.div`
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0 10px 0;
`;

export const Items = styled.div`
  display: flex;
  font-size: 16px;
  color: #505050;

  p {
    padding: 10px 0;
    &:first-child {
      width: 160px;
    }
  }
`;

export const Supplier = styled.div`
  padding: 20px 10px;
  border: 1px solid #dee2e7;
  border-radius: 6px;
  margin-top: 20px;
`;

export const SupplierTitle = styled.div`
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  img {
    width: 48px;
    height: 48px;
    border-radius: 6px;
  }
`;

export const SupplierTitleName = styled.div`
  width: 70%;
  font-size: 16px;
  color: #1c1c1c;
  padding-left: 10px;
  font-weight: 400;
`;

export const SupplierInfoItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #8b96a5;
  font-weight: 400;
  padding-top: 10px;
  img {
    width: 21px;
    height: 15px;
  }
  p {
    margin-bottom: 0;
    padding-left: 10px;
  }
  svg {
    width: 21px;
    height: 15px;
  }
`;

export const SupplierButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 248px;
    height: 40px;
    font-size: 16px;
    border-radius: 6px;
    margin-top: 10px;
  }
`;

export const SupplierButtonProfile = styled.div`
  button {
    background: #ffffff;
    color: #0d6efd;
    border: 1px solid #dee2e7;
  }
`;

export const SaveLater = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin: 10px;
    width: 248px;
    height: 40px;
    border-radius: 6px;
    font-size: 16px;
    background-color: #ffffff;
    color: #0d6efd;
  }

  span {
    padding-left: 10px;
  }
`;

export const AddCart = styled.button`
  background-color: green;
  color: white;
  border-radius: 10px;
  padding: 10px;
  &:disabled {
    opacity: 0.5;
  }
`;

export const RelatedProduct = styled.h4`
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
`;
