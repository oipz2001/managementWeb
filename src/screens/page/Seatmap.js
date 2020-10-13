import React from 'react';
import { useState } from 'react';
import Calendar from '../components/Calendar'

function Seatmap() {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <Calendar/>
      <h1 className='reports'>Seatmap</h1>
    </div>
  );
}

export default Seatmap;