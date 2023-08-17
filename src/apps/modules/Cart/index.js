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

const Cart = () => {
  return (
    <>
      <section className="mt-10 mx-auto px-3 max-w-screen-xl md:px-0 sm:px-4 ">
        <div >
          <div className="gird ">
            <div className="md:grid-cols-9" >
              <styles.block__cart_item>
                <CartItem  />

                <styles.button__navigation>
                  <styles.button__navigation_back>
                    <Link to = "/">
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
            <div  className="md:grid-cols-3">
              <styles.block__coupons>
                <h3>Have a coupon?</h3>
                <div style={{ height: "40px" }}>
                  <input
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
                    <styles.key>Subtotal:</styles.key>
                    <styles.value>100.000 đ</styles.value>
                  </styles.subtotal>
                  <styles.discount>
                    <styles.key>Discount:</styles.key>
                    <styles.value>- $0</styles.value>
                  </styles.discount>
                  <styles.tax>
                    <styles.key>Tax:</styles.key>
                    <styles.value>+ $0</styles.value>
                  </styles.tax>
                  <hr />
                </styles.block__pay_caculator>

                <styles.block__pay_total>
                  <div style={{ fontSize: "19px" }}>Total:</div>
                  <div style={{ fontSize: "20px" }}>100.000 đ</div>
                </styles.block__pay_total>

                <styles.block__pay_checout>
                  <button>Check Out</button>
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
      </section>
    </>
  );
};

export default Cart;
