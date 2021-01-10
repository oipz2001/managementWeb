import React from "react";
import { useState } from "react";
import ReactExport from "react-export-excel";
import ReactDOM from "react-dom";
import {
  ExcelExport,
  ExcelExportColumn,
  ExcelExportColumnGroup
} from '@progress/kendo-react-excel-export';

function Reports() {
  const [value, onChange] = useState(new Date());
  const data = [
    { firstname: "jill", lastname: "smith", age: 22 },
    { firstname: "david", lastname: "warner", age: 23 },
    { firstname: "nick", lastname: "james", age: 26 },
  ];
  

  const head = [
    "SessionID",
    "Name",
    "Date & time",
    "Room",
    "Rate",
    "Absent",
    "Report file",
  ];

  const tbd1 = [
    {
      id: "261457",
      name: "Digital & image",
      time: "18 Tue 18:00-19:30",
      desc: "412",
    },
    {
      id: "261457",
      name: "Computer Vision",
      time: "18 Tue 16:00-17:30",
      desc: "402",
    },
    {
      id: "261457",
      name: "Calculus 1",
      time: "18 Tue 11:00-12:30",
      desc: "412",
    },
    {
      id: "261457",
      name: "Calculus 2",
      time: "18 Tue 8:00-9:30",
      desc: "516",
    },
  ];

  return (
    <div className="container-fluid pt-4 ">
      <div className="box">
        <h3 className="head_text">Report</h3>
        <div className="box mt-5">
          <h4 className="head_text">
            <select
              className="form-select form-select-lg mb-3"
              aria-label="Default select example"
            >
              <option selected>Semaster 1/2563</option>
              <option value>Semaster 2/2563</option>
              <option value>Semaster summer/2563</option>
            </select>
          </h4>
          <div className="row mt-5">
            <div className="col">
              <table className="table table-secondary table-striped">
                <thead>
                  {head.map((h, idx) => (
                    <th key={idx}>{h}</th>
                  ))}
                </thead>
                <tbody>
                  {tbd1.map((t, idx) => (
                    <tr key={idx}>
                      <td>{t.id}</td>
                      <td>{t.name}</td>
                      <td>{t.time}</td>
                      <td>{t.desc}</td>
                      <td className="col-1">
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder="15 min"
                        ></input>
                      </td>
                      <td className="col-1">
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder="30 min"
                        ></input>
                      </td>
                      <div>
                      <ExcelExport
                        data={data}
                        fileName="Products.xlsx"
                        ref={data}
                      />
                        <button
                          type="button"
                          className="btn btn-success mx-1"
                          onClick={this.export}
                        >
                          Export Excel
                        </button>
                        <button type="button" className="btn btn-warning mx-1">
                          Export CSV
                        </button>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
