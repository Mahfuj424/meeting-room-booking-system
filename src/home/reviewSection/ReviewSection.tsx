
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import SectionHeader from "../../shared/sectionHeader/SectionHeader";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Ananda",
      title: "Happy Customer",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvmFh3UxOkWLzHVS8_c4MDbDNsZhPvvxcXg&usqp=CAU",
      review:
        "Great experience with their service. The team was professional and responsive. Highly recommended!",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Naila Ahmed",
      title: "Satisfied Client",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrMsjv2aRDz0wFHZZnjX0ouwL8OJiKG4AEfQ&usqp=CAU",
      review:
        "I've been a customer for several years and they never disappoint. Excellent products and top-notch support.",
      rating: 5,
    },
    {
      id: 3,
      name: "Siyam Khan",
      title: "Happy Customer",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LmG47_W3RM0QBVGI23-vodL_oOOJxLIBrg&usqp=CAU",
      review:
        "Their attention to detail is impressive. I keep coming back for more because of their exceptional quality.",
      rating: 4,
    },
    {
      id: 4,
      name: "Jane Smith",
      title: "Satisfied Client",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJTXWQhh2bNNhKsu3dmndg6aIR2sddOVPkw&usqp=CAU",
      review:
        "I couldn't be happier with their service. The team went above and beyond to ensure my satisfaction.",
      rating: 5,
    },
    {
      id: 5,
      name: "Mahfuj Ahmed",
      title: "Happy Customer",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHgUPyeYU1AJPWutzLta21bU6C2BkNwYTCfA&usqp=CAU",
      review:
        "Their attention to detail is impressive. I keep coming back for more because of their exceptional quality.",
      rating: 4.5,
    },
    {
      id: 6,
      name: "Mahbub khan",
      title: "Satisfied Client",
      image:
        "https://media.istockphoto.com/id/1270067126/photo/smiling-indian-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=ovIQ5GPurLd3mOUj82jB9v-bjGZ8updgy1ACaHMeEC0=",
      review:
        "I couldn't be happier with their service. The team went above and beyond to ensure my satisfaction.",
      rating: 5,
    },
  ];

  return (
    <div className=" rounded-xl mt-10 md:p-10 max-w-7xl mx-auto">
      <SectionHeader title="Testimonial" description="What Our Clients Say" />
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          "@0.75": {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <div className="p-4 md:p-0 ">
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 130 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                className="testimonial-item hover:shadow-2xl p-5  rounded-lg w-full"
              >
                <div className="testimonial-content bg-base-200 dark:bg-gray-800 p-5 rounded-md w-full">
                  <div className="testimonial-details w-full">
                    <div className="testimonial-review w-full">
                      <blockquote className="flex">
                        <span className="quote-icon">
                          <FaQuoteLeft className="text-primary dark:text-yellow-500" />
                        </span>
                        <p className="testimonial-text w-full text-gray-700 dark:text-gray-300">
                          {testimonial.review}
                        </p>
                        <span className="quote-icon1">
                          <FaQuoteRight className="text-primary dark:text-yellow-500" />
                        </span>
                      </blockquote>
                    </div>
                  </div>
                  <div className="testimonial-image mt-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="rounded-full"
                      style={{ width: "90px", height: "90px" }}
                    />
                  </div>
                  <h3 className="testimonial-name text-gray-900 dark:text-gray-100">
                    {testimonial.name}
                  </h3>
                  <p className="testimonial-title text-gray-600 dark:text-gray-400">
                    {testimonial.title}
                  </p>
                  {/* <ReactStars
                    count={5}
                    value={testimonial.rating}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                  /> */}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Testimonial;
