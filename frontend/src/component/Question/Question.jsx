import React from 'react';
import './Question.css';

const Question = ({ question, value, onChange, name }) => {

    return (
        <div className='CFQ'>
            <p className='CFtext3'>{question}</p>
            <div className='CFQ2'>
                {[-2, -1, 0, 1, 2].map((num) => (
                    <div key={num}>
                        <input
                            type='radio'
                            name={name}
                            value={num}
                            onChange={onChange}
                            checked={parseInt(value) === num}
                            className='checkbox'
                        />
                        <label>{num}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Question;
