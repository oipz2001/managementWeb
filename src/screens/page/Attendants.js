import React from 'react';
import { useState } from 'react';
import Calendar from '../components/Calendar'
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis,
        VictoryTheme } from 'victory';


function Attandents() {
  const [value, onChange] = useState(new Date());
  const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 14250},
    {quarter: 5, earnings: 14250},
    {quarter: 6, earnings: 14250},
    {quarter: 7, earnings: 19000}
  ];
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

  return (
    <div className='container-fluid pt-4'>
      <div className='box'>
        <h3 className='head_text'>Attendance & stat</h3>
      <div className='row mt-5'>
        <div className='col'>
          
        </div>
        <div className='col' >
          <div className='att_css'>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={data.length+20}
          >
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7]}
            tickFormat={["1", "2", "3", "4", "5", "6", "7"]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x / 1000}`)}
          />
          <VictoryBar
            data={data}
            x="quarter"
            y="earnings"
          />
          </VictoryChart>
          </div>
        </div>
        </div>
        <div className='row mt-5'>
          <h3 className='head_text'>Students list</h3>
        <div className="col mt-3">
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
                    </div>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Attandents;
