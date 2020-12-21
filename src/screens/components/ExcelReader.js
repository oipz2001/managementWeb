import React, { Component } from 'react';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
 
class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: []
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount(){
    console.log('TEST1')
  }

  componentDidUpdate(){
    console.log("Test2")
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };
 
  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        // console.log(JSON.stringify(this.state.data, null, 2));
        // console.log('Test Set state')
        this._addStudentTestAPI()

      });
 
    };
 
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }
  
  async _addStudentTestAPI(){
    var uqID = 'Oo2CvxFL6yUG6gWi3Crc'
    var teacherID = "600610749"
    var studentList = this.state.data
    console.log(uqID);
    await fetch('http://10.80.124.183:5000/studentchecking/us-central1/checkapp/webApp/addNewStudents', {
      method: 'POST',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uqID: uqID,
        teacherID:teacherID,
        studentList:studentList

      })
      })
      .then((response) => response.json())
      .then((data) => {

          console.log(data);
      })
      .catch((error) => {
      console.error(error);
      });
  }

  render() {
    return (
      <div>
        <label htmlFor="file">Upload an EXCEL or CSV</label>
        <br />
        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
        <br />
        <input type='submit' 
          value="Process Triggers"
          onClick={this.handleFile} />
          </div>
      
    )
  }
}
 
export default ExcelReader;