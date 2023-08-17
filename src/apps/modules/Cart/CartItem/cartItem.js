import * as styles from "./styled";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


function CartItem() {

  

  return (
    <>
      <div>
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3">
          <div className = ".p-0 md:grid-cols-2 lg:grid-cols-2">
            <styles.product__cart_left>
              <img src="/logo512.png" alt="test" />
            </styles.product__cart_left>
          </div>

          <div className = ".p-0 md:grid-cols-8 lg:grid-cols-8">
            <styles.product__cart_between>
              <styles.title>name</styles.title>
              <styles.description>
                <p>
                  Size: medium, Color: blue, Material: Plastic
                  <br />
                  Seller: Artel Market
                </p>
              </styles.description>
              <styles.group__button>
                <styles.group__button_remote>
                  <button> Remove</button>
                </styles.group__button_remote>
                <styles.group__button_save>
                  <button>Save for later</button>
                </styles.group__button_save>
              </styles.group__button>
            </styles.product__cart_between>
          </div>

          <div className = ".p-0 md:grid-cols-2 lg:grid-cols-2">
            <div style={{ textAlign: "right"}}>
              <styles.price>
                <p>đ50.000 </p>
              </styles.price>

              <styles.quantity>
                <button >-</button>
                <input
                  type="number"
                  value= "1"
                  readOnly
                />
                <button >+</button>
              </styles.quantity>

            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}
export default CartItem;
