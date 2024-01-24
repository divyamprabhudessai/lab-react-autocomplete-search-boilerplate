import React, { useState, useEffect } from 'react';
import countryData from '../../resources/countryData.json';

function App() {
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleInput = (event) => {
    const userInput = event.target.value;
    setInput(userInput);

    const filteredResults = countryData.filter((country) =>
      country.name.toLowerCase().includes(userInput.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const handleSearch = () => {
    const filteredResults = countryData.filter((country) =>
      country.name.toLowerCase().includes(input.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }

    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  return (
    <>
    <div className='maincont'>
      <h1>SEARCH YOUR FAVOURITE COUNTRY</h1>
    <div>
      <input type="text" onChange={handleInput} id='search'/>
      <button onClick={handleSearch}>Search</button>
      </div>
    

      {showSuggestions && (
        <ul id='list'>
          {searchResults.map((country) => (
            <li key={country.code}>{country.name}</li>
          ))}
        </ul>
      )}
    </div>
      
    </>
  );
}

export default App;
