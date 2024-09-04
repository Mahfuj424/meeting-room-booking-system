import { useGetAllRoomsQuery } from "../../redux/features/room/roomApi";
import CustomCard from "../../components/customCard/CustomCard";
import SectionHeader from "../../shared/sectionHeader/SectionHeader";

const FeaturedRoom = () => {
  const handleSeeDetails = () => {};

  const { data } = useGetAllRoomsQuery(undefined);
  const room = data?.data

  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Our Luxury Room"
        description="Experience unmatched comfort and elegance in our Luxury Room, designed for those who appreciate the finer things in life."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((room) => (
          <CustomCard
            key={room}
            imageUrl="https://i.ibb.co/rG2VDqY/Luxury-hotels-the-art-of-hospitality-superior-comfort-and-service-royal-suite.webp"
            roomName="Deluxe Contrast Room"
            capacity="4 Beds, 4 Baths, 4 Parking"
            price="$438 / per slot"
            onSeeDetails={handleSeeDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedRoom;
