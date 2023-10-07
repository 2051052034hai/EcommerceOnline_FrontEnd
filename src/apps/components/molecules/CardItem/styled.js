import styled from 'styled-components'

export const CartImageStyle = styled.img`
  width: 100%;
  object-fit: contain;
  &:hover {
    transform: scale(1.1);
    transition: 0.5s linear;
  }
`

export const ProductItemStyle = styled.div`
  padding: 4px;
`

export const ProductPriceDiscount = styled.span`
  font-size: 14px;
  padding-right: 10px;
  text-decoration: line-through;
`
export const ProductPercenDiscount = styled.span`
  color: #ef4444;
`

export const ProductPrice = styled.p`
  margin-top: 10px;
  color: #ef4444;
  font-size: 17px;
  font-weight: 500;
`
