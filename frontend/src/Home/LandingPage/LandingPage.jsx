import "./Landingpage.css";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { GrLocation } from "react-icons/gr";
import Countdown from "../Countdown/Countdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { EffectCards } from "swiper/modules";

const LandingPage = () => {
  const images = Object.values(
    import.meta.glob("/src/assets/commonheroimages/*", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  );

  return (
    <div className="landing_page">
      <div
        className="left_content"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <h1>
          <span>
            3<sup>rd</sup>
          </span>
          World Conference on Multidisciplinary Research & Practices (WCMRP -
          2027)
        </h1>
        <h3>
          Theme: "Integrating Knowledge Across Disciplines for Global Impact:
          Innovations, Challenges and Sustainable Solutions"
        </h3>
        <div className="Hybrid">Hybrid conference (In person + Virtual)</div>
        <p className="Hybrid">
          <strong>Organized by:</strong> Confworld Educational Research and
          Development Association
        </p>
        <div className="Hybrid">ISBN: 978-63-277645-3-5</div>
        <div className="venue">
          <button>
            <HiOutlineCalendarDateRange /> 24-25 May, 2027
          </button>
          <button>
            <GrLocation />
            Kuala Lumpur, Malaysia
          </button>
        </div>
        <Countdown />
      </div>
      <div
        className="common-hero-slider"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <Swiper
          modules={[Autoplay, Navigation, EffectCards]}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                loading="eager"
                alt={`Conference ${index + 1}`}
                className="common-hero-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LandingPage;
