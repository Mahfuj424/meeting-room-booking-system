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

    // Allowed image types
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];

    // Debugging: log file types
    console.log(
      "Uploaded files:",
      imageFiles.map((file: File) => file.type)
    );

    // Validate image file types
    const invalidFiles = imageFiles.filter(
      (file: File) => !validImageTypes.includes(file?.type)
    );

    if (invalidFiles.length > 0) {
      toast.error(
        "Invalid image file type. Only JPEG, PNG, and WEBP are allowed."
      );
      console.log("Invalid file types:", invalidFiles);
      return;
    }

    // Check for file size (example: 10MB limit)
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB limit
    const oversizedFiles = imageFiles.filter(
      (file: File) => file.size > maxSizeInBytes
    );

    if (oversizedFiles.length > 0) {
      toast.error("Image size exceeds 10MB. Please upload smaller files.");
      return;
    }

    // Upload images and get URLs
    const imageUrls = await handleMultipleImageUploads(imageFiles);
    if (imageUrls.length === 0) {
      toast.error("Image upload failed. Please try again.");
      return;
    }

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
        `https://api.imgbb.com/1/upload?key=b07b62fb5b3f5203ec96c940be5f16ba`,
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
        toast.error(
          "Failed to upload image. Please check the file format or size."
        );
        return null;
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Image upload failed. Please try again.");
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
