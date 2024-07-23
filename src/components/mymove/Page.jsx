import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faUser, faEnvelope, faRightFromBracket, faArrowRight, faHouse, faLocationDot, faCalendarDays, faTriangleExclamation, 
    faSquareNfi } from '@fortawesome/free-solid-svg-icons';
import MoreDetails from './MoreDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

const Page = () => {
    const [data, setData] = useState([]);
    const [expandedItemId, setExpandedItemId] = useState(null);

    useEffect(() => {
        fetch('http://test.api.boxigo.in/sample-data/')
            .then(response => response.json())
            .then(data => {
                setData(data.Customer_Estimate_Flow || []);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleMoreDetailsClick = (id) => {
        setExpandedItemId(expandedItemId === id ? null : id);
    };

    return (
        <div className="container-fluid mt-5">
            <div className="d-flex">
                <div className="flex-shrink-0 d-flex flex-column align-items-center" style={{ flex: '0 0 15%' }}>
                    <div className="d-flex justify-content-center align-items-center my-2 text-nowrap">
                        <FontAwesomeIcon icon={faTruck} color="red" />
                        <span className="ms-2" style={{ fontSize: '12px' }}>MY MOVE</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center my-2 text-nowrap">
                        <FontAwesomeIcon icon={faUser} color="red" />
                        <span className="ms-2" style={{ fontSize: '12px' }}>MY PROFILE</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center my-2 text-nowrap">
                        <FontAwesomeIcon icon={faEnvelope} color="red" />
                        <span className="ms-2" style={{ fontSize: '12px' }}>GET QUOTE</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center my-2 text-nowrap">
                        <FontAwesomeIcon icon={faRightFromBracket} color="red" />
                        <span className="ms-2" style={{ fontSize: '12px' }}>LOGOUT</span>
                    </div>
                </div>
                <div className="flex-grow-1">
                    {data.map((item, index) => (
                        <div 
                            key={index} 
                            className={`border-bottom mb-4 p-3 rounded ${expandedItemId === item.estimate_id ? 'border-primary' : 'border-light'}`}
                            style={{ transition: 'border-color 0.3s ease', borderWidth: '2px' }}
                        >
                            <div className='d-flex justify-content-between align-items-start'>
                                <div className='text-wrap' style={{ maxWidth: '350px' }}>
                                    <h6>From</h6>
                                    <p className="small">{item.moving_from}</p>
                                </div>
                                <div className='d-flex align-items-center text-danger'>
                                    <FontAwesomeIcon icon={faArrowRight} style={{ boxShadow: '0px 0px 3px white', padding: '5px', borderRadius: '50%' }} />
                                </div>
                                <div className='text-wrap' style={{ maxWidth: '350px' }}>
                                    <h6>To</h6>
                                    <p className="small">{item.moving_to}</p>
                                </div>
                                <div>
                                    <h6>Request#</h6>
                                    <p className="small text-danger fw-bold">{item.estimate_id}</p>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between align-items-start'>
                                <div>
                                    <FontAwesomeIcon icon={faHouse} color="red" />
                                    {item.property_size}
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faSquareNfi} color="red" />
                                    {item.total_items}
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faLocationDot} color="red" />
                                    {item.distance}
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faCalendarDays} color="red" />
                                    {new Date(item.moving_on).toLocaleDateString()}
                                </div>
                                <div>
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            defaultChecked 
                                            readOnly 
                                            style={{ accentColor: 'red' }} 
                                        />
                                        <label className="form-check-label ms-2 text-danger">Is Flexible</label>
                                    </div>
                                </div>
                                <div>
                                    <button 
                                        className="btn" 
                                        onClick={() => handleMoreDetailsClick(item.estimate_id)}
                                        style={{ border: '2px solid red', backgroundColor: 'white', color: 'red' }}
                                    >
                                        View more details
                                    </button>
                                </div>
                                <div>
                                    <button className="btn btn-danger text-white">{item.custom_status}</button>
                                </div>
                            </div>
                            <div className='d-flex mt-5'>
                                {/* <FontAwesomeIcon icon={faTriangleExclamation} color="red" className="me-2" /> */}
                                <div>
                                    <h6>Disclaimer :</h6>
                                    <p>Please update your move date before two days of shifting.</p>
                                </div>
                            </div>
                            {expandedItemId === item.estimate_id && <MoreDetails data={item} />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
