import React from "react";
import { useState } from "react";
import Calendar from "../components/Calendar";

function Home() {
  const [value, onChange] = useState(new Date());
  const head = ["Session ID", "Name", "Date & time", "Room", "Semester", "Status", "Management"];
  const tbd = [
    {
      id: "261457",
      name: "Digital & image",
      time: "18 Tue 18:00-19:30",
      desc: "412",
      term: "1/2563",
      status: "In progress",
    },
    {
      id: "261457",
      name: "Digital & image",
      time: "18 Tue 18:00-19:30",
      desc: "412",
      term: "1/2563",
      status: "Opening",
    },
    {
      id: "261457",
      name: "Digital & image",
      time: "18 Tue 18:00-19:30",
      desc: "412",
      term: "1/2563",
      status: "Clossed",
    },
    {
      id: "261457",
      name: "Digital & image",
      time: "18 Tue 18:00-19:30",
      desc: "412",
      term: "1/2563",
      status: "Clossed",
    },
  ];

  return (
    <div className="container-fluid pt-4">
      <div className='box'>
      <h3 className='head_text'>My session</h3>
      <div className="row mt-5">
        <div className="col">
          <table className="table table-striped">
            <thead>
              {head.map((h, idx) => (
                <th key={idx}>{h}</th>
              ))}
            </thead>
            <tbody>
                {tbd.map((t, idx) => (
                  <tr key={idx}>
                    <td>{t.id}</td>
                    <td>{t.name}</td>
                    <td>{t.time}</td>
                    <td>{t.desc}</td>
                    <td>{t.term}</td>
                    <td>{t.status}</td>
                    <div>
                      {t.status == "In progress" ? 
                      <button type="button" className="btn btn-warning mx-1" href="#"> Import students</button>
                      : 
                      <button type="button" className="btn btn-success mx-1" href="#"> Class Checking</button>}
                      <button
                        type="button"
                        className="btn btn-info mx-1"
                        href="#"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mx-1"
                        href="#"
                      >
                        Remove
                      </button>
                    </div>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
        <div className="col-3 d-flex justify-content-center">
          <Calendar />
        </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
