import { useGetAllRoomsQuery } from "../../redux/features/room/roomApi";
import CustomCard from "../../components/customCard/CustomCard";
import SectionHeader from "../../shared/sectionHeader/SectionHeader";

const FeaturedRoom = () => {
  const handleSeeDetails = () => {};

  const { data } = useGetAllRoomsQuery(undefined); // Fetching room data
  const rooms = data?.data;

  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="Our Luxury Rooms"
        description="Experience unmatched comfort and elegance in our Luxury Rooms, designed for those who appreciate the finer things in life."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {rooms?.map((room) =>
          <CustomCard
            key={room.roomNo} // Assuming roomNo as the unique key
            images={room.images} // Using dynamic room images array
            roomName={room.name} // Dynamic room name
            capacity={`Capacity: ${room.capacity} People`} // Dynamic capacity
            price={`$${room.pricePerSlot} / per slot`} // Dynamic price per slot
            onSeeDetails={handleSeeDetails}
          />
        )}
      </div>
    </div>
  );
};

export default FeaturedRoom;
