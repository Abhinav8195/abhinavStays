import React from 'react';
import './featureProperties.css';
import useFetch from '../../hooks/useFetch';

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("https://abhinavstays.onrender.com/api/hotels?featured=true");
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  // Sort the data from latest to oldest based on createdAt
  const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Limit to the first 8 items
  const limitedData = sortedData.slice(0, 8);

  return (
    <div className='fp'>
      {limitedData.map((item) => (
        <div className='fpItem' key={item._id}>
          <img src={item.photos[0]} alt="Aparthotel Stare Miasto" className="fpImg" />
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
          {item.rating && (
            <div className="fpRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FeaturedProperties;
