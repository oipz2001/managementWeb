import React from "react";
import { useState } from "react";
import * as HiIcons from "react-icons/hi";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie, VictoryStack, VictoryPortal, VictoryLabel } from "victory";
import axios from "axios";

function Attandents() {
  const [value, onChange] = useState(new Date());
  const [isShowModal, setShowModal] = useState(false);
  const [studentNameModal, setStudentNameModal] = useState("");
  const [studentIDModal, setStudentIDModal] = useState("");
  const subject = [
    {
      id: "261457",
      name: "Digital & image",
      time: "18 Tue 18:00-19:30",
      room: "512",
      present: "16",
      absent: "4",
    },
  ];
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

  const test11 = ["first", "second", "third"]
  const head = ["Student ID", "Name", "Faculty", "Status"];
  const tbd = [
    {
      id: "600610751",
      name: "Pawaris Sueaaeim",
      faculty: "Engineering",
      status: "Checked",
    },
    {
      id: "600610749",
      name: "Parinya seetawan",
      faculty: "Engineering",
      status: "Uncheck",
    },
  ];

  const fetchAPI = async () => {
    console.log("testAPI");
    // fetch(
    //   "http://localhost:5000/studentchecking/us-central1/checkapp/webApp/getData"
    // )
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       console.log(result);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );


    fetch('http://localhost:5000/studentchecking/us-central1/checkapp/webApp/postData', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Pawaris',
        id: '600610751'
      })
    })
    .then((res) => res.json())
    .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const student = [
    { time: "14/08/2563", stutus: "checked" },
    { time: "13/08/2563", stutus: "checked" },
    { time: "12/08/2563", stutus: "checked" },
    { time: "11/08/2563", stutus: "Uncheck" },
  ];

  return (
    <div className="container-fluid pt-4">
      <div className="box">
        <h3 className="head_text">Attendance & stat</h3>
        <div className="row mt-5">
          <div className="col-5">
            <div className="box_subject">
              {subject.map((h, idx) => (
                <tr key={idx}>
                  <td>
                    <tr>
                      <th className="p-1">{h.name}</th>
                      <th className="p-1">{h.id}</th>
                    </tr>
                    <tr>{h.time}</tr>
                    <tr>
                      room: {h.room}
                      <th className="pl-5">
                        {h.present}
                        <HiIcons.HiUser style={{ color: "green" }} />
                        {h.absent}
                        <HiIcons.HiUser style={{ color: "red" }} />
                      </th>
                    </tr>
                  </td>
                </tr>
              ))}
            </div>
            <div className="att_pei">
              <VictoryPie
                data={[
                  { x: "present", y: 16 },
                  { x: "absent", y: 4 },
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
                    labels: { padding: -20 }
                  }}
                  labelComponent={
                    <VictoryPortal>
                      <VictoryLabel/>
                    </VictoryPortal>
                  }
                >
                <VictoryBar
                  data={data}
                  x="dmy"
                  y="present"
                  labels={({ datum }) => (datum.present ? datum.present: '')}
                  style={{ labels: { fill: "white" } }}
                />
                <VictoryBar
                  data={data}
                  x="dmy"
                  y="absent"
                  labels={({ datum }) => (datum.absent ? datum.absent: '')}
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
                      type="text"
                      className="form-control"
                      placeholder="Faculty"
                      aria-label="Faculty"
                    ></input>
                  </td>
                  <td className="col-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Status"
                      aria-label="Status"
                    ></input>
                  </td>
                  <div>
                    <button
                      type="button"
                      className="btn btn-success mx-1"
                      href="#"
                    >
                      Add
                    </button>
                  </div>
                </tr>
                {tbd.map((t, idx) => (
                  <tr key={idx}>
                    <td>{t.id}</td>
                    <td>{t.name}</td>
                    <td>{t.faculty}</td>
                    <td>{t.status}</td>
                    <div>
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
                      <button
                        className="btn btn-warning mx-1"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={(e) => {
                          setStudentNameModal(t.name);
                          setStudentIDModal(t.id);
                        }}
                      >
                        statistic
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
                {student.map((std, idx) => (
                  <tr key={idx}>
                    <tr>
                      {std.stutus} {std.time}
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
