import React, { useContext, useState } from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
import { useNavigate,Link } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ type }) => {
    const [openDate, setOpenDate] = useState(false);
    const [destination, setDestination] = useState("");
    const [openOption, setOpenOption] = useState(false);
    const [option, setOption] = useState({
        adult: 1,
        children: 0,
        room: 1
    });
    const navigate = useNavigate();

    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const handleOption = (name, operation) => {
        setOption(prev => {
            return {
                ...prev, [name]: operation === 'i' ? option[name] + 1 : option[name] - 1
            };
        });
    };

    const { dispatch } = useContext(SearchContext);
    const { user } = useContext(AuthContext);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleSearch = () => {
        const capitalizedDestination = capitalizeFirstLetter(destination);
        dispatch({ type: "NEW_SEARCH", payload: { destination: capitalizedDestination, dates, option } });
        navigate('/hotels', { state: { destination: capitalizedDestination, dates, option } });
    };
    const handleSignIN=()=>{
        navigate('/register')
    }

    return (
        <div className='header'>
            <div className={type === "List" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <Link to={'https://abhinav-airways.vercel.app/'}>
                        <FontAwesomeIcon icon={faPlane} />
                       <span>Flights</span></Link>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport Taxis</span>
                    </div>
                </div>
                {type !== "List" &&
                    <>
                        <h1 className="headerTitle">A Lifetime of discounts? It's Genius</h1>
                        <p className="headerDesc">Get rewarded for your travels - unlock instant savings of 10% or more with a free account sign up!</p>
                        {!user && <button className="headerBtn" onClick={handleSignIN}>Sign in / Register</button>}
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                                <input type="text" placeholder='Where are you going?' className='headerSearchInput' onChange={(e) => setDestination(e.target.value)} />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                                <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className='date'
                                    minDate={new Date()}
                                />}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                                <span onClick={() => setOpenOption(!openOption)} className='headerSearchText'>{`${option.adult} adult · ${option.children} children · ${option.room} room`}</span>
                                {openOption && <div className="options">
                                    <div className="optionItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button className='optionCounterButton' disabled={option.adult <= 1} onClick={() => handleOption("adult", "d")}>-</button>
                                            <span className="optionCounterNumber">{option.adult}</span>
                                            <button className='optionCounterButton' onClick={() => handleOption("adult", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button className='optionCounterButton' disabled={option.children <= 0} onClick={() => handleOption("children", "d")}>-</button>
                                            <span className="optionCounterNumber">{option.children}</span>
                                            <button className='optionCounterButton' onClick={() => handleOption("children", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button className='optionCounterButton' disabled={option.room <= 1} onClick={() => handleOption("room", "d")}>-</button>
                                            <span className="optionCounterNumber">{option.room}</span>
                                            <button className='optionCounterButton' onClick={() => handleOption("room", "i")}>+</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>

                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    );
};

export default Header;
