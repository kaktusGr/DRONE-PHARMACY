import React from 'react';

export default function Discount({ title, pills }) {
    const pillsTag = pills.map((p, idx) => {
        return (
            <div key={idx} className='pill'>{p}</div>
        )
    });

    return (
        <div className='discount-container'>
            <div className='discount-pills'>
                {pillsTag}
            </div>
            <h2>{title}</h2>
        </div>
    )
}