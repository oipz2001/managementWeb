import React from "react";
import { useState } from "react";
import Calendar from "../components/Calendar";

function Reports() {
  const [value, onChange] = useState(new Date());
  const head = [
    "SessionID",
    "Name",
    "Date & time",
    "Room",
    "Semester",
    "Rate/min",
    "Report file",
  ];

  const tbd = [
    {
      id: "261457",
      name: "Digital & image",
      time: "18 Tue 18:00-19:30",
      desc: "412",
      term: "1/2563",
      late: "15",
    },
    {
      id: "261457",
      name: "Digital & image",
      time: "18 Tue 18:00-19:30",
      desc: "412",
      term: "1/2563",
      late: "15",
    },
    {
      id: "261457",
      name: "Digital & image",
      time: "18 Tue 18:00-19:30",
      desc: "412",
      term: "1/2563",
      late: "15",
    },
    {
      id: "261457",
      name: "Digital & image",
      time: "18 Tue 18:00-19:30",
      desc: "412",
      term: "1/2563",
      late: "15",
    },
  ];

  return (
    <div className="container-fluid pt-4">
      <div className="box">
        <h3 className="head_text">Report</h3>
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
                    <td>{t.late}</td>
                    <div>
                      <button
                        type="button"
                        className="btn btn-success mx-1"
                        href="#"
                      >
                        Export PDF
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning mx-1"
                        href="#"
                      >
                        Export CSV
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

export default Reports;
