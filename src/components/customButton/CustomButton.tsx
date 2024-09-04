

const CustomButton2 = ({ name }:{name:string}) => {
  return (
    <button className="relative bg-primary text-white py-2 px-4 rounded overflow-hidden border border-primary transition-all duration-300 ease-out group">
      <span className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
      <span className="relative text-xl group-hover:text-primary">{name}</span>
    </button>
  );
};

export default CustomButton2;
