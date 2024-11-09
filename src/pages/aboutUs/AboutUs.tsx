import React from "react";
import HotelCard from "./HotelCard";

type TeamMember = {
  name: string;
  bio: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "John Doe",
    bio: "John is a hospitality expert with over 15 years of experience, specializing in luxury hotel management.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvmFh3UxOkWLzHVS8_c4MDbDNsZhPvvxcXg&usqp=CAU",
  },
  {
    name: "Jane Smith",
    bio: "Jane is a travel consultant who ensures our guests find the perfect stay tailored to their needs.",
    image:
      "https://media.istockphoto.com/id/1270067126/photo/smiling-indian-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=ovIQ5GPurLd3mOUj82jB9v-bjGZ8updgy1ACaHMeEC0=",
  },
  {
    name: "Sam Brown",
    bio: "Sam is a digital marketing specialist with a focus on making our platform user-friendly and accessible.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LmG47_W3RM0QBVGI23-vodL_oOOJxLIBrg&usqp=CAU",
  },
  // Add more team members as needed
];

const AboutUs: React.FC = () => {
  return (
    <div className="py-20 dark:bg-darkBg">
      <HotelCard />
      <div className="max-w-7xl mx-auto px-4 md:px-0 py-16">
        {/* Our Mission */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-secondary dark:text-white mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Our mission is to provide travelers with unparalleled access to the
            best accommodations across the globe. We believe in making travel
            seamless and enjoyable by offering a platform that combines
            convenience, affordability, and an outstanding guest experience.
            Whether it's a luxury hotel or a cozy getaway, we strive to cater to
            every traveler’s need, ensuring they feel at home wherever they go.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            By working closely with our partners, we offer a wide variety of
            stays that provide comfort, security, and unforgettable experiences.
            We are committed to continuous innovation, always seeking to improve
            our services and exceed the expectations of our customers.
          </p>
        </section>

        {/* Meet the Team */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-secondary dark:text-gray-300 mb-6 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold dark:text-gray-300 text-gray-900">
                  {member.name}
                </h3>
                <p className="text-center dark:text-gray-300 text-gray-600">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section>
          <h2 className="text-3xl font-bold text-secondary dark:text-gray-300 mb-6 text-center">
            Our Story
          </h2>
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Our company started with a simple idea – to make finding the
              perfect room easier for travelers. In the early days, we were a
              small startup focused on providing rooms in a few cities. Today,
              we’ve expanded to offer thousands of accommodations across the
              world. From luxurious hotels to unique homestays, we offer
              something for every traveler.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <img
              src="https://i.ibb.co.com/1zgrfL9/interior-design-inspiration-artistic-contemporary-style-dining-room-loveliness-1024x574.jpg"
              alt="Modern Meeting Room"
              className="rounded-lg w-full"
            />
            <img
              src="https://i.ibb.co.com/8svQJ6S/designing-meeting-rooms-for-the-contemporary-office-partitions-seating-tables-and-lighting-11.jpg"
              alt="Spacious Meeting Room"
              className="rounded-lg w-full"
            />
            <img
              src="https://i.ibb.co.com/MB82Vmp/images-2.jpg"
              alt="Minimalist Meeting Room"
              className="rounded-lg w-full"
            />
            <img
              src="https://i.ibb.co.com/0QhL06s/images-1.jpg"
              alt="Creative Meeting Room"
              className="rounded-lg w-full"
            />
            <img
              src="https://i.ibb.co.com/MNZW5yL/images.jpg"
              alt="Boardroom Style Meeting"
              className="rounded-lg w-full"
            />
            <img
              src="https://i.ibb.co.com/kQ9nVvm/i-Stock-921054466-1024x576.jpg"
              alt="Open Space Meeting Room"
              className="rounded-lg w-full"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
