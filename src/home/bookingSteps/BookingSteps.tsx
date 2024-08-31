import SectionHeader from "../../shared/sectionHeader/SectionHeader";
import React from "react";

const steps = [
  {
    title: "Select a Room",
    description:
      "Choose your preferred room and browse amenities to suit your needs.",
    icon: "🏨",
  },
  {
    title: "Choose Date & Time",
    description:
      "Select your preferred date and time to check room availability and finalize your booking.",
    icon: "📅",
  },
  {
    title: "Confirm Booking",
    description:
      "Review your details and confirm your booking to receive instant confirmation.",
    icon: "✅",
  },
];

const BookingSteps: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-darkBg text-secondary dark:text-white">
      <SectionHeader
        title="Easy Booking Steps"
        description="Streamline your reservation process with these three simple steps to book your stay quickly and effortlessly."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white dark:bg-darkCard p-6 rounded-lg shadow-md border dark:border-none hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <div className="text-6xl text-primary dark:text-white mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSteps;
