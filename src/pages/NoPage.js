import React from 'react';

export default function NoPage() {
    return (
        <div className='no-page'>
            <img src='./images/icons/drone.svg' alt='drone' />
            <h1 className="error">Page not found</h1>
            <h2>Sorry, the server or the requested URL cannot be accessed. <br />
                Check your internet connection and refresh the page.</h2>
        </div>
    )
}
