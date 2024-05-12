import logo from './logo.svg';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login/Login';
import Home from './Home/Home';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<Home/>} ></Route>

    </Routes>
    </BrowserRouter>

  );
}

export default App;


{/*
  const [apiData,setApiData]=useState();
  const [result,setResult]=useState();
  const [showData,setShowData]=useState();
  const [loader,setLoader]=useState(false);
  const [tableData,setTableData]=useState(false);
  const [tableColumns,setTableColumns]=useState();
  const [showTable,setShowTable]=useState(false);
  const [showQueryResult,setShowQueryResult]=useState(false);
  const submitdata=(data)=>{
    setShowData(false);
      console.log(data)
      setLoader(true);
      axios.post("http://localhost:5000/model2",data).then((data)=>{
        console.log(data);
        setApiData(data?.data?.data);
        console.log(data?.data?.data);
        console.log(data?.data?.data?.result)
        setResult(data?.data?.data?.result)
        setTableColumns(data?.data?.data?.tableAndColumns);
        setTableData(data?.data?.data?.tableData)
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
      
    <form action="" className="mt-5 col-12" onSubmit={handleSubmit(submitdata)} >
      <div className='d-flex flex-row gap-5'>
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
           <input type="text" placeholder="Employee (id,name)" /> 
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
            {/* <input type="text" placeholder="Employee (id,name)" /> 
            </p>
          </div>
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
        <div className="col-12 mt-5">
    
          {/* <Loader/> 
              {loader==true ?  <Loader/> : apiData ? <>
              <div className='mt-5'>
                <p className='givenQ'>
                Sql Query:
                </p>
              <p className='givenQuery'>
                  {apiData?.query}
                </p>
                </div>
                <div className='container mt-3 d-flex flex-row gap-3'>
                <button className='btn' onClick={()=>{setShowTable(true);setShowQueryResult(false)}}>
              Show Table Data
                </button>
              <button className='btn' onClick={()=>{setShowQueryResult(true);setShowTable(false)}}>
              Show Result
                </button>
                </div>
                
              {showQueryResult==true &&
                // {showQueryResult==true && Object.keys(tableColumns)?.map((e)=>{
                  <table className='table mt-2'>
                    {/* <thead>
                      <tr>
                        {console.log(e)}
                        {
                          tableColumns[e]?.map((e2)=>{
                            return <th>{e2}</th>
                          })
                        }
                      </tr>
                    </thead> 
                    <tbody>
                      
                        {
                         result.length>0 ? result?.map((e)=>{
                            return <tr>
                              {e?.map((data)=>{
                                return <td className='table-success'>{data}</td>
                              })}
                        </tr>
    
                          }) : <tr>
                            <td colSpan={5} className='noData table-info' >
                            Sorry but we don't have data for this query :)
                            </td>
                          </tr> 
                        }
           
                      
                    </tbody>
                  </table>}
                {showTable==true && Object.keys(tableColumns)?.map((e)=>{
    
                  {console.log("<<>>",e)}
                  return <table className='table mt-2'>
                    <thead>
                      {e}
                    </thead>
                    <thead>
                      <tr>
                        {console.log(e)}
                        {
                          tableColumns[e]?.map((e2)=>{
                            return <th>{e2}</th>
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      
                        {                      
                         tableData && tableData[e]?.map((e)=>{
                            return <tr>
                              {e?.map((data)=>{
                                return <td className='table-success'>{data}</td>
                              })}
                        </tr>
    
                          }) 
                          // : <tr>
                          //   <td colSpan={e.length} className='noData table-info' >
                          //   Sorry but we don't have data for this query :)
                          //   </td>
                          // </tr> 
                        }
           
                      
                    </tbody>
                  </table>})}</>
              // apiData ? <div className='mt-5'>          
              // <div className='d-flex flex-column align-items-center justify-content-center'>
                // <p>
                //   {apiData?.query}
                // </p>
              //     {showData==false && <p>
              //     <button className='btn'
              //     onClick={()=>{setShowData(true)}}
              //     >Want to see Results?</button>
              //     </p>}
              // </div>
              // </div> : 
              :<div className='mt-5 align-items-center justify-content-center d-flex'>
                 No Data
                 </div>
                      
              
        </div>
        {/* <div className="col-12 mt-5 container">
            
                  {Object.keys(tableColumns)?.map((e)=>{
                  return <table className='table'>
                    <thead>
                      <tr>
                        {console.log(e)}
                        {
                          tableColumns[e]?.map((e2)=>{
                            return <th>{e2}</th>
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      
                        {
                         result.length>0 ? result?.map((e)=>{
                            return <tr>
                              {e?.map((data)=>{
                                return <td className='table-success'>{data}</td>
                              })}
                        </tr>
    
                          }) : <tr>
                            <td colSpan={e.length} className='noData table-info' >
                            Sorry but we don't have data for this query :)
                            </td>
                          </tr> 
                        }
           
                      
                    </tbody>
                  </table>})}
                  </p>}
                </div> 
        </div>
        </div>
*/}