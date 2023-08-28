import * as styles from "./styled";
import { useDispatch } from "react-redux";
import {
  decrease_cart,
  increase_cart,
  remove_product,
} from "store/cartSlice/cartSlice";

function CartItem(props) {
  const { cart } = props;
  const dispatch = useDispatch();
  const handleOnClickDecrease = () => {
    dispatch(decrease_cart({ _id: cart._id }));
  };
  const handleOnClickIncrease = () => {
    dispatch(increase_cart({ _id: cart._id }));
  };
  const handleOnClickRemoveProduct = () => {
    dispatch(remove_product({ _id: cart._id }));
  };

  return (
    <>
      <div>
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-12 ">
          <div className=" lg:col-span-2 md:col-span-3 ">
            <styles.product__cart_left>
              <img src={cart?.thumbnail} alt="test" />
            </styles.product__cart_left>
          </div>

          <div className="lg:col-span-7 md:col-span-6 ">
            <styles.product__cart_between>
              <styles.title>{cart.title}</styles.title>
              <styles.description>
                <p>
                  Size: medium, Color: blue, Material: Plastic
                  <br />
                  Seller: Artel Market
                </p>
              </styles.description>
              <styles.group__button>
                <styles.group__button_remote>
                  <button onClick={handleOnClickRemoveProduct}>Remove</button>
                </styles.group__button_remote>
                <styles.group__button_save>
                  <button>Save for later</button>
                </styles.group__button_save>
              </styles.group__button>
            </styles.product__cart_between>
          </div>

          <div className="lg:col-span-3 md:col-span-3">
            <div style={{ textAlign: "right" }}>
              <styles.price>
                <p>{cart?.price} </p>
              </styles.price>

              <styles.quantity>
                <button
                  className="border border-blue-500 p-2"
                  onClick={handleOnClickDecrease}
                >
                  -
                </button>
                <input type="number" value={cart?.quantity} readOnly />
                <button
                  className="border border-blue-500 p-2"
                  onClick={handleOnClickIncrease}
                >
                  +
                </button>
              </styles.quantity>
            </div>
          </div>
        </div>
        <hr className=" mt-2" />
      </div>
    </>
  );
}
export default CartItem;
