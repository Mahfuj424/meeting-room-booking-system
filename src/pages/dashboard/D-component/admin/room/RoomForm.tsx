/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FaCloudUploadAlt, FaPlusCircle } from "react-icons/fa";
import { BiLoaderCircle } from 'react-icons/bi';

type RoomFormProps = {
  defaultValues?: {
    name: string;
    roomNo: number;
    floorNo: number;
    capacity: number;
    pricePerSlot: number;
    amenities: string[];
    images: string[];
  };
  onSubmit: (roomData: any) => void;
};

const RoomForm: React.FC<RoomFormProps> = ({ defaultValues, onSubmit }) => {
  const [amenities, setAmenities] = useState<string[]>(
    defaultValues?.amenities || []
  );
  const [amenityInput, setAmenityInput] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    defaultValues?.images || []
  );
  const [loading, setLoading] = useState(false);

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
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleRemoveImage = (index: number) => {
    const newImagePreviews = [...imagePreviews];
    newImagePreviews.splice(index, 1);
    setImagePreviews(newImagePreviews);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    const form = e.target as HTMLFormElement;
    const name = form.name.valueOf;
    const roomNo = parseInt(form.roomNo.value, 10);
    const floorNo = parseInt(form.floorNo.value, 10);
    const capacity = parseInt(form.capacity.value, 10);
    const pricePerSlot = parseFloat(form.pricePerSlot.value);

    const roomData = {
      name,
      roomNo,
      floorNo,
      capacity,
      pricePerSlot,
      amenities,
      images: imagePreviews,
    };

    try {
      await onSubmit(roomData);
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column - Image previews */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images Preview
          </label>
          <div className="grid grid-cols-2 gap-2">
            {imagePreviews.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-36 rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 text-red-500 bg-white rounded-full px-2 text-xl hover:text-red-700"
                  onClick={() => handleRemoveImage(index)}
                >
                  &times;
                </button>
              </div>
            ))}
            {/* For uploading new images */}
            <div className="relative flex justify-center items-center h-36 border-dashed border-2 border-gray-300 rounded-md">
              <label
                htmlFor="image"
                className="absolute flex items-center justify-center h-full w-full cursor-pointer"
              >
                <FaCloudUploadAlt className="text-3xl text-gray-500" />
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
              <span className="text-gray-500">Upload Images</span>
            </div>
          </div>
        </div>

        {/* Right column - Form inputs */}
        <div className="md:col-span-1">
          <div>
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
              defaultValue={defaultValues?.name}
              className="mt-1 block w-full py-3 px-3 border rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
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
              defaultValue={defaultValues?.roomNo}
              className="mt-1 block w-full py-3 px-3 border rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
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
              defaultValue={defaultValues?.floorNo}
              className="mt-1 block w-full py-3 px-3 border rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
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
              defaultValue={defaultValues?.capacity}
              className="mt-1 block w-full py-3 px-3 border rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div>
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
              defaultValue={defaultValues?.pricePerSlot}
              className="mt-1 block w-full py-3 px-3 border rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              required
            />
          </div>

          {/* Amenities */}
          <div>
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
                className="flex-1 py-3 border rounded-md px-3 border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
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
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className={`flex items-center px-6 py-3 rounded-md w-full justify-center ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-primary text-white"
          }`}
          disabled={loading}
        >
          {loading ? (
            <BiLoaderCircle className="mx-auto animate-spin text-white" />
          ) : (
            "Save & Continue"
          )}
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
