import React from "react";

const SearchBar = () => {
  return (
    <div className="text-white text-3xl">
      <div>
        <img
          src="search.svg"
          alt="Search Icon"
          className="inline w-8 h-8 mr-4 mb-2"
        />
        <input
          type="text"
          placeholder="Search through thousands of movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-b-2 border-white focus:outline-none w-3/4 pb-2"
        />
      </div>
    </div>
  );
};

export default SearchBar;
