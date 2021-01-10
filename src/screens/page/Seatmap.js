import React from "react";
import { useState, useEffect } from "react";
import * as HiIcons from "react-icons/hi";
import ReactFlow from "react-flow-renderer";

const url = require("../components/urlConfig");

function Seatmap(props) {
  const [value, onChange] = useState(new Date());
  const [teacherIDState, setTeacherIDState] = useState(null);
  const [seatmapClassState, setSeatmapClassState] = useState({});

  useEffect(() => {
    var teacherID = localStorage.getItem("teacherID");
    setTeacherIDState(teacherID);
  }, []);

  useEffect(() => {
    const fetchSeatmap = async () => {
      await seatmapClassAPI(
        teacherIDState,
        props.location.state.detailClass,
        props.location.state.selectedDate
      );
    };

    if(teacherIDState!=null)
      fetchSeatmap();

  }, [teacherIDState]);

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
  const elements = [
    {
      id: "600610749",
      // type: "input", // input node
      data: { label: <div>Parinya Seetawan</div> },
      position: { x: 250, y: 25 },
    },
    // default node
    {
      id: "600610750",
      // you can also pass a React component as a label
      data: { label: <div>Parinyakorn Something</div> },
      position: { x: 100, y: 125 },
    },
    {
      id: "600610751",
      // type: "output", // output node
      data: { label: <div>Pawaris Something</div> },
      position: { x: 250, y: 250 },
    },
    // animated edge
    // { id: "e1-2", source: "1", target: "2", animated: true },
    // { id: "e2-3", source: "2", target: "3" },
  ];

  const seatmapClassAPI = async (teacherID, uqID, date) => {
    await fetch(url.endpointWebApp + "/seatmap", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seatmepClassUqID: uqID,
        seatmapClassTeacherID: teacherID,
        seatmapClassSelectedDate: date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSeatmapClassState(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container-fluid pt-4">
      <div className="box">
        <div className="row">
          <h3 className="head_text">Seat Map</h3>
        </div>
        <div className="row mt-5">
          <div className="box_subject">
            <tr>
              <td>
                <tr>
                  <th className="p-1">{seatmapClassState.name}</th>
                  <th className="p-1">{seatmapClassState.id}</th>
                </tr>
                <tr>
                  {seatmapClassState.startTime} - {seatmapClassState.endTime}
                </tr>
                <tr>
                  room: {seatmapClassState.desc}
                  <th className="pl-5">
                    {seatmapClassState.present}
                    <HiIcons.HiUser style={{ color: "green" }} />
                    {seatmapClassState.absent}
                    <HiIcons.HiUser style={{ color: "red" }} />
                  </th>
                </tr>
              </td>
            </tr>
          </div>
          <div className="box">
            <div className="seat_mapBody">
              <ReactFlow elements={elements} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Seatmap;
