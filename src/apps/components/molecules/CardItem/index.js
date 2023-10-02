// Libraries
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Rating from 'react-rating'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// Styled
import {
  ProductItemStyle,
  ProductPercenDiscount,
  ProductPrice,
  ProductPriceDiscount,
} from './styled'
import { Badge } from 'antd'

const CardItem = (props) => {
  const { product } = props

  return (
    <Link to={`/product/${product?._id}`}>
      {product?.sold >= 50 ? (
        <Badge.Ribbon text="Bán chạy" color="red">
          <ProductItemStyle className=" mx-auto lg:h-[22rem] md:h-80 mt-4 shadow-lg border rounded-md  duration-300 hover:shadow-sm bg-white">
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
                      alt="test"
                      src={'/assets/image/sold_out.png'}
                    />
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 ml-2 mr-2 mb-3">
              <h3 className=" text-gray-900 lg:h-10 h-8 md:text-sm lg:text-sm overflow-clip font-medium text-xs">
                <span className="line-clamp-2 ">{product?.title}</span>
              </h3>
              <div>
                <Rating
                  className="text-xs lg:text-sm"
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
                  | Đã bán {product?.sold}
                </span>
              </div>
              {product?.discountPercentage !== 0 ? (
                <div className="font-normal text-xs text-zinc-400 mt-1">
                  <ProductPriceDiscount>
                    {Math.ceil(product?.price).toLocaleString('vi-VN')} VND
                  </ProductPriceDiscount>
                  <ProductPercenDiscount>
                    {product?.discountPercentage}%
                  </ProductPercenDiscount>
                  <ProductPrice>
                    {(
                      Math.ceil(
                        (product?.price -
                          (product?.price * product?.discountPercentage) / 100) /
                          1000,
                      ) * 1000
                    ).toLocaleString('vi-VN')}{' '}
                    VND
                  </ProductPrice>
                </div>
              ) : (
                <ProductPrice>
                  {Math.ceil(product?.price).toLocaleString('vi-VN')} VND
                </ProductPrice>
              )}
            </div>
          </ProductItemStyle>
        </Badge.Ribbon>
      ) : (
        <ProductItemStyle className=" mx-auto lg:h-[22rem] md:h-80 mt-4 shadow-lg border rounded-md  duration-300 hover:shadow-sm bg-white">
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
                    alt="test"
                    src={'/assets/image/sold_out.png'}
                  />
                </span>
              )}
            </div>
          </div>

          <div className="pt-3 ml-2 mr-2 mb-3">
            <h3 className=" text-gray-900 h-8 lg:h-10 overflow-x-clip  overflow-clip  md:text-sm lg:text-sm font-medium text-xs">
              <span className="line-clamp-2"> {product?.title}</span>
            </h3>
            <div>
              <Rating
                className="text-xs lg:text-sm"
                initialRating={product?.rating}
                emptySymbol={<FontAwesomeIcon icon={faStar} className="text-gray-300" />}
                fullSymbol={<FontAwesomeIcon icon={faStar} className="text-yellow-500" />}
                readonly
              />
              <span className="text-xs md:text-sm text-zinc-400 pl-1">
                | Đã bán {product?.sold}
              </span>
            </div>
            {product?.discountPercentage !== 0 ? (
              <div className="font-normal text-xs text-zinc-400 mt-1">
                <ProductPriceDiscount>
                  {Math.ceil(product?.price).toLocaleString('vi-VN')} VND
                </ProductPriceDiscount>
                <ProductPercenDiscount>
                  {product?.discountPercentage}%
                </ProductPercenDiscount>
                <ProductPrice>
                  {(
                    Math.ceil(
                      (product?.price -
                        (product?.price * product?.discountPercentage) / 100) /
                        1000,
                    ) * 1000
                  ).toLocaleString('vi-VN')}{' '}
                  VND
                </ProductPrice>
              </div>
            ) : (
              <ProductPrice>
                {Math.ceil(product?.price).toLocaleString('vi-VN')} VND
              </ProductPrice>
            )}
          </div>
        </ProductItemStyle>
      )}
    </Link>
  )
}
export default CardItem
