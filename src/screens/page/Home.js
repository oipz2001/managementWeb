import React from "react";
import { useState } from "react";
import Calendar from "../components/Calendar";
import ExcelReader from '../components/ExcelReader';

const moment = require('moment')
 


function Home(props) {
  const [value, onChange] = useState(new Date());
  const [currentDate,setcurrentDate] = useState(moment(new Date()).format('YYYY-MM-DD').toString())
  const [currentTime,setcurrentTime] = useState(moment(new Date()).format('HH:mm').toString())
  const [sessionsData,setSessionsData] = useState(null)
  const head = ["Session ID", "Name", "Date & time", "Room", "Semester", "Status", "Management"];
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header =>
      header
        .toLowerCase()
        .replace(/\W/g, '_')
  }
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
      id: "261458",
      name: "Computer Vision",
      time: "18 Tue 16:00-17:30",
      desc: "402",
      term: "1/2563",
      status: "Opening",
    },
    {
      id: "261459",
      name: "Calculus 1",
      time: "18 Tue 11:00-12:30",
      desc: "412",
      term: "1/2563",
      status: "Clossed",
    },
    {
      id: "261460",
      name: "Calculus 3",
      time: "18 Tue 8:00-9:30",
      desc: "516",
      term: "1/2563",
      status: "Clossed",
    },
  ];


  const fetchClassAPI = async () => {
    var teacherID = '600610749'
    var date  = '2020-12-21'
 
      await fetch('http://10.80.124.183:5000/studentchecking/us-central1/checkapp/webApp/teachers/getSession?date='+date+'&teacherID='+teacherID+'&clientCurrentTime='+currentTime+'&clientCurrentDate='+currentDate)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setSessionsData(data)
        })
        .catch((error) => {
            console.error(error);
        });

  }

  
  return (
    <div className="container-fluid pt-4">
      <div className='btn-danger'>
        <button type="button" className="btn btn-success mx-1" onClick={()=>fetchClassAPI()}>
          test
        </button>
      </div>
      <div className='box'>
        <div className='row'>
          <h3 className='head_text'>My Classroom</h3>
          <div className="col-5 d-flex mt-3">
            <Calendar />
          </div>
        </div>
      <div className="row mt-5">
        <div className="col">
          <table className="table table-secondary table-striped">
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
                      {t.status === "In progress" ?
                      <button
                        data-toggle="modal"
                        className="btn-warning btn"
                        data-target="#exampleModal"
                        >Import Student
                      </button>
                      : 
                      <button type="button" className="btn btn-success mx-1" onClick={()=>props.history.push('/attendants')}>Attendance</button>}
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
      </div>
      </div>
      <div className="modal fade" id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title head_text">
                Import students
              </h5>
            </div>
            <ExcelReader/>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
