/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdateUserMutation } from "../../../../../redux/features/auth/authApi";
// import { useState } from "react";
import { toast } from "sonner";

// Define the user type (optional but recommended)
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const UserList = ({ user }: { user: User }) => {
  const [updateUserRole] = useUpdateUserMutation();

  const handleUserRoleUpdate = async (role: string) => {
    console.log(role, user?._id);
    try {
      await updateUserRole({ id: user?._id, role }).unwrap();
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to update user role";
      // Displaying the error using toast
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <tr className="bg-white border-b text-center">
        {/* Table Data */}
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {user?.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user?.email}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {user?.phone}
        </td>
        <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
          {user?.role}
        </td>
        <td>
          {user?.role === "user" ? (
            <button
              onClick={() => handleUserRoleUpdate("admin")}
              className="px-3 py-1 bg-primary rounded-md text-white"
            >
              Make Admin
            </button>
          ) : (
            <button
              onClick={() => handleUserRoleUpdate("user")}
              className="px-3 py-1 bg-primary rounded-md text-white"
            >
              Make User
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default UserList;
