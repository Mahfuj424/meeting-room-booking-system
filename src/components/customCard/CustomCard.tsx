import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import CustomButton from "../customButton/CustomButton";

type CustomCardProps = {
  imageUrl: string;
  roomName: string;
  capacity: string;
  price: string;
  onSeeDetails: () => void;
};

const CustomCard: React.FC<CustomCardProps> = ({
  imageUrl,
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={imageUrl}
          alt={roomName}
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleLikeClick}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            liked ? "bg-red-500 text-white" : "bg-white text-red-500"
          } shadow-md`}
        >
          {liked ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{roomName}</h3>
        <p className="text-gray-600 mb-2">{capacity}</p>
        <p className="text-gray-800 font-bold mb-4">{price}</p>
        <div onClick={onSeeDetails}>
          <CustomButton name="See Details"/>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
