import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import CustomButton from "./../customButton/CustomButton";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";
import { Pagination, Navigation } from "swiper/modules";

type CustomCardProps = {
  images: string[]; // Assuming images is an array of image URLs
  roomName: string;
  capacity: string;
  price: string;
  onSeeDetails: () => void;
};

const CustomCard: React.FC<CustomCardProps> = ({
  images,
  roomName,
  capacity,
  price,
  onSeeDetails,
}) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <div className="bg-white dark:bg-darkCard rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative group">
        {" "}
        {/* Added group for hover */}
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={false} // Disable pagination dots
          navigation={true} // Enables navigation buttons
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={roomName}
                className="w-full h-48 object-cover transform transition-transform duration-300"
              />
              <button
                onClick={handleLikeClick}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  liked ? "bg-red-500 text-white" : "bg-white text-red-500"
                } shadow-md`}
              >
                {liked ? (
                  <AiFillHeart size={20} />
                ) : (
                  <AiOutlineHeart size={20} />
                )}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Like button */}
      </div>

      <div className="p-4">
        <h3 className="text-lg dark:text-white font-semibold mb-2">
          {roomName}
        </h3>
        <p className="text-gray-600 dark:text-white mb-2">{capacity}</p>
        <p className="text-gray-800 dark:text-white font-bold mb-4">{price}</p>
        <div onClick={onSeeDetails}>
          <CustomButton name="See Details" />
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
