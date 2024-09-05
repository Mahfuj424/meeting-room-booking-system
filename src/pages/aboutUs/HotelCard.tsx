import React from "react";
import { FiPhone } from "react-icons/fi"; // Import an icon from react-icons

interface Props {}

const HotelCard: React.FC<Props> = () => {
  return (
    <div className="bg-[#f7f5f7] pb-8 dark:bg-darkBg">
      <div className="flex mt-20 max-w-7xl mx-auto flex-col lg:flex-row dark:bg-darkBg p-6 rounded-lg ">
        <div className="relative">
          <div className="lg:w-[700px] flex justify-center">
            <img
              src="https://point.moxcreative.com/ophelia/wp-content/uploads/sites/31/2022/06/cozy-hotel-room-interior.jpg" // Replace with your image path or use a public URL
              alt="Hotel Room"
              className="rounded-lg"
            />
          </div>
          <div className="absolute -bottom-5 -right-8 border-8 rounded-md border-white">
            <img
              src="https://point.moxcreative.com/ophelia/wp-content/uploads/sites/31/2022/06/cozy-hotel-room-interior.jpg" // Replace with your image path or use a public URL
              alt="Hotel Room"
              className="w-40 h-28 rounded-md"
            />
          </div>
        </div>

        <div className="lg:w-1/2 lg:pl-8 mt-6 lg:mt-0 text-darkBg dark:text-white">
          <h2 className="text-3xl font-semibold mb-4">
            Enjoy unforgettable experiences in our hotels
          </h2>
          <p className="text-secondary mb-4">
            Risus consequat donec vel mi diam lobortis maximus laoreet nisi.
            Fames torquent neque duis pharetra urna per facilisis nunc cras
            blandit. Fermentum vitae mus neque metus quisque conubia elementum
            habitant nisi at.
          </p>
          <p className="text-secondary">
            Sapien himenaeos sollicitudin habitant hac. Lacinia ridiculus
            volutpat nisl nascetur curae ad taciti per sapien dolor. Eu posuere
            congue himenaeos luctus sagittis turpis senectus purus.
          </p>
          <div className="mt-6 flex items-center">
            <FiPhone className="text-primary mr-2" size={24} />
            <div>
              <h3 className="text-lg font-semibold">Reservation</h3>
              <p className="text-secondary">+6221-2002-2012</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
