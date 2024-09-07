/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import React from "react";
import { useCreateRoomMutation } from "../../../../../redux/features/room/roomApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import RoomForm from "./RoomForm";

const CreateRoom: React.FC = () => {
  const [postRoom, { isLoading }] = useCreateRoomMutation();
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: any) => {
    let { imageFiles, ...roomData } = formData;

    // Ensure imageFiles is an array
    imageFiles = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

    // Upload images and get URLs
    const imageUrls = await handleMultipleImageUploads(imageFiles);
    if (imageUrls.length === 0) return;

    const roomInfo = {
      ...roomData,
      images: imageUrls, // Store uploaded image URLs
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

  // Function to handle multiple image uploads
  const handleMultipleImageUploads = async (imageFiles: File[]) => {
    const imageUrls: string[] = [];

    for (const imageFile of imageFiles) {
      const imageUrl = await handleImageUpload(imageFile);
      if (imageUrl) {
        imageUrls.push(imageUrl); // Collect image URLs
      }
    }

    return imageUrls;
  };

  // Function to upload a single image
  const handleImageUpload = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile); // Append image to form data

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=20d1c8d996641e7f8f7de1db621a33ec`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        return data.data.url; // Return the image URL
      } else {
        console.error("Error uploading image:", data);
        toast.error("Failed to upload image.");
        return null;
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Image upload failed.");
      return null;
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
