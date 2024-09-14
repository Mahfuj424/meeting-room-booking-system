/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCopy } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useSignupMutation,
} from "../../redux/features/auth/authApi"; // Assuming you have signup mutation
import { verifyToken } from "../../utils/verifyToken"; // Assume this is a utility to verify JWT token
import { toast } from "sonner";
import { FaRegUserCircle } from "react-icons/fa";
import { setUser } from "../../redux/features/auth/authSlice";

type FormData = {
  image?: FileList;
  name?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
};

const AuthPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isLogin, setIsLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mutations for login and signup
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signup] = useSignupMutation();

  const handleToggle = () => setIsLogin(!isLogin);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const uploadImageToImgBB = async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=20d1c8d996641e7f8f7de1db621a33ec`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      return data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      return null;
    }
  };

  const location = localStorage.getItem("location");

  const onSubmit = async (data: Partial<FormData>) => {
    const toastId = toast.loading(isLogin ? "Logging in..." : "Signing up...");
    try {
      if (isLogin) {
        const userInfo = { email: data.email, password: data.password };
        console.log("Login User Info =>", userInfo); // Log userInfo for login
        const res = await login(userInfo).unwrap();
        toast.success("User logged in successfully", { id: toastId });
        const user = verifyToken(res.token);
        dispatch(setUser({ user, token: res.token }));
        navigate(location ? location : "/");
      } else {
        let imageUrl = "";
        if (data.image?.[0]) {
          imageUrl = await uploadImageToImgBB(data.image[0]);
        }

        const userData = {
          name: data.name,
          email: data.email!,
          password: data.password!,
          address: data.address,
          phone: data.phoneNumber,
          role: "user",
          image: imageUrl,
        };

        console.log("User Data =>", userData);
        const res = await signup(userData).unwrap();
        console.log("res data", res);
        toast.success("User signed up successfully", { id: toastId });
        setIsLogin(true);
        toast.success("Please Login", { id: toastId });
        navigate("/auth");
      }
    } catch (error:any) {
      console.error("Error during signup/login:", error);
      toast.error(error?.data?.message, { id: toastId });
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-black dark:bg-darkBg dark:text-white">
      <div className="bg-white border dark:border-none shadow-xl dark:bg-darkCard p-8 rounded-lg w-[450px]">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-300 dark:bg-darkBg rounded-full flex items-center justify-center overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="User"
                className="object-cover w-full h-full"
              />
            ) : (
              <FaRegUserCircle className="text-4xl" />
            )}
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold mb-6">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <>
              <input
                type="file"
                {...register("image")}
                className="mb-4 w-full border border-gray-300 dark:border-gray-600 p-2 rounded file:bg-white dark:file:bg-darkBg file:text-white file:px-4 file:py-2 text-center file:rounded file:border-none"
                accept="image/*"
                onChange={handleImageChange}
              />
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                className="mb-4 w-full border outline-none dark:bg-gray-700 focus:border-none border-gray-300 focus:ring-2 focus:ring-primary dark:border-gray-600 p-2 rounded"
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className={`mb-4 w-full border outline-none dark:bg-gray-700 focus:ring-2 focus:ring-primary ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } p-2 rounded`}
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className={`mb-4 w-full border outline-none dark:bg-gray-700 focus:ring-2 focus:ring-primary ${
              errors.password
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } p-2 rounded`}
          />
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Phone Number"
                {...register("phoneNumber")}
                className="mb-4 w-full border outline-none dark:bg-gray-700 focus:ring-2 focus:ring-primary border-gray-300 dark:border-gray-600 p-2 rounded"
              />
              <input
                type="text"
                placeholder="Address"
                {...register("address")}
                className="mb-4 w-full border outline-none dark:bg-gray-700 focus:ring-2 focus:ring-primary border-gray-300 dark:border-gray-600 p-2 rounded"
              />
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500  text-white py-2 rounded mb-4"
            disabled={isLoginLoading || false}
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <a href="#" className="text-blue-500 dark:text-blue-400 text-sm">
              Forgot Password?
            </a>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleToggle}
            className="text-blue-500 dark:text-blue-400 text-sm underline"
          >
            {isLogin
              ? "Not a Member? Create an Account"
              : "Already have an account? Sign In"}
          </button>
        </div>
        {isLogin && (
          <button
            onClick={() => setShowModal(true)}
            className="w-full mt-4 border border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 py-2 rounded"
          >
            Show Credentials
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-darkCard p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Credentials</h3>
            <div className="mb-4">
              <label className="block font-medium mb-1">User</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value="mahfujahmad400@gmail.com"
                  readOnly
                  className="border border-gray-300 dark:border-gray-600 dark:bg-darkBg dark:text-white p-2 rounded w-full mr-2"
                />
                <AiOutlineCopy
                  className="cursor-pointer -ms-8"
                  onClick={() => handleCopy("mahfujahmad400@gmail.com")}
                />
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  value="123456"
                  readOnly
                  className="border border-gray-300 dark:border-gray-600 dark:bg-darkBg dark:text-white p-2 rounded w-full mr-2"
                />
                <AiOutlineCopy
                  className="cursor-pointer -ms-8"
                  onClick={() => handleCopy("123456")}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block  font-medium mb-1">Admin</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value="mahfujahmad424@gmail.com"
                  readOnly
                  className="border border-gray-300 dark:border-gray-600 dark:bg-darkBg dark:text-white p-2 rounded w-full mr-2"
                />
                <AiOutlineCopy
                  className="cursor-pointer -ms-8"
                  onClick={() => handleCopy("mahfujahmad424@gmail.com")}
                />
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  value="123456"
                  readOnly
                  className="border border-gray-300 dark:border-gray-600 dark:bg-darkBg dark:text-white p-2 rounded w-full mr-2"
                />
                <AiOutlineCopy
                  className="cursor-pointer -ms-8"
                  onClick={() => handleCopy("123456")}
                />
              </div>
            </div>
            <div className="text-right">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-500  text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
