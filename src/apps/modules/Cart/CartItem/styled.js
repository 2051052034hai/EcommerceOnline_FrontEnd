import { styled } from "styled-components";

export const product__cart_left = styled.div`
width: 110px;
height: 110px;
background: #e0e0e0;
border: 1px solid #dee2e7;
border-radius: 6px;
display: flex;
align-items: center;
justify-content: center;
img {
    width: 80px;
    height: 90px;
    object-fit: cover;
}
`
export const product__cart_between = styled.div`
font-size: 16px;
padding-bottom: 20px;
`
export const title = styled.div`
color: #1c1c1c;
font-weight: 600;
`
export const description = styled.div`
color: #8b96a5;
padding: 10px 0;
`
export const group__button = styled.div`
display: flex;
button {
    padding: 7px 10px;
    background: #ffffff;
    border: 1px solid #dee2e7;
    font-size: 13px;
}
`
export const group__button_remote = styled.div`
margin-right: 20px;
button {
    color: #fa3434;
}
}
`

export const group__button_save = styled.div`
button {
    color: #0d6efd;
}
}
`
export const quantity = styled.div`
display: flex;

input {
    width: 100%;
    text-align: center;
    border: 1px solid #dee2e7;
}
button {
    background: #ffffff;
    color: #0d6efd;
    padding: 5px 10px;
    font-size: 13px;
}
`
    
export const price = styled.div`

`