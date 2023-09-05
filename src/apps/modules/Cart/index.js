// Libraries
import React, { useEffect, useState } from "react";
import * as styles from "./styledCart";
import {
  faArrowLeft,
  faChartBar,
  faLock,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { PayPalButton } from "react-paypal-button-v2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Radio } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//Components
import CartItem from "./CartItem/cartItem";

// Store
import { selectCurrentUser } from "store/userSlice/userSelector";

// Queries
import { useSaveCart } from "apps/queries/cart/useSaveCart";
import { getPaymentConfig } from "apps/services/apis/payment.api";

const Cart = () => {
  const [valuePayment, setValuePayment] = useState(1);
  const [skdReady, setSdkReady] = useState(false);

  const listCart = useSelector((state) => state?.cart?.products);
  const totalAfterDiscount = useSelector(
    (state) => state?.cart?.totalAfterDiscount
  );
  const totalBeforeDiscount = useSelector(
    (state) => state?.cart?.totalBeforeDiscount
  );

  const totalDiscount = useSelector((state) => state?.cart?.totalDiscount);
  const currentUser = useSelector(selectCurrentUser);
  const { mutation } = useSaveCart();

  const handleOrder = () => {
    const saveNewCart = [];
    for (var i = 0; i < listCart.length; i++) {
      var item = listCart[i];
      var newItem = {
        product: item._id,
        qty: item.quantity,
      };
      saveNewCart.push(newItem);
    }
    const data_save = {
      userId: currentUser?._id,
      orderItems: saveNewCart,
      total: totalAfterDiscount,
    };
    mutation.mutate(data_save);
  };
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValuePayment(e.target.value);
  };

  const addPayPalScript = async () => {
    const data = await getPaymentConfig();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const onSuccessPayment = (details, data) => {
    const saveNewCart = [];
    for (var i = 0; i < listCart.length; i++) {
      var item = listCart[i];
      var newItem = {
        product: item._id,
        qty: item.quantity,
      };
      saveNewCart.push(newItem);
    }
    const data_save = {
      userId: currentUser?._id,
      orderItems: saveNewCart,
      total: totalAfterDiscount,
      statusPayment: true,
      updatedAt: details.update_time,
    };
    mutation.mutate(data_save);
  };

  return (
    <>
      <div>
        <div className="grid md:grid-cols-12 lg:grid-cols-12 gap-4 mt-5 lg:px-8 ">
          <div className="lg:col-span-9 md:col-span-7 bg-gray-300 p-4 rounded-md">
            <styles.block__cart_item>
              {listCart?.map((cart, index) => (
                <CartItem cart={cart} key={cart?.id} />
              ))}

              <styles.button__navigation>
                <styles.button__navigation_back>
                  <Link to="/">
                    <button>
                      <FontAwesomeIcon icon={faArrowLeft} />
                      <span>Back to Home</span>
                    </button>
                  </Link>
                </styles.button__navigation_back>
                <styles.button__navigation_remote>
                  <button>Remove All</button>
                </styles.button__navigation_remote>
              </styles.button__navigation>
              <div>
                <Radio.Group onChange={onChange} value={valuePayment}>
                  <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                  <Radio value={2}>Thanh toán PayPal</Radio>
                </Radio.Group>
              </div>
            </styles.block__cart_item>

            <styles.supply__policy>
              <styles.supply__policy_items>
                <styles.supply__policy_item>
                  <styles.icon>
                    <FontAwesomeIcon icon={faLock} />
                  </styles.icon>
                  <styles.text>
                    <h4>Secure payment</h4>
                    <p>Have you ever finally just </p>
                  </styles.text>
                </styles.supply__policy_item>
                <styles.supply__policy_item>
                  <styles.icon>
                    <FontAwesomeIcon icon={faChartBar} />
                  </styles.icon>
                  <styles.text>
                    <h4>Customer support</h4>
                    <p>Have you ever finally just </p>
                  </styles.text>
                </styles.supply__policy_item>
                <styles.supply__policy_item>
                  <styles.icon>
                    <FontAwesomeIcon icon={faTruckFast} />
                  </styles.icon>
                  <styles.text>
                    <h4>Free delivery</h4>
                    <p>Have you ever finally just </p>
                  </styles.text>
                </styles.supply__policy_item>
              </styles.supply__policy_items>
            </styles.supply__policy>
          </div>
          <div className="lg:col-span-3 md:col-span-5 items-end  p-4  ">
            <styles.block__coupons>
              <h3>Have a coupon?</h3>
              <div>
                <styles.InputCoupon
                  style={{ border: "1px solid #DEE2E7", fontSize: "13px" }}
                  placeholder="Add Coupons"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <button
                  variant="outline-secondary"
                  style={{
                    padding: "10px 20px",
                    color: "#0D6EFD",
                    border: "1px solid #DEE2E7",
                    fontSize: "13px",
                  }}
                >
                  Apply
                </button>
              </div>
            </styles.block__coupons>

            <styles.block__pay>
              <styles.block__pay_caculator>
                <styles.subtotal>
                  <styles.key>Tổng tiền:</styles.key>
                  <styles.value>
                    {Math.ceil(totalBeforeDiscount).toLocaleString("vi-VN")}
                    VND
                  </styles.value>
                </styles.subtotal>
                <styles.discount>
                  <styles.key>Giảm giá:</styles.key>
                  <styles.value>
                    {Math.ceil(totalDiscount).toLocaleString("vi-VN")} VND
                  </styles.value>
                </styles.discount>
                <styles.tax>
                  <styles.key>Phí vận chuyển:</styles.key>
                  <styles.value>+ $0</styles.value>
                </styles.tax>
                <hr className="my-3" />
              </styles.block__pay_caculator>

              <styles.block__pay_total>
                <div style={{ fontSize: "16px" }}>Tổng tiền phải trả:</div>
                <div style={{ fontSize: "16px" }}>
                  {Math.ceil(totalAfterDiscount).toLocaleString("vi-VN")} VND
                </div>
              </styles.block__pay_total>

              <styles.block__pay_checout>
                {currentUser?._id ? (
                  valuePayment === 1 && skdReady ? (
                    <button onClick={handleOrder}>Đặt hàng</button>
                  ) : valuePayment === 2 ? (
                    <div style={{ width: "300px" }}>
                      <PayPalButton
                        amount={totalAfterDiscount / 30000}
                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={onSuccessPayment}
                        onError={() => {
                          alert("Error");
                        }}
                      />
                    </div>
                  ) : null
                ) : (
                  <Link to="/login">
                    <button>Đăng nhập</button>
                  </Link>
                )}
              </styles.block__pay_checout>
              <styles.block__pay_credit>
                <div>
                  <img src="/assets/pay1.png" alt="pay1" />
                </div>
                <div>
                  <img src="/assets/pay2.png" alt="pay2" />
                </div>
                <div>
                  <img src="/assets/pay3.png" alt="pay3" />
                </div>
                <div>
                  <img src="/assets/pay4.png" alt="pay4" />
                </div>
                <div>
                  <img src="/assets/pay5.png" alt="pay5" />
                </div>
              </styles.block__pay_credit>
            </styles.block__pay>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
