import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "../CardItem";

function SlideProduct(props) {
  const { products } = props;

  const swiperOptions = {
    slidesPerView: 5,
    spaceBetween: 20,
    pagination: {
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      390: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      600: {
        spaceBetween: 10,
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      // Thêm các breakpoint khác nếu cần thiết
    },
  };

  return (
    <>
      <Swiper {...swiperOptions}>
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <CardItem key={product.id} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
export default SlideProduct;
