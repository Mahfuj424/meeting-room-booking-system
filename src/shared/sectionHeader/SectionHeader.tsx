type TProps = {
  title: string;
  description: string;
};

const SectionHeader = ({ title, description }: TProps) => {
  return (
    <div className="flex justify-center">
      <div className="md:w-1/2 text-center my-10 rounded-full">
        <h1 className="md:text-3xl font-semibold dark:text-white text-secondary ">
          {title}
        </h1>
        <p className="text-secondary md:text-lg text-sm mt-3 dark:text-white">{description}</p>
      </div>
    </div>
  );
};

export default SectionHeader;
