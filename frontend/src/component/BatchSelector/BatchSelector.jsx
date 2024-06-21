import React from 'react';
import './BatchSelector.css';

function BatchSelector() {
    const handle = (e) => {
        localStorage.setItem('batchNo', e.target.value);
    }

    return (
        <div>
            <select onChange={handle} className='BatchdropSelect'>
                <option className='Batchoption1' value={"Select Department"}>Select Batch number</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
            </select>
        </div>
    )
}

export default BatchSelector