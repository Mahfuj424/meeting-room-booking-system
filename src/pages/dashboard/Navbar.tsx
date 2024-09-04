import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="bg-white dark:bg-darkCard text-black dark:text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="Logo" className="h-8" />
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <div>
        <img src="/profile.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export default Navbar;
