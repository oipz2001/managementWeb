import React from "react";
import { useState, useEffect } from "react";
import * as HiIcons from "react-icons/hi";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryPie,
  VictoryStack,
  VictoryPortal,
  VictoryLabel,
} from "victory";
const url = require("../components/urlConfig");

const moment = require("moment");

function Attandents(props) {
  const [value, onChange] = useState(new Date());
  const [isShowModal, setShowModal] = useState(false);
  const [studentNameModal, setStudentNameModal] = useState("");
  const [studentIDModal, setStudentIDModal] = useState("");
  const [teacherIDState, setTeacherIDState] = useState(null);
  const [attClassState, setAttClassState] = useState({});
  const [attClassStudent,setAttClassStudent] = useState([])
  const [studentRemove, setStudentRemove] = useState();


  useEffect(() => {
    var teacherID = localStorage.getItem("teacherID");
    setTeacherIDState(teacherID);
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      await attClassAPI(
        teacherIDState,
        props.location.state.detailClass,
        props.location.state.selectedDate
      );
    };

    if(teacherIDState!=null)
      fetchAttendance();

  }, [teacherIDState]);

  const attClassAPI = async (teacherID, uqID, date) => {
    await fetch(url.endpointWebApp + "/attendance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attClassUqID: uqID,
        attClassTeacherID: teacherID,
        attClassCurrentDate: date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAttClassState(data);
        setAttClassStudent(data.statistics)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeStudentList = async (uqID,teacherID,studentID) => {
    await fetch(url.endpointWebApp + "/removeStudentList", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherID: teacherID,
        uqID: uqID,
        studentID: studentID,
      }),
    })
    .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const data = [
    { dmy: "01/08/20", present: 20, absent: 0 },
    { dmy: "02/08/20", present: 15, absent: 5 },
    { dmy: "03/08/20", present: 18, absent: 2 },
    { dmy: "04/08/20", present: 16, absent: 4 },
    { dmy: "05/08/20", present: 20, absent: 0 },
    { dmy: "06/08/20", present: 15, absent: 5 },
    { dmy: "07/08/20", present: 18, absent: 2 },
    { dmy: "08/08/20", present: 16, absent: 4 },
  ];

  const head = ["Student ID", "Name", "Time", "Status"];

  return (
    <div className="container-fluid pt-4">
      {/* {
      JSON.stringify( attClassStudent[0])
      } */}
      <div className="box">
        <h3 className="head_text">Attendance & stat</h3>
        <div className="row mt-5">
          <div className="col-5">
            <div className="box_subject">
                <tr >
                  <td>
                    <tr>
                      <th className="p-1">{attClassState.name}</th>
                      <th className="p-1">{attClassState.id}</th>
                    </tr>
                    <tr>{attClassState.startTime} - {attClassState.endTime}</tr>
                    <tr>
                      room: {attClassState.desc}
                      <th className="pl-5">
                        {attClassState.present}
                        <HiIcons.HiUser style={{ color: "green" }} />
                        {attClassState.absent}
                        <HiIcons.HiUser style={{ color: "red" }} />
                      </th>
                    </tr>
                  </td>
                </tr>
            </div>
            <div className="att_pei">
              <VictoryPie
                data={[
                  { x: "present", y: attClassState.present },
                  { x: "absent", y: attClassState.absent },
                ]}
                width={300}
                colorScale={["green", "red"]}
              />
            </div>
          </div>
          <div className="col">
            <div className="att_css">
              <VictoryChart domainPadding={{ x: 20 }}>
                <VictoryStack
                  colorScale={["green", "red"]}
                  style={{
                    data: { width: 20 },
                    labels: { padding: -20 },
                  }}
                  labelComponent={
                    <VictoryPortal>
                      <VictoryLabel />
                    </VictoryPortal>
                  }
                >
                  <VictoryBar
                    data={data}
                    x="dmy"
                    y="present"
                    labels={({ datum }) => (datum.present ? datum.present : "")}
                    style={{ labels: { fill: "white" } }}
                  />
                  <VictoryBar
                    data={data}
                    x="dmy"
                    y="absent"
                    labels={({ datum }) => (datum.absent ? datum.absent : "")}
                    style={{ labels: { fill: "white" } }}
                  />
                </VictoryStack>
                <VictoryAxis
                  label="Past 8 day"
                  style={{
                    axisLabel: { padding: 30 },
                    tickLabels: { fontSize: 8, padding: 5 },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  label="Present of Student"
                  style={{
                    axisLabel: { padding: 40 },
                  }}
                />
              </VictoryChart>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="row">
            <div className="col">
              <h3 className="head_text">Students list</h3>
            </div>
          </div>
          <div className="col mt-3 box">
            <table className="table table-secondary table-striped">
              <thead>
                {head.map((h, idx) => (
                  <th key={idx}>{h}</th>
                ))}
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Student ID"
                      aria-label="Student ID"
                    ></input>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      aria-label="Name"
                    ></input>
                  </td>
                  <td className="col-2">
                    <input
                      disabled  
                      type="text"
                      className="form-control"
                      placeholder="don't know"
                      aria-label="Time"
                    ></input>
                  </td>
                  <td className="col-1">
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      placeholder="fales"
                      aria-label="Status"
                    ></input>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success mx-1"
                    >
                      Add
                    </button>
                  </td>
                </tr>
                {attClassStudent.map((t, idx) => (
                  <tr key={idx}>
                    <td>{t.studentID}</td>
                    <td>{t.studentName}</td>
                    {t.timestamp == null ? <td>dont know</td> : <td>{t.timestamp}</td>}
                    <td>{t.isChecked.toString()}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger mx-1"
                        onClick={async () => {
                          await removeStudentList(attClassState.uqID,attClassState.teacherID,t.studentID);
                          await attClassAPI(
                            teacherIDState,
                            props.location.state.detailClass,
                            props.location.state.selectedDate
                          );
                        }}
                      >
                        Remove
                      </button>
                      <button
                        className="btn btn-warning mx-1"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={(e) => {
                          setStudentNameModal(t.studentName);
                          setStudentIDModal(t.studentID);
                        }}
                      >
                        statistic
                      </button>
                    </td>
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
              <h5 className="modal-title head_text" id="exampleModalLabel">
                {studentNameModal} {studentIDModal}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="att_pei">
                <VictoryPie
                  data={[
                    { x: "present", y: 3 },
                    { x: "absent", y: 1 },
                  ]}
                  width={300}
                  colorScale={["green", "red"]}
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                />
              </div>
              <tbody>
                <h3 className="head_text pt-3">Checking list</h3>
                {attClassStudent.map((t, idx) => (
                  <tr key={idx}>
                    <tr>
                      {t.isChecked.toString()} {t.timestamp}
                    </tr>
                  </tr>
                ))}
              </tbody>
            </div>
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

export default Attandents;
