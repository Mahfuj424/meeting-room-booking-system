import { Link } from "react-router-dom";
import CustomButton from "../../components/customButton/CustomButton";

const Banner = () => {
  return (
    <div
      className="max-w-7xl mx-auto py-24 pt-36 px-4 md:px-0 flex flex-col lg:flex-row items-center justify-between bg-white  dark:bg-darkBg"
      // Subtract 30px from the full screen height
    >
      <div className="text-content lg:w-1/2 text-black dark:text-white">
        <h1 className="text-4xl md:text-5xl">
          Book Your Ideal Meeting Room with{" "}
          <span className="text-primary">Ease.</span>
        </h1>
        <p className="text-secondary mt-4 dark:text-white">
          Discover the ideal companion to share your living space with ease and
          comfort. Our platform connects you with like-minded individuals,
          simplifying your search for the perfect Room.
        </p>
        <div className="mt-6">
          <Link to="/meeting-rooms">
            <CustomButton name="Book Now" />
          </Link>
        </div>
      </div>
      <div className="image-content lg:w-1/2 mt-8 lg:mt-0">
        <img
          src="https://i.ibb.co/M5rF11m/banner-Room-Image.webp"
          alt="room booking"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Banner;
