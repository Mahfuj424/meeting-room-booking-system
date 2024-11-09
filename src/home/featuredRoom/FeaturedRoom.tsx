import { useGetAllRoomsQuery } from "../../redux/features/room/roomApi";
import CustomCard from "../../components/customCard/CustomCard";
import SectionHeader from "../../shared/sectionHeader/SectionHeader";
import { Link } from "react-router-dom";
import CustomButton2 from "../../components/customButton/CustomButton";

type TRoom = {
  _id: string;
  roomNo: number;
  images: string[];
  name: string;
  capacity: number;
  pricePerSlot: number;
};

const FeaturedRoom = () => {
  const { data } = useGetAllRoomsQuery({ sortby: "Default" }); // Fetching room data
  const rooms = data?.data;
  console.log(rooms);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      <SectionHeader
        title="Our Luxury Rooms"
        description="Experience unmatched comfort and elegance in our Luxury Rooms, designed for those who appreciate the finer things in life."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {rooms?.slice(0, 4)?.map((room: TRoom) => (
          <CustomCard
            id={room?._id}
            key={room.roomNo} // Assuming roomNo as the unique key
            images={room.images} // Using dynamic room images array
            roomName={room.name} // Dynamic room name
            capacity={`Capacity: ${room.capacity} People`} // Dynamic capacity
            price={`$${room.pricePerSlot} / per slot`}
          />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link to={"/meeting-rooms"}>
          <CustomButton2 name="See More..." />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedRoom;
