import logo from './logo.svg';
import './App.css';
// import starImg from "./star.png"
// import starImg from "./Google_Bard_logo.svg"
import starImg from "./Bard.png"


function App() {
  return (
    <div className="main-container">
    <h1>AI SQL Query Builder</h1>

    <div className="d-flex flex-row">
    <form action="" className="mt-5 col-8">
      <div className="d-flex flex-column">
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
          ></textarea>
          {/* <input type="text" placeholder="Employee (id,name)" /> */}
        </p>
      </div>
      <div className="d-flex flex-column">
        <p>
          Define here what do you want from database
        </p>
        <p>
          <textarea name="query" id="" cols="50" rows="5"
          placeholder="I need a list of all employees and their departments"
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

    </div>
    </div>
    </div>
  );
}

export default App;
