// Search.js
import React, { useState } from 'react';

function Search({ setSearchResults, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Trigger live search on each input change
    onSearch(newSearchTerm);
  }; 
 
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default Search;
