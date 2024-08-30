import CustomButton from "../../components/customButton/CustomButton";

const Banner = () => {
  return (
    <div
      className="max-w-[1200px] mx-auto py-24 px-4 flex flex-col lg:flex-row items-center justify-between bg-white  dark:bg-darkBg"
      // Subtract 30px from the full screen height
    >
      <div className="text-content lg:w-1/2 text-black dark:text-white">
        <h1 className="text-4xl md:text-5xl">
          Find Your Perfect Meeting Room{" "}
          <span className="text-primary">Today!</span>
        </h1>
        <p className="text-secondary mt-4 dark:text-white">
          Discover the ideal companion to share your living space with ease and
          comfort. Our platform connects you with like-minded individuals,
          simplifying your search for the perfect flat-mate.
        </p>
        <div className="mt-6">
          <CustomButton name="Book Now" />
        </div>
      </div>
      <div className="image-content lg:w-1/2 mt-8 lg:mt-0">
        <img
          src="../../../public/images/bannerRoomImage.webp"
          alt="room booking"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Banner;
