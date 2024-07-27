import React from 'react';
import './featureProperties.css';
import useFetch from '../../hooks/useFetch';

const FeaturedProperties = () => {

  const { data, loading, error } = useFetch("/api/hotels?featured=true");
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div className='fp'>
      {data.map((item) => (
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
