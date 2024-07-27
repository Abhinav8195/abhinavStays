import React, { useContext, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import './List.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';

const List = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(location.state?.destination || '');
  const [dates, setDates] = useState(location.state?.dates || [{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }]);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [option, setOption] = useState(location.state?.option || {
    adult: 1,
    children: 0,
    room: 1,
    minPrice: '',
    maxPrice: '',
  });

  const { data, loading, error, reFetch } = useFetch(`https://abhinavstays.onrender.com/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);
  const { dispatch } = useContext(SearchContext);

  const handleOptionChange = (e) => {
    setOption((prevOption) => ({
      ...prevOption,
      [e.target.name]: e.target.value,
    }));
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSearch = () => {
    const capitalizedDestination = capitalizeFirstLetter(destination);
    dispatch({ type: "NEW_SEARCH", payload: { destination: capitalizedDestination, dates, option } });
    navigate('/hotels', { state: { destination: capitalizedDestination, dates, option } });
  };

  return (
    <>
      <Navbar />
      <Header type="List" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="destination">Destination</label>
              <input
                id="destination"
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label htmlFor="checkInDate">Check-in Date</label>
              <span
                onClick={() => setOpenDate(!openDate)}
                className="dateText"
              >
                {`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                  className="dateRange"
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min Price <small>per night</small></span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    name="minPrice"
                    value={option.minPrice}
                    onChange={(e) => setMin(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max Price <small>per night</small></span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    name="maxPrice"
                    value={option.maxPrice}
                    onChange={(e) => setMax(e.target.value)}
                    placeholder="500"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    name="adult"
                    value={option.adult}
                    onChange={handleOptionChange}
                    placeholder="1"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    name="children"
                    value={option.children}
                    onChange={handleOptionChange}
                    placeholder="0"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    name="room"
                    value={option.room}
                    onChange={handleOptionChange}
                    placeholder="1"
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch} className="searchButton">Search</button>
          </div>
          <div className="listResult">
            {loading ? "Loading" : (
              <>
                {data.map((item) => (
                  <SearchItem key={item._id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
