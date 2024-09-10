import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
import { selectSlots } from "../../redux/features/slotSlice/slotSlice";

const BookingSummary = ({ slot }) => {
  const user = useAppSelector(selectCurrentUser);
  const slots = useSelector(selectSlots);

  // Extract the price per slot and multiply by the number of slots to calculate the total price
  const totalPrice = slots?.reduce((total, slotItem) => {
    return total + (slotItem?.room?.pricePerSlot || 0);
  }, 0);

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto">
        <div className="md:w-2/3 shadow-md border flex justify-between mx-auto px-8 py-5">
          <div className="space-y-3">
            <h1>User Information</h1>
            <div className="ms-5">
              <img
                src={user?.image}
                className="w-20 h-20 mt-3 rounded-full"
                alt="User profile"
              />
            </div>
            <h1>
              <span className="text-lg">Name:</span> {user?.name}
            </h1>
            <h1>
              <span className="text-lg">Email:</span> {user?.email}
            </h1>
            <h1>
              <span className="text-lg">Phone:</span> {user?.phone}
            </h1>
            <h1>
              <span className="text-lg">Address:</span> {user?.address}
            </h1>
          </div>

          <div className="space-y-3">
            <h1>
              <span className="text-lg">Room Name:</span> {slot?.room?.name}
            </h1>
            <h1>
              <span className="text-lg">Date:</span> {slot?.date}
            </h1>
            <h1>
              <span className="text-lg">Time:</span> {slot?.time}
            </h1>
            <h1 className="font-semibold text-secondary">
              <span className="text-lg">Total Cost:</span> ${totalPrice}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
