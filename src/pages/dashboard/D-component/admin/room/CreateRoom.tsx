import React from "react";
import { useCreateRoomMutation } from "../../../../../redux/features/room/roomApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import RoomForm from "./RoomForm";

const CreateRoom: React.FC = () => {
  const [postRoom, { isLoading }] = useCreateRoomMutation();
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: any) => {
    const { imageFiles, ...roomData } = formData;

    // Upload images and get URLs
    const imageUrls = await uploadImages(imageFiles);
    if (imageUrls.length === 0) return;

    const roomInfo = {
      ...roomData,
      images: imageUrls,
    };

    try {
      await postRoom(roomInfo).unwrap();
      toast.success("Room created successfully!");
      navigate("/dashboard/rooms-list");
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Failed to create room. Please try again.");
    }
  };

  const uploadImages = async (imageFiles: File[]) => {
    const imgbbAPIKey = "20d1c8d996641e7f8f7de1db621a33ec"; // Replace with your Imgbb API key
    const urls: string[] = [];

    for (const imageFile of imageFiles) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        urls.push(result.data.url);
      } else {
        toast.error("Image upload failed. Please try again.");
        return [];
      }
    }

    return urls;
  };

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Room</h1>
      <RoomForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
};

export default CreateRoom;
