import React from 'react'

export const ourCourses = () => {
  return <div className='mx-auto'>
    <div className='text-2xl font-bold text-red-600'>
      <div>LinguaPro</div>
    </div>
    <div className='flex justify-between items-center'>
      <ul className='flex gap-4'>
        <li>Home</li>
        <li>About Us</li>
        <li>Courses</li>
        <li>Pricing</li>
        <li>Contact Us</li>
        <button>Verify Certificate</button>
      </ul>
      <div  className='flex gap-4'>
        <p>Sign In</p>
        <button className='bg-red-600 p-2 rounded-2xl text-white'>Sign Up</button>
      </div>
    </div>
  </div>
}
