import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useGetAllRoomsQuery } from "../../redux/features/room/roomApi";
import { ScrollRestoration, useLocation } from "react-router-dom";
import "./styles.css";
import CustomButton2 from "../../components/customButton/CustomButton";
import BounceLoader  from 'react-spinners/BounceLoader';

const RoomDetails = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const id = pathName.split("/")[2];

  // Fetch all rooms
  const { data, isLoading } = useGetAllRoomsQuery(undefined);
  const rooms = data?.data;

  // Find the specific room based on ID
  const singleRoom = rooms?.find((room) => room?._id === id);
  console.log(singleRoom);

  return (
    <>
     <ScrollRestoration />
      {isLoading ? (
        <div className="flex justify-center items-center">
          <BounceLoader className="text-primary" />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-24">
          {/* Image and Room Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Swiper for Room Images */}
            <div className="flex-1 h-auto ">
              {singleRoom?.images && (
                <Swiper
                  autoplay
                  slidesPerView={1}
                  spaceBetween={30}
                  loop={true}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper group"
                >
                  {singleRoom.images.map((image, index) => (
                    <SwiperSlide key={index} style={{ height: "330px" }}>
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        style={{ height: "100%", borderRadius: "10px", }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>

            {/* Room Info */}
            <div className="mt-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {singleRoom?.name || "Queen Standard Handicap Room"}
              </h2>
              <div className="flex gap-10">
                <p className="text-gray-600 mb-4">
                  <span className="font-bold">Room No : </span>
                  {singleRoom?.roomNo}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-bold">Capacity : </span>
                  {singleRoom?.capacity}
                </p>
              </div>

              <div className="flex gap-10">
                <p className="text-gray-600 mb-4">
                  <span className="font-bold">Floor No : </span>
                  {singleRoom?.floorNo}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-bold">Price Per Slot : </span>$
                  {singleRoom?.pricePerSlot}
                </p>
              </div>

              {/* Included Items */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Included Amenities:
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {singleRoom?.amenities?.map((amenity) => (
                    <li key={amenity}>{amenity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="mt-8 bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Optional Amenities :-
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* General Services */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  General Services
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Non-Smoking</li>
                  <li>Heater</li>
                  <li>Microwave</li>
                  <li>Handicap</li>
                  <li>Air-Conditioner</li>
                  <li>Refrigerator</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800">Extras</h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Coffee & Tea</li>
                  <li>Hairdryer</li>
                  <li>Daily Housekeeping</li>
                  <li>Desk</li>
                  <li>Iron/Ironing Board</li>
                </ul>
              </div>

              {/* Technology */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Technology
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>LCD/LED TV</li>
                  <li>Direct Dial Phone</li>
                  <li>Alarm Clock</li>
                  <li>Electronic Locks</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center">
            <CustomButton2 name="Book Now" />
          </div>
        </div>
      )}
    </>
  );
};

export default RoomDetails;