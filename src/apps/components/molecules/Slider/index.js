// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import './styled.css'
import { Navigation, Scrollbar } from 'swiper/modules'

const images = [
  {
    id: '1',
    path: 'https://img.upanh.tv/2023/10/07/slider1.webp',
  },
  {
    id: '3',
    path: 'https://img.upanh.tv/2023/10/07/slider3.webp',
  },
  {
    id: '7',
    path: 'https://img.upanh.tv/2023/10/07/slider7.webp',
  },
]

const Slider = () => {
  const option = {
    breakpoints: {
      320: {
        height: '200',
      },
      640: {
        height: '300',
      },
      768: {
        height: '400',
      },
      1024: {
        height: '600',
      },
      1100: {
        height: '600',
      },

      // Thêm các breakpoint khác nếu cần thiết
    },
  }
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
            <img src={image.path} alt="silde" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Slider
