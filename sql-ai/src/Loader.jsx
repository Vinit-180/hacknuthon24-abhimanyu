import React, { useState, useEffect } from "react";
import "./Loader.css"; // Import CSS for styling
// import loaderImg from "./blue.png";
function Loader() {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const renderBoxes = () => {
      const boxArray = [];
      for (let n = 0; n < 8; n++) {
        boxArray.push(
          <div key={n} className={`box box${n}`}>
            <div>233</div>
          </div>
        );
      }
      setBoxes(boxArray);
    };

    renderBoxes();
  }, []);

  return (
    <div className="loader align-items-center mt-5">
      {/* {boxes}
      <div className="ground">
        <div></div>
      </div>
      <a
        className="dribbble"
        href="https://dribbble.com/shots/7227469-3D-Boxes-Loader"
        target="_blank"
      >
        <img
          src={loaderImg}
          alt="Dribbble Logo"
        />
                
      </a> */}

      <div class="loader">
        <div class="box box0">
          <div></div>
        </div>
        <div class="box box1">
          <div></div>
        </div>
        <div class="box box2">
          <div></div>
        </div>
        <div class="box box3">
          <div></div>
        </div>
        <div class="box box4">
          <div></div>
        </div>
        <div class="box box5">
          <div></div>
        </div>
        <div class="box box6">
          <div></div>
        </div>
        <div class="box box7">
          <div></div>
        </div>
        <div class="ground">
          <div></div>
        </div>
      </div>
      <a
        class="dribbble"
        href="https://dribbble.com/shots/7227469-3D-Boxes-Loader"
        target="_blank"
      >
        {/* <img src="https://dribbble.com/assets/logo-small-2x-9fe74d2ad7b25fba0f50168523c15fda4c35534f9ea0b1011179275383035439.png" /> */}
      </a>
    </div>
  );
}

export default Loader;
