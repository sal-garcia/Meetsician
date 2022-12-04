import React from 'react';

function NotFound() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='text-center'>
        <h1><span className='text-danger'>404</span>Page Not Found</h1>
        <h3>
          <a href="#">Return Home</a>
        </h3>
        <p>you shouldnt be here.....</p>
      </div>
    </div>
  );
}

export default NotFound;
