import styled from "styled-components";

export const block__cart_item = styled.div`
  background: #ffffff;
  padding: 10px 20px;
  border: 1px solid #dee2e7;
  border-radius: 6px;
`;

export const button__navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  button {
    font-size: 13px;
    padding: 7px 10px;
  }
`;

export const button__navigation_back = styled.div`
  button {
    span {
      margin-left: 10px;
    }
  }
`;
export const button__navigation_remote = styled.div`
  button {
    color: #0d6efd;
    background: #ffffff;
    border: 1px solid #dee2e7;
  }
`;

export const supply__policy = styled.div`
  margin-top: 29px;
`;
export const supply__policy_items = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
`;
export const supply__policy_item = styled.div`
  display: flex;
`;

export const icon = styled.div`
  width: 48px;
  height: 48px;
  background: #dee2e7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 16px;
    height: 21px;
  }
`;

export const text = styled.div`
  padding-left: 10px;
  font-size: 16px;
  h4 {
    color: #1c1c1c;
  }
  p {
    color: #a9acb0;
  }
`;

export const block__coupons = styled.div`
  background: #ffffff;
  height: 110px;
  padding: 10px 20px;
  border: 1px solid #dee2e7;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h3 {
    padding-bottom: 10px;
  }
`;

export const InputCoupon = styled.input`
  height: 41px;
  margin-right: 2px;
  &::placeholder {
    padding-left: 2px;
  }
`;
export const block__pay = styled.div`
  margin-top: 20px;
  padding: 20px 20px;
  background: #ffffff;
  border: 1px solid #dee2e7;
  border-radius: 6px;
`;
export const block__pay_caculator = styled.div`
  font-size: 16px;
`;
export const subtotal = styled.div`
  display: flex;
  justify-content: space-between;
  color: #505050;
  padding-bottom: 5px;
`;
export const discount = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
`;
export const key = styled.div`
  color: #505050;
`;
export const value = styled.div`
  color: #fa3434;
`;

export const tax = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const block__pay_total = styled.div`
  display: flex;
  justify-content: space-between;
  color: #1c1c1c;
  font-weight: 600;
  padding-bottom: 20px;
`;

export const block__pay_checout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    background: #00b517;
    padding: 16px 82px;
    border: none;
    font-size: 13px;
  }
`;
export const block__pay_credit = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  div {
    width: 20%;
    margin: 5px;
    img {
      width: 100%;
    }
  }
`;
