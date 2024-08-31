import React from "react";

interface ServiceItemProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  title,
  description,
  imageUrl,
}) => (
  <div className="flex flex-col items-center group p-6 border dark:border-none dark:bg-darkCard rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <img
      src={imageUrl}
      alt={title}
      className="w-1/2 h-1/2 mb-4 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-150"
    />
    <h3 className=" font-semibold text-secondary dark:text-white">
      {title}
    </h3>
    <p className="text-secondary dark:text-gray-400">{description}</p>
  </div>
);

const ServiceSection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-darkBg pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ServiceItem
          title="Real-Time Availability"
          description="Check availability in real-time."
          imageUrl="../../../public/images/service1.png"
        />
        <ServiceItem
          title="Instant Booking Confirmation"
          description="Receive confirmation instantly."
          imageUrl="../../../public/images/service2.png"
        />
        <ServiceItem
          title="Flexible Scheduling"
          description="Schedule your services flexibly."
          imageUrl="../../../public/images/service3.png"
        />
        <ServiceItem
          title="24/7 Support"
          description="We are here for you, anytime."
          imageUrl="../../../public/images/service4.png"
        />
      </div>
    </div>
  );
};

export default ServiceSection;
