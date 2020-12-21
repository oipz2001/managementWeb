import React from 'react';
import { useState } from 'react';
import * as HiIcons from 'react-icons/hi';


function Seatmap() {
  const [value, onChange] = useState(new Date());
  const subject = [
    {
      id: "261457",
      name: "Digital & image",
      time: "18 Tue 18:00-19:30",
      room: "512",
      present: "16",
      absent: "4",
    },
  ]
  const student = [
    ["Pawaris Sueaaeim","Parinya Seetawan","Parinyakron Tejasoue","Pawaris Sueaaeim"],
    ["Pawaris Sueaaeim","Parinya Seetawan","Parinyakron Tejasoue","Pawaris Sueaaeim"],
    ["Teerapat Pikun","Pawaris Sueaaeim","Pawaris Sueaaeim","Pawaris Sueaaeim"],
  ]

  return (
    <div className='container-fluid pt-4'>
      <div className='box'>
      <div className='row'>
            <h3 className='head_text'>Seat Map</h3>
        </div>
        <div className='row mt-5'>
          <div className='col'>
            <div className='box_subject'>
              {subject.map((h, idx) => (
                <tr key={idx}>
                  <td>
                    <tr>
                      <th className='p-1'>{h.name}</th>
                      <th className='p-1'>{h.id}</th>
                    </tr>
                    <tr>{h.time}</tr>
                    <tr>
                      room: {h.room}
                      <th className='pl-5'>
                        {h.present}<HiIcons.HiUser style={{color: 'green'}}/>
                        {h.absent}<HiIcons.HiUser style={{color: 'red'}}/>
                      </th>
                    </tr>
                  </td>
                </tr>
              ))}
            </div>
            <div className='box'>
              <div className='App'>
                <h4 className='head_text'>Teacher</h4>
              </div>
              <div className="seat_map">
                <tbody>
                  {
                    student.map((row,i) => (
                    <tr key={i}>
                      {row.map((column,j) => (
                      <td  key={j} className="seatMap_pd">
                        <button type="button" className="btn btn-success p-4 box_seatMap" href="#">{column}</button>
                      </td>)
                      )}
                    </tr>)
                    )
                  }
                </tbody>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Seatmap;