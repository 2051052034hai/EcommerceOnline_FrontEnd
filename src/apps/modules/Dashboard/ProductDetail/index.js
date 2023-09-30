// Libraries
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faChartBar,
  faBasketShopping,
  faShieldHalved,
  faGlobe,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'

// Query
import { useGetDataProductById } from 'apps/queries/product/useGetDataProductById'

// Store
import { add_cart } from 'store/cartSlice/cartSlice'

// Style
import {
  AddCart,
  Comment,
  IconRating,
  InStock,
  Items,
  ProductContent,
  ProductContentDetail,
  ProductContentTitle,
  ProductContentValuate,
  ProductImage,
  ProductImageThumb,
  RelatedProduct,
  SaveLater,
  Sold,
  SupplierButton,
  SupplierButtonProfile,
  SupplierInfoItem,
  SupplierTitle,
  SupplierTitleName,
  TextIconRating,
} from './styled'
import Rating from 'react-rating'
import SlideProduct from 'apps/components/molecules/SliderProduct'
import ProductSkeleton from 'apps/components/molecules/ProductSkeleton'
import { Button, Col, Skeleton, Typography } from 'antd'
import { useGetProductBySubId } from 'apps/queries/subcategory'

const { Paragraph } = Typography
const ProductDetail = () => {
  const { id } = useParams()
  const imgRef = useRef(null)
  const dispatch = useDispatch()
  const [product, setProduct] = useState({})

  const [relatedProducts, setRelatedProducts] = useState([])
  const { data, isLoading } = useGetDataProductById(id)

  useEffect(() => {
    setProduct(data)
  }, [data])

  const subcategory = product?.subcategory
  const shop = product?.shop

  const { data: relatedProductsData } = useGetProductBySubId(subcategory?._id)
  useEffect(() => {
    if (Array.isArray(relatedProductsData?.product)) {
      setRelatedProducts(relatedProductsData?.product)
    }
  }, [relatedProductsData?.product])

  const handleAddToCart = () => {
    dispatch(add_cart({ ...product, quantity: 1 }))
  }

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <div>
        <section className="mt-10 mx-auto px-3 max-w-screen-xl md:px-0  ">
          <div className="flex  gap-y-6 flex-wrap  justify-center ">
            {isLoading ? (
              <Skeleton
                avatar
                paragraph={{
                  rows: 10,
                }}
              />
            ) : (
              <>
                <Col
                  lg={{ span: 6, order: 1 }}
                  md={{ span: 11, order: 1 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                >
                  <div className="flex items-center justify-center">
                    <ProductImage>
                      <img
                        src={product?.thumbnail}
                        ref={imgRef}
                        alt="ảnh không tồn tại"
                      />
                      <ProductImageThumb>
                        {product?.images?.map((image, index) => (
                          <div key={index}>
                            <img
                              src={image}
                              onClick={() => {
                                imgRef.current.src = image
                              }}
                              alt="2"
                            />
                          </div>
                        ))}
                      </ProductImageThumb>
                    </ProductImage>
                  </div>
                </Col>
                <Col
                  lg={{ span: 12, order: 2 }}
                  md={{ span: 24, order: 3 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                >
                  <ProductContent>
                    {product?.stock !== 0 ? (
                      <InStock>
                        <FontAwesomeIcon icon={faCheck} />
                        <p>Còn hàng</p>
                      </InStock>
                    ) : (
                      <InStock>
                        <FontAwesomeIcon icon={faCheck} />
                        <p>Hết hàng</p>
                      </InStock>
                    )}
                    <ProductContentTitle>
                      <h3>{product?.title}</h3>
                    </ProductContentTitle>
                    <ProductContentValuate>
                      <TextIconRating>
                        <IconRating>
                          <Rating
                            initialRating={product?.rating}
                            emptySymbol={
                              <FontAwesomeIcon icon={faStar} className="text-gray-300" />
                            }
                            fullSymbol={
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-yellow-500"
                              />
                            }
                            readonly
                          />
                        </IconRating>
                        {product?.rating}
                      </TextIconRating>

                      <Comment>
                        <FontAwesomeIcon icon={faChartBar} />
                        <p>32 reviews</p>
                      </Comment>
                      <Sold>
                        <FontAwesomeIcon icon={faBasketShopping} />
                        <p>{product?.stock} sold </p>
                      </Sold>
                    </ProductContentValuate>

                    <div className="flex items-center bg-gray-100 mt-2 md:px-3 px-2 md:py-5 py-3 rounded">
                      <div className="md:text-xl text-xl font-medium mr-2 text-red-500">
                        {Math.round(
                          product?.price -
                            (product?.price * product?.discountPercentage) / 100,
                        ).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </div>
                      <div className="flex items-center ">
                        <span className="line-through text-sm md:text-base font-medium mr-2 text-gray-400">
                          {Math.round(product?.price).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </span>
                        <span>{Math.round(product?.discountPercentage)}%</span>
                      </div>
                    </div>
                  </ProductContent>
                </Col>
                <Col
                  lg={{ span: 6, order: 3 }}
                  md={{ span: 11, order: 2 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                >
                  <div className="border border-gray-500 rounded-md p-3 ">
                    <SupplierTitle>
                      <img src={product?.thumbnail} alt={product?.title} />
                      <SupplierTitleName>
                        <h3>Cửa hàng</h3>
                        <h3>{shop?.name}</h3>
                      </SupplierTitleName>
                    </SupplierTitle>
                    <div className="supplier__info">
                      <SupplierInfoItem>
                        <img src="/logo192.png" alt="country" />
                        <p>{shop?.address}</p>
                      </SupplierInfoItem>

                      <SupplierInfoItem>
                        <FontAwesomeIcon icon={faShieldHalved} />
                        <p>Đã chứng thực</p>
                      </SupplierInfoItem>

                      <SupplierInfoItem>
                        <FontAwesomeIcon icon={faGlobe} />
                        <p>Free ship</p>
                      </SupplierInfoItem>
                    </div>
                    <SupplierButton>
                      <AddCart
                        style={{
                          color: '#ffffff',
                        }}
                        disabled={product?.stock === 0}
                        onClick={handleAddToCart}
                      >
                        Thêm vào giỏ
                      </AddCart>
                      <SupplierButtonProfile>
                        <button> Xem cửa hàng</button>
                      </SupplierButtonProfile>
                    </SupplierButton>

                    <SaveLater>
                      <button>
                        <FontAwesomeIcon icon={faHeart} />
                        <span>Yêu thích</span>
                      </button>
                    </SaveLater>
                  </div>
                </Col>
              </>
            )}
          </div>
        </section>
      </div>
      <div>
        <section className="mt-10 mx-auto px-3 max-w-screen-xl md:px-0 mb-8  ">
          <RelatedProduct>Giới thiệu sản phẩm</RelatedProduct>

          <Paragraph
            style={{ maxHeight: expanded ? 'none' : 200, overflow: 'hidden' }}
            className={expanded ? 'expanded-paragraph' : ''}
          >
            <div dangerouslySetInnerHTML={{ __html: product?.description }}></div>
          </Paragraph>
          {!expanded && (
            <Button type="link" onClick={toggleExpanded}>
              Xem thêm
            </Button>
          )}
        </section>
      </div>

      <section className="mt-10 mx-auto px-3 max-w-screen-xl md:px-0 mb-8  ">
        <RelatedProduct>Sản phẩm liên quan</RelatedProduct>
        {relatedProducts.length === 0 ? (
          <div className="grid gap-5 py-4 px-2 md:px-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {Array.from(Array(5), (_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          <SlideProduct products={relatedProducts} />
        )}
      </section>
    </>
  )
}

export default ProductDetail
