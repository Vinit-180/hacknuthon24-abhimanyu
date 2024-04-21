import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import { useForm } from "react-hook-form"
import axios from "axios";
import {InfinitySpin} from "react-loader-spinner"
// import starImg from "./star.png"
// import starImg from "./Google_Bard_logo.svg"
// import starImg from "./Bard.png"
import starImg from "./stars.png"
import Loader from './Loader';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [apiData,setApiData]=useState();
  const [result,setResult]=useState();
  const [showData,setShowData]=useState(false);
  const [loader,setLoader]=useState(false);
  const submitdata=(data)=>{
    setShowData(false);
      console.log(data)
      setLoader(true);
      axios.post("http://localhost:5000/model",data).then((data)=>{
        console.log(data);
        setApiData(data?.data?.data);
        console.log(data?.data?.data);
        console.log(data?.data?.data?.result)
        setResult(data?.data?.data?.result)
        setLoader(false);
      }).catch((err)=>{
        console.log(err);
        setLoader(false);
      })
  }
  
  return (
    <div className="main-container">
    <h1>AI SQL Query Builder</h1>
    <div className="d-flex row">
      
    <form action="" className="mt-5 col-8" onSubmit={handleSubmit(submitdata)} >
      <div className="d-flex flex-column formInput">
        <p>
          Define your database 
        </p>
        <p>
          <textarea name="ddl" id="" cols="50" rows="5"
          placeholder="CREATE TABLE Employees ( 
            EmployeeID INT PRIMARY KEY, 
            FirstName VARCHAR(50), 
            LastName VARCHAR(50), 
            DepartmentID INT, 
            Salary DECIMAL(10,2) 
            );"
            {...register("ddl")}
          ></textarea>
          {/* <input type="text" placeholder="Employee (id,name)" /> */}
        </p>
        <p>
          <input type="file" name="file" id="" />

        </p>
      </div>
      <div className="d-flex flex-column formInput">
        <p>
          Define here what do you want from database
        </p>
        <p>
          <textarea name="query" id="" cols="50" rows="5"
          placeholder="I need a list of all employees and their departments"
          {...register("query")}
          ></textarea>
          {/* <input type="text" placeholder="Employee (id,name)" /> */}
        </p>
      </div>
      <div className="d-flex flex-column">
            <button className="generate query btn px-3 py-1 gap-1 d-flex flex-row align-items-center">
              <img src={starImg} alt="" height="20px" width="20px"  />
              <span>
              Generate query
              </span>
            </button>
      </div>
    </form>
    <div className="col-4">
      {/* <Loader/> */}
          {loader==true ?  <Loader/> : apiData ? <div className='mt-5'>          
          <div className='d-flex flex-column align-items-center justify-content-center'>
            <p>
              {apiData?.query}
            </p>
            {
            console.log(Object.keys(JSON.parse(result)[0]))
            }
              {showData==false && <p>
              <button className='btn'
              onClick={()=>{setShowData(true)}}
              >Want to see Results?</button>
              </p>}
          </div>
          </div> : <div className='mt-5 align-items-center justify-content-center d-flex'>
            No Data
            </div>
            }
    </div>
    <div className="col-12 mt-5">
            {
              showData==true &&  <p>
              {/* {apiData?.result} */}
              <table className='table'>
                <thead>
                  <tr>
                    {
                      Object.keys(JSON.parse(result)[0]).map((e)=>{
                        return <th>{e}</th>
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    JSON.parse(result)?.map((data)=>{
                      return <tr>
                        {
                         Object.keys(JSON.parse(result)[0]).map((e)=>{
                          return <td>{data[e]}</td>
                         }) 
                        }
                      </tr>
                    })
                  }
                </tbody>
              </table>
              </p>
            }
            </div>
    </div>
    </div>
  );
}

export default App;
