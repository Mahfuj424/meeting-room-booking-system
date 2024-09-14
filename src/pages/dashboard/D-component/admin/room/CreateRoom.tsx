/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import { useCreateRoomMutation } from "../../../../../redux/features/room/roomApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import RoomForm from "./RoomForm";

// Function to upload an image to ImgBB
const CreateRoom: React.FC = () => {
  const [postRoom, { isLoading }] = useCreateRoomMutation();
  const navigate = useNavigate();

  const uploadImage = async (images: File[] | any) => {
    const apiKey = "20d1c8d996641e7f8f7de1db621a33ec";
    const formData = new FormData();

    // Upload images one by one
    const uploadPromises = images.map(async (image: File) => {
      formData.append("image", image); 
      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(`Image upload failed: ${data.error.message}`);
        }

        return data.data.display_url;
      } catch (error) {
        console.error("Image upload error:", error);
        throw error; 
      }
    });

    return Promise.all(uploadPromises); 
  };

  const handleFormSubmit = async (formData: any) => {
    let { images, ...roomData } = formData;

    // Ensure images is an array
    images = Array.from(images);

    try {
      // Upload each image and get the URLs
      const uploadedImageUrls = await uploadImage(images);

      const roomInfo = {
        ...roomData,
        images: uploadedImageUrls, // Store the uploaded image URLs
      };
      console.log(roomInfo);
      await postRoom(roomInfo).unwrap(); 
      toast.success("Room created successfully!");
      navigate("/dashboard/rooms-list"); 
    } catch (error:any) {
      console.error("Error creating room:", error);
      toast.error(error?.data?.errorMessages[0]?.message);
    }
  };

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Room</h1>
      <RoomForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
};

export default CreateRoom;
