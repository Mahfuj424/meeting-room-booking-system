import { useCreateRoomMutation } from "../../../../redux/features/room/roomApi";
import React, { useState } from "react";
import { FaCloudUploadAlt, FaPlusCircle, FaTimes } from "react-icons/fa";

const CreateRoom: React.FC = () => {
  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenityInput, setAmenityInput] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const handleAddAmenity = () => {
    if (amenityInput) {
      setAmenities([...amenities, amenityInput]);
      setAmenityInput("");
    }
  };

  const handleRemoveAmenity = (index: number) => {
    const newAmenities = [...amenities];
    newAmenities.splice(index, 1);
    setAmenities(newAmenities);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleRemoveImage = (index: number) => {
    const newImageFiles = [...imageFiles];
    const newImagePreviews = [...imagePreviews];

    newImageFiles.splice(index, 1);
    newImagePreviews.splice(index, 1);

    setImageFiles(newImageFiles);
    setImagePreviews(newImagePreviews);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    const imgbbAPIKey = "20d1c8d996641e7f8f7de1db621a33ec"; // Replace with your Imgbb API key

    // Append each image file to FormData
    imageFiles.forEach((file) => {
      formData.append("image", file);
    });

    try {
      // Upload each image and store the response URLs
      const uploadPromises = imageFiles.map(async (file) => {
        const imageFormData = new FormData();
        imageFormData.append("image", file);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
          {
            method: "POST",
            body: imageFormData,
          }
        );

        const data = await response.json();
        if (data.success) {
          return data.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      });

      // Resolve all promises
      const imageUrls = await Promise.all(uploadPromises);

      setImageUrl(imageUrls);
      // You can now do something with the image URLs, e.g., save them to your database
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const [postRoom, { isLoading }] = useCreateRoomMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadImage();
    const form = e.target;
    const name = form.name.value;
    const roomNo = form.roomNo.value;
    const floorNo = form.floorNo.value;
    const capacity = form.capacity.value;
    const pricePerSlot = form.pricePerSlot.value;
    const amenity = amenities;
    const images = imageUrl;
    const roomInfo = {
      name,
      roomNo,
      floorNo,
      capacity,
      pricePerSlot,
      amenities: amenity,
      images,
    };
    await postRoom(roomInfo)
    console.log(roomInfo);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-secondary text-center mb-10">
        Create Room
      </h1>
      <div className="md:flex justify-between">
        <div>
          <div className="md:grid grid-cols-2 gap-5">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative w-60">
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 md:w-1/2 w-full ">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full py-3 ps-3 border rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="roomNo"
                className="block text-sm font-medium text-gray-700"
              >
                Room No
              </label>
              <input
                type="number"
                name="roomNo"
                id="roomNo"
                className="mt-1 block w-full py-3 ps-3 border rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="floorNo"
                className="block text-sm font-medium text-gray-700"
              >
                Floor No
              </label>
              <input
                type="number"
                name="floorNo"
                id="floorNo"
                className="mt-1 block w-full py-3 ps-3 border rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-gray-700"
              >
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                id="capacity"
                className="mt-1 block w-full py-3 ps-3 border rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="pricePerSlot"
                className="block text-sm font-medium text-gray-700"
              >
                Price Per Slot
              </label>
              <input
                type="number"
                name="pricePerSlot"
                id="pricePerSlot"
                className="mt-1 block w-full py-3 ps-3 border rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Images
                <div className="flex mt-1 cursor-pointer items-center justify-between py-2 w-full ps-3 border rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary">
                  <FaCloudUploadAlt className="text-3xl text-primary" />
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="hidden"
                    multiple
                    onChange={handleImageChange}
                    required
                  />
                </div>
              </label>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="amenities"
                className="block text-sm font-medium text-gray-700"
              >
                Amenities
              </label>
              <div className="flex space-x-2 mt-1">
                <input
                  type="text"
                  name="amenities"
                  id="amenities"
                  value={amenityInput}
                  onChange={(e) => setAmenityInput(e.target.value)}
                  className="flex-1 py-3 border rounded-md ps-3 border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Add an amenity"
                />
                <button
                  type="button"
                  onClick={handleAddAmenity}
                  className="bg-primary text-white px-4 rounded-md shadow-md hover:bg-primary-dark transition duration-300"
                >
                  <FaPlusCircle className="text-2xl" />
                </button>
              </div>
              <ul className="mt-2 flex gap-3 items-center flex-wrap">
                {amenities.map((amenity, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center gap-10 bg-gray-100 py-2 px-3 rounded-md"
                  >
                    <span>{amenity}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAmenity(index)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="mt-4 bg-primary text-white py-3 w-full px-4 rounded shadow-md hover:bg-primary-dark transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
