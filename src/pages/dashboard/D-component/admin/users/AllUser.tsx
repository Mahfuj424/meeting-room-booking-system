/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUsersQuery } from "../../../../../redux/features/auth/authApi";
import UserList from "./UserList";
import SyncLoader from "react-spinners/SyncLoader";

const AllUser = () => {

const {data, isLoading}=useGetUsersQuery(undefined)
const userData = data?.data;
console.log(userData);

  return (
    <div className="overflow-x-auto mx-auto">
      <table className="min-w-full bg-white border-gray-200">
        <thead className="border-y-2">
          <tr>
            <th className="p-4 text-center font-bold text-gray-700">Name</th>
            <th className="p-4 text-center font-bold text-gray-700">Email</th>
            <th className="p-4 text-center font-bold text-gray-700">
              Phone Number
            </th>
            <th className="p-4 text-center font-bold text-gray-700">Role</th>
            <th className="p-4 text-center font-bold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div className=" flex justify-center mt-10">
              <SyncLoader color="#1586FD" />
            </div>
          ) : (
            userData?.map((user: any) => (
              <UserList user={user}></UserList>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;
