// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "./styled.css";
import { Navigation, Scrollbar } from "swiper/modules";

const images = [
  {
    id: "1",
    path: "/assets/image/slider1.png",
  },
  {
    id: "3",
    path: "/assets/image/slider3.png",
  },
  {
    id: "7",
    path: "/assets/image/slider7.png",
  },
];

const Slider = () => {
  const option = {
    breakpoints: {
      320: {
        height: "200",
      },
      640: {
        height: "300",
      },
      768: {
        height: "400",
      },
      1024: {
        height: "500",
      },

      // Thêm các breakpoint khác nếu cần thiết
    },
  };
  return (
    <>
      <Swiper
        {...option}
        scrollbar={{
          hide: true,
        }}
        navigation={true}
        modules={[Scrollbar, Navigation]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.path}
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
