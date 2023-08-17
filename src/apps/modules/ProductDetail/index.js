// Libraries
import React, { useEffect ,useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux"
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChartBar,
  faBasketShopping,
  faShieldHalved,
  faGlobe,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

// Query
import { useGetDataProductById } from "apps/queries/product/useGetDataProductById";

// Store
import { add_cart } from "store/cartSlice/cartSlice";

// Style
import { AddCart, Comment, InStock, Items, ProductContent, ProductContentDetail, ProductContentTitle, ProductContentValuate, ProductImage, ProductImageThumb, SaveLater, Sold, Supplier, SupplierButton, SupplierButtonProfile, SupplierInfoItem, SupplierTitle, SupplierTitleName } from "./styled";



const ProductDetail = () => {
  const { id } = useParams();
  const imgRef = useRef(null);
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState({});

  const { data, isLoading } = useGetDataProductById(id);

  const cartState = useSelector((state) => state.cart.products)

  
  const handleAddToCart = () => {
    dispatch(add_cart({product, quantity: 1 }));
  };

  useEffect(() => {
    setProduct(data)
  },[data])

  return (
    <>
      <div>
        <section className="mt-10 mx-auto px-3 max-w-screen-xl md:px-0 sm:px-4 ">
          <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 lg:rounded-md">
            <div className="lg:rounded-md lg:grid-cols-4">
              <ProductImage>
                {/* <img src="/logo512.png" ref={imgRef} alt={product.title} /> */}
                <img src={product?.image} alt="ảnh không tồn tại" />
                <ProductImageThumb>
                  {/* {product?.images.map((image, key) => (
                  <div key={key}>
                    <img
                      src={image}
                      onClick={() => {
                        imgRef.current.src = image;
                      }}
                      alt="2"
                    />
                  </div>
                ))} */}
                </ProductImageThumb>
              </ProductImage>
            </div>
            <div className="lg:grid-cols-5">
              <ProductContent>
                <InStock>
                  <FontAwesomeIcon icon={faCheck} />
                  <p>In Stock</p>
                </InStock>
                <ProductContentTitle>
                  {/* <h3>{product.description}</h3> */}
                </ProductContentTitle>
                <ProductContentValuate>
                  <div className="rating">
                    {/* <TextRating rating={product.rating} /> */}
                  </div>
                  <Comment>
                    <FontAwesomeIcon icon={faChartBar} />
                    <p>32 reviews</p>
                  </Comment>
                  <Sold>
                    <FontAwesomeIcon icon={faBasketShopping} />
                    <p>154 sold </p>
                  </Sold>
                </ProductContentValuate>
                <ProductContentDetail>
                  <Items>
                    <p className="key">Price:</p>
                    <p
                      className="value"
                      style={{
                        color: "#FA3434",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      đ {product?.unitPrice}{" "}
                    </p>
                  </Items>
                </ProductContentDetail>
                <ProductContentDetail>
                  <Items>
                    <p className="key">Type: </p>
                    <p className="value">Classic shoes</p>
                  </Items>
                  <Items>
                    <p className="key">Material: </p>
                    <p className="value">Plastic material</p>
                  </Items>
                  <Items>
                    <p className="key">Design: </p>
                    <p className="value">Modern nice</p>
                  </Items>
                </ProductContentDetail>
                <ProductContentDetail>
                  <Items>
                    <p className="key">Customization: </p>
                    <p className="value">
                      Customized logo and design custom packages
                    </p>
                  </Items>
                  <Items>
                    <p className="key">Protection:</p>
                    <p className="value">Refund Policy</p>
                  </Items>
                  <Items>
                    <p className="key">Warranty: </p>
                    <p className="value">2 years full warranty </p>
                  </Items>
                </ProductContentDetail>
              </ProductContent>
            </div>
            <div className="lg:grid-cols-3">
              <Supplier>
                <SupplierTitle>
                  {/* <img src={product.thumbnail} alt={product.title} /> */}
                  <img src={product?.image} alt={product?.name} />
                  <SupplierTitleName>
                    <h3>Supplier</h3>
                    {/* <h3>{product.brand}</h3> */}
                  </SupplierTitleName>
                </SupplierTitle>
                <div className="supplier__info">
                  <SupplierInfoItem>
                    <img src="/logo192.png" alt="country" />
                    <p>Germany, Berlin</p>
                  </SupplierInfoItem>

                  <SupplierInfoItem>
                    <FontAwesomeIcon icon={faShieldHalved} />
                    <p>Verified Seller</p>
                  </SupplierInfoItem>

                  <SupplierInfoItem>
                    <FontAwesomeIcon icon={faGlobe} />
                    <p>Worldwide shipping</p>
                  </SupplierInfoItem>
                </div>
                <SupplierButton>
                  <div style={{ color: "#ffffff" }}>
                    <AddCart onClick={handleAddToCart}>
                      Send inquiry
                    </AddCart>
                  </div>
                  <SupplierButtonProfile>
                    <button> Seller's profile</button>
                  </SupplierButtonProfile>
                </SupplierButton>
                {/* <ToastMessage showToast={showToast} setShowToast={setShowToast} toastMessage={toastMessage} /> */}
              </Supplier>

              <SaveLater>
                <button>
                  <FontAwesomeIcon icon={faHeart} />
                  <span>Save for later</span>
                </button>
              </SaveLater>
            </div>
          </div>
        </section>
      </div>

      {/* <div>
            <RelatedProduct category={product.category} />
        </div> */}
    </>
  );
};

export default ProductDetail;
