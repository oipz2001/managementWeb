import React from "react";
import { useState , useEffect} from "react";
import ExportComponent from '../components/exportButtonNew'
const url = require("../components/urlConfig");

function Reports() {
  const [value, onChange] = useState(new Date());
  const [reportClass, setReportClass] = useState({});
  const [semester, setSemester] = useState('');
  const [teacherIDState, setTeacherIDState] = useState(null);

  useEffect(() => {
    var teacherID = localStorage.getItem("teacherID");
    setTeacherIDState(teacherID);
  }, []);

  useEffect(() => {
    reportClassAPI(teacherIDState)
  },[teacherIDState,semester])


  const head = [
    "SessionID",
    "Name",
    "Start time - End time",
    "Room",
    "Late",
    "Absent",
    "Report file",
  ];

  // const tbd1 = [
  //   {
  //     id: "261457",
  //     name: "Digital & image",
  //     time: "18 Tue 18:00-19:30",
  //     desc: "412",
  //   },
  //   {
  //     id: "261457",
  //     name: "Computer Vision",
  //     time: "18 Tue 16:00-17:30",
  //     desc: "402",
  //   },
  //   {
  //     id: "261457",
  //     name: "Calculus 1",
  //     time: "18 Tue 11:00-12:30",
  //     desc: "412",
  //   },
  //   {
  //     id: "261457",
  //     name: "Calculus 2",
  //     time: "18 Tue 8:00-9:30",
  //     desc: "516",
  //   },
  // ];

  const reportClassAPI = async (teacherID) => {
    await fetch(url.endpointWebApp + "/getClassReport", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherID: teacherID,
        semester: semester,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReportClass(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    setSemester(event.target.value)
  }



  return (
    <div className="container-fluid pt-4 ">
      <div style={{backgroundColor:'red'}}>
      </div>
      <div className="box">
        <h3 className="head_text">Report</h3>
        <div className="box mt-5">
          <h4 className="head_text">
            <select
              className="form-select form-select-lg mb-3"
              aria-label="Default select example"
              onChange={(e) => 
                handleChange(e)
              }
            >
              <option selected >Please select semester</option>
              <option value="2/2563" >2/2563</option>
              <option value="1/2563">1/2563</option>
              <option value="2/2562">2/2562</option>
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
                    <tr>
                      <td>{reportClass.id}</td>
                      <td>{reportClass.name}</td>
                      <td>{reportClass.startTime}{reportClass.endTime}</td>
                      <td>{reportClass.desc}</td>
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
                        <ExportComponent/>
                      </div>
                    </tr>
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
