import React from "react";
import * as styles from "./styledCart";
import {
  faArrowLeft,
  faChartBar,
  faLock,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItem from "./CartItem/cartItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = () => {
  const listCart = useSelector((state) => state?.cart?.products);
  const totalAfterDiscount = useSelector(
    (state) => state?.cart?.totalAfterDiscount
  );
  const totalBeforeDiscount = useSelector(
    (state) => state?.cart?.totalBeforeDiscount
  );

  const totalDiscount = useSelector((state) => state?.cart?.totalDiscount);
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log("totalDiscount", totalDiscount);

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
                {currentUser ? (
                  <button>Thanh Toán</button>
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
