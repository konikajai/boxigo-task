import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import LivingRoom from './LivingRoom';

const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    fontSize: '12px'
};

const roomStyle = {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '10px',
    margin: '5px 0',
    position: 'relative',
    color: 'red'
};

const toggle = { 
    background: 'none', 
    border: 'none', 
    position: 'absolute', 
    right: '10px', 
    top: '50%', 
    transform: 'translateY(-50%)' 
};

const MoreDetails = ({ data }) => {
    const [isLivingRoomOpen, setLivingRoomOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleLivingRoomToggle = () => {
        setLivingRoomOpen(!isLivingRoomOpen);
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <>
            <div className='d-flex'>
                <h6 className='me-3' style={{ color: 'red' }}>Inventory Details</h6>
                <button style={buttonStyle}>Edit Inventory</button>
            </div>
            <div>
                <div style={roomStyle}>
                    Living Room
                    <button style={toggle} onClick={handleLivingRoomToggle}>
                        <FontAwesomeIcon icon={isLivingRoomOpen ? faChevronUp : faChevronDown} />
                    </button>
                </div>
                {isLivingRoomOpen && <LivingRoom />}
                <div style={roomStyle}>Bed Room</div>
                <div style={roomStyle}>Kitchen</div>
                <div style={roomStyle}>Bathroom</div>
            </div>
            <div className='d-flex mt-5'>
                <h6 className='me-3' style={{ color: 'red' }}>House Details</h6>
                <button style={buttonStyle}>Edit house details</button>
            </div>
            <div className='mt-5 border-bottom'>
                <h6 style={{ color: 'red' }}>New House Details</h6>
                <div className='d-flex justify-content-between'>
                    <div>
                        <h6>New Floor No.</h6>
                        {data.new_floor_no}
                    </div>
                    <div>
                        <h6>New Elevator Available</h6>
                        {data.new_elevator_availability}
                    </div>
                    <div>
                        <h6>New Parking Distance</h6>
                        {data.new_parking_distance}
                    </div>
                    <div>
                        <h6>Packing Service</h6>
                        {data.packing_service}
                    </div>
                    <div>
                        <h6>Unpacking Service</h6>
                        {data.unpacking_service}
                    </div>
                </div>
                <h6 className='mt-2' style={{ color: 'red' }}>Additional Information</h6>
                <p>{data.additional_info}</p>
            </div>
        </>
    );
};

export default MoreDetails;
