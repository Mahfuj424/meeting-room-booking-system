import Banner from "../banner/Banner";
import BookingSteps from "../bookingSteps/BookingSteps";
import FeaturedRoom from "../featuredRoom/FeaturedRoom";
import Testimonial from "../reviewSection/ReviewSection";
import ServiceSection from "../serviceSection/ServiceSection";
import WhyChooseUs from "../whyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <div className=" dark:bg-darkBg bg-white">
      <Banner />
      <div className="py-20">
        <ServiceSection />
        <FeaturedRoom/>
        <WhyChooseUs />
        <BookingSteps />
        <Testimonial />
      </div>
    </div>
  );
};

export default Home;
