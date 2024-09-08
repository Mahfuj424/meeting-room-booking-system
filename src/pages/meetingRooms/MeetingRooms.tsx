import React, { useState } from "react";
import CustomButton2 from "../../components/customButton/CustomButton";
import { Slider } from "@mui/material";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useGetAllRoomsQuery } from "../../redux/features/room/roomApi";
import CustomCard from "../../components/customCard/CustomCard";

const FilterPanel: React.FC = () => {
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isCapacityOpen, setIsCapacityOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 90]);
  const [capacityRange, setCapacityRange] = useState([0, 100]);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Fetch the room data from the server
  const { data: rooms, isLoading } = useGetAllRoomsQuery({
    search: searchText,
    capacity: capacityRange[1],
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    sortBy: sortBy,
  });

  // Toggle dropdowns for capacity and price
  const togglePrice = () => setIsPriceOpen(!isPriceOpen);
  const toggleCapacity = () => setIsCapacityOpen(!isCapacityOpen);

  // Clear all filters (reset sliders)
  const clearFilters = () => {
    setPriceRange([0, 90]);
    setCapacityRange([0, 100]);
    setSearchText("");
    setSortBy("featured");
  };

  // Handle slider changes for price
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  // Handle slider changes for capacity
  const handleCapacityChange = (event: Event, newValue: number | number[]) => {
    setCapacityRange(newValue as number[]);
  };

  return (
    <div className="flex max-w-7xl mx-auto pt-28">
      {/* Left Sidebar: Filters */}
      <div className="w-1/4 p-4">
      <h1 className="text-3xl text-secondary my-10">Filter</h1>
        <div className="space-y-4">
          {/* Capacity Dropdown */}
          <div>
            <button
              onClick={toggleCapacity}
              className="flex justify-between w-full text-left"
            >
              <span>Capacity</span>
              <RiArrowDropDownLine
                className={`w-5 h-5 ${
                  isCapacityOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
            {isCapacityOpen && (
              <Slider
                value={capacityRange}
                min={0}
                max={100}
                onChange={handleCapacityChange}
                valueLabelDisplay="auto"
                aria-labelledby="capacity-slider"
              />
            )}
          </div>

          {/* Price Dropdown */}
          <div>
            <button
              onClick={togglePrice}
              className="flex justify-between w-full text-left"
            >
              <span>Price</span>
              <RiArrowDropDownLine
                className={`w-5 h-5 ${
                  isPriceOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
            {isPriceOpen && (
              <div className="mt-2">
                <Slider
                  value={priceRange}
                  min={0}
                  max={90}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="price-slider"
                />
                <div className="flex justify-between">
                  <span>{priceRange[0]}</span>
                  <span>{priceRange[1]}</span>
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters Button */}
          <div onClick={clearFilters}>
            <CustomButton2 name="Clear Filter" />
          </div>
        </div>
      </div>

      {/* Right Content: Products, Sort By, and Search */}
      <div className="w-3/4 p-4">
        <div className="flex justify-between mb-4 items-center">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border rounded-lg w-3/4 py-2 border-primary px-4 focus:ring-red-500 focus:border-red-500"
          />

          {/* Sort By Dropdown */}
          <div>
            <label className=" text-secondary">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Room Listings */}
        {isLoading ? (
          <p>Loading rooms...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {rooms?.data.map((room) => (
              <CustomCard
                id={room?._id}
                key={room.roomNo} // Assuming roomNo as the unique key
                images={room.images} // Using dynamic room images array
                roomName={room.name} // Dynamic room name
                capacity={`Capacity: ${room.capacity} People`} // Dynamic capacity
                price={`$${room.pricePerSlot} / per slot`} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
