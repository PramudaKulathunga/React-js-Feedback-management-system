import React, { useState } from 'react';
import './PositionSelector.css';

function PositionSelector() {
    const handle = (e) => {
        localStorage.setItem('position', e.target.value);
    }

    return (
        <div>
            <select onChange={handle} className='dropSelect'>
                <option className='option1' value={"Select Position"}>Select Position</option>
                <option value={"Student"}>Student</option>
                <option value={"Management Assistant"}>Management Assistant</option>
                <option value={"Lecturer"}>Lecturer</option>
            </select>
        </div>
    )
}

export default PositionSelector