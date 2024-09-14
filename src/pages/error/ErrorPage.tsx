import { Link } from "react-router-dom";
import CustomButton2 from "../../components/customButton/CustomButton";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <img src="https://i.ibb.co.com/Qf1w2mj/2582995.webp" alt="error" />
        <Link className="flex justify-center" to={"/"}>
          <CustomButton2 name="Back to Home" />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
