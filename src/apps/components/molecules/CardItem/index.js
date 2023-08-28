import { Link } from "react-router-dom";
import {
  CartImageStyle,
  ProductItemStyle,
  ProductPercenDiscount,
  ProductPrice,
  ProductPriceDiscount,
} from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Rating from "react-rating";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "antd";

const CardItem = (props) => {
  const { product } = props;

  return (
    //className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
    <Link to={`/product/${product?._id}`}>
      <ProductItemStyle className=" mx-auto lg:h-96 md:h-80 mt-4 shadow-lg border rounded-md  duration-300 hover:shadow-sm">
        <div>
          <div className="relative ">
            <LazyLoadImage
              alt={product?.title}
              src={product?.thumbnail}
              effect="black-and-white"
              className="w-full rounded-t-md  lg:h-52 md:h-48 "
            />

            {product.stock === 0 && (
              <span className=" absolute top-1/4">
                <img
                  className="w-24 md:w-36 m-auto"
                  src={"/assets/image/sold_out.png"}
                />
              </span>
            )}
          </div>
        </div>

        <div className="pt-3 ml-2 mr-2 mb-3">
          <h3 className=" text-gray-900 h-14 text-md overflow-clip md:text-lg font-medium">
            {product?.title}
          </h3>
          <div>
            <Rating
              initialRating={product?.rating}
              emptySymbol={
                <FontAwesomeIcon icon={faStar} className="text-gray-300" />
              }
              fullSymbol={
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              }
              readonly
            />
            <span className="text-xs md:text-sm text-zinc-400 pl-1">
              | Đã bán {product?.stock}
            </span>
          </div>
          {product?.discountPercentage !== 0 ? (
            <div className="font-normal text-xs text-zinc-400 mt-1 ">
              <ProductPriceDiscount>{product?.price}</ProductPriceDiscount>
              <ProductPercenDiscount>
                {product?.discountPercentage}%
              </ProductPercenDiscount>
              <ProductPrice>
                {Math.round(
                  product?.price * product?.discountPercentage
                ).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </ProductPrice>
            </div>
          ) : (
            <ProductPrice>
              {product?.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </ProductPrice>
          )}
        </div>
      </ProductItemStyle>
    </Link>
  );
};
export default CardItem;
