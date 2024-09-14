/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import CustomButton2 from "../../components/customButton/CustomButton";
import { useGetAllRoomsQuery } from "../../redux/features/room/roomApi";
import CustomCard from "../../components/customCard/CustomCard";
import Slider from "@mui/material/Slider"; // Assuming you use Material UI for sliders
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import PulseLoader from "react-spinners/PulseLoader";

const FilterPanel: React.FC = () => {
  const [priceRange, setPriceRange] = useState([0, 90]);
  const [actualPrice, setActualPrice] = useState([0, 200]); // Actual price range
  const [maxPrice, setMaxPrice] = useState(200); // Max price
  const [capacityRange, setCapacityRange] = useState([0, 100]); // Default range
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("Default"); // Sort by state
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false); // Toggle sort dropdown
  const [isCapacityOpen, setIsCapacityOpen] = useState(true);

  // Fetch room data
  const { data, isLoading } = useGetAllRoomsQuery({
    search: searchText,
    capacity: capacityRange[0],
    minPrice: actualPrice[0],
    maxPrice: actualPrice[1],
    sortBy: sortBy, // Pass the sort by value
  });
  const rooms = data?.data;
  console.log(rooms);

  // Clear all filters (reset sliders)
  const clearFilters = () => {
    setPriceRange([0, 90]);
    setActualPrice([0, 200]); // Reset actual price range
    setCapacityRange([0, 100]); // Reset capacity range
    setSearchText("");
    setSortBy("Default"); // Reset sorting
  };

  useEffect(() => {
    // Assume maxPrice is fetched from data dynamically, set the maxPrice
    const fetchedMaxPrice = 200; // Example maximum price
    setMaxPrice(fetchedMaxPrice);
    setActualPrice([0, fetchedMaxPrice]); // Set actual price range
  }, []);

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    // newValue corresponds to a number between 0 and 10 (the slider range)
    const minPrice = Math.floor((newValue as number[])[0] * (maxPrice / 10));
    const maxPriceValue = Math.floor(
      (newValue as number[])[1] * (maxPrice / 10)
    );
    setPriceRange(newValue as number[]);
    setActualPrice([minPrice, maxPriceValue]);
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.split("-").map(Number); // Convert string to array of numbers
    setCapacityRange(value);
  };

  // Handle sort by selection
  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setIsSortDropdownOpen(false); // Close dropdown after selection
  };

  const handleSearchRoom = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const searchText = form.search.value;
    setSearchText(searchText)
    // Perform search or refetch data here
  };

  return (
    <div className="pt-28 bg-white dark:bg-darkBg">
      <div className="md:flex max-w-7xl mx-auto">
        {/* Left Sidebar: Filters */}
        <div className="md:w-1/4 w-full p-4 dark:text-white">
          <h1 className="text-3xl flex items-center gap-4 text-secondary mb-6 dark:text-white">
            Filter <CiFilter className="text-primary" />
          </h1>
          <div className="space-y-4">
            {/* Capacity Filter */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsCapacityOpen(!isCapacityOpen)}
              >
                <h1 className="mb-2 text-lg ">Room Capacity</h1>
                <RiArrowDropDownLine className="text-3xl" />
              </div>
              {isCapacityOpen && (
                <div className="w-[95%] mx-auto space-y-3">
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="capacity"
                        value="1-10"
                        checked={
                          capacityRange[0] === 1 && capacityRange[1] === 10
                        }
                        onChange={handleCapacityChange}
                      />
                      <span className="ms-2">Capacity 1-10 people</span>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="capacity"
                        value="10-20"
                        checked={
                          capacityRange[0] === 10 && capacityRange[1] === 20
                        }
                        onChange={handleCapacityChange}
                      />
                      <span className="ms-2">Capacity 1-20 people</span>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="capacity"
                        value="20-30"
                        checked={
                          capacityRange[0] === 20 && capacityRange[1] === 30
                        }
                        onChange={handleCapacityChange}
                      />
                      <span className="ms-2">Capacity 1-30 people</span>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="capacity"
                        value="30-40"
                        checked={
                          capacityRange[0] === 30 && capacityRange[1] === 40
                        }
                        onChange={handleCapacityChange}
                      />
                      <span className="ms-2">Capacity 1-40 people</span>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="capacity"
                        value="40-50"
                        checked={
                          capacityRange[0] === 40 && capacityRange[1] === 50
                        }
                        onChange={handleCapacityChange}
                      />
                      <span className="ms-2">Capacity 1-50 people</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className="border-t-2 pt-5">
              <h3>Price</h3>
              <div className="w-[95%] mx-auto">
                <Slider
                  value={priceRange}
                  min={0}
                  max={10}
                  step={1} // Steps of 1, so you get 10 divisions
                  onChange={handlePriceChange}
                  valueLabelDisplay="off" // Hide default labels
                />
                <div className="flex justify-between">
                  {/* Labels below slider corresponding to divisions */}
                  {[...Array(11).keys()].map((i) => (
                    <span key={i}>{i}</span>
                  ))}
                </div>
                <div className="flex justify-between mt-3">
                  <span>{actualPrice[0]}</span>
                  <span>{actualPrice[1]}</span>
                </div>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div onClick={clearFilters}>
              <CustomButton2 name="Clear Filter" />
            </div>
          </div>
        </div>

        {/* Right Content: Products, Sort By, and Search */}
        <div className="md:w-3/4 w-full p-4">
          <div className="md:flex gap-5 md:space-y-0 space-y-3 justify-between mb-4 items-center">
            <div className="relative w-full md:w-3/4">
              <form onSubmit={handleSearchRoom}>
                <input
                  type="text"
                  name="search"
                  placeholder="Search rooms..."
                  className="border rounded-lg w-full py-2 outline-none dark:text-white dark:bg-gray-800  border-primary dark:border-secondary px-4 pr-16 focus:ring-blue-600 focus:border-blue-600"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-primary text-white rounded-md"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Sort By Dropdown */}
            <div className="relative">
              <div
                className="cursor-pointer dark:text-white"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              >
                <label className="mr-2 cursor-pointer">Sort by:</label>
                <span className="font-bold">{sortBy}</span>{" "}
              </div>
              <div className="flex relative">
                {isSortDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-darkBg shadow-lg z-10">
                    <div
                      className="block px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSortByChange("Default")}
                    >
                      Default
                    </div>
                    <div
                      className="block px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSortByChange("Price - Low to High")}
                    >
                      Price: Low to High
                    </div>
                    <div
                      className="block px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSortByChange("Price - High to Low")}
                    >
                      Price: High to Low
                    </div>
                    <div
                      className="block px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSortByChange("new to old")}
                    >
                      Date, New to Old
                    </div>
                    <div
                      className="block px-4 py-2 text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSortByChange("old to new")}
                    >
                      Date, Old to New
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Cards */}
          {isLoading ? (
            <div className="flex items-center justify-center h-80">
              <PulseLoader color="#1586FD" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rooms?.map((room:any) => (
                <CustomCard
                  key={room._id}
                  id={room._id}
                  images={room.images}
                  roomName={room.name}
                  capacity={`Capacity: ${room.capacity} People`} // Dynamic capacity
                  price={`$${room.pricePerSlot} / per slot`} // Dynamic price per slot
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {/* <div className="flex justify-between items-center mt-6">
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt; Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &gt;
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
