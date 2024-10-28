import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import "./styles/App.css";
import TShirt from "./assets/t-shirt.png";
import Pants from "./assets/pants.png";
import Combo from "./assets/combo.png";
import PantsComponent from "./components/Pants";
import ComboComponent from "./components/Combo";
import TShirtComponent from "./components/TShirt";
import customOne from "./assets/custom1.png";
import customTwo from "./assets/custom2.png";
import customThree from "./assets/custom3.png";

function App() {
  const [selectedColor, setSelectedColor] = useState([]);
  const [amount, setAmount] = useState("");
  const [data, setData] = useState(null);
  const [commission, setCommission] = useState(0);
  const [inp, setInp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("rgb(255, 255, 255)");
  const [title, setTitle] = useState("");
  const [component, setComponent] = useState(<TShirtComponent />);
  const [colors] = useState([
    "black",
    "white",
    "red",
    "crimson",
    "orange",
    "yellow",
    "gray",
    "blue",
    "aqua",
    "purple",
    "pink",
    "hollow",
  ]);

  const titleRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleAdd = (color) => {
    setSelectedColor(color);
  };

  const inputOFFe = () => {
    setComponent(<PantsComponent />);
    setTitle("");
    setInp(true);
    handleClose();
  };

  const inputON = () => {
    setComponent(<TShirtComponent />);
    setTitle("");
    setInp(false);
  };

  const inputOFFo = () => {
    setComponent(<ComboComponent />);
    setTitle("");
    setInp(true);
    handleClose();
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleAmountChange = (event) => {
    const inputValue = event.target.value;
    setAmount(inputValue);
    if (inputValue !== "") {
      const commissionAmount = parseFloat(inputValue) * 0.05;
      setCommission(commissionAmount.toFixed(2));
    } else {
      setCommission(0);
    }
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    const data = localStorage.setItem(
      "data",
      JSON.stringify({ name: title, price: commission })
    );
    location.reload();
    return data;
  };

  const handleLastSave = () => {
    const storedValue = localStorage.getItem("data");
    if (storedValue) {
      const parsedData = JSON.parse(storedValue);
      setTitle(parsedData.name);
      setAmount(parsedData.price);
      setCommission((parseFloat(parsedData.price) * 0.05).toFixed(2));
    }
  };

  const handleDrag = (event, data) => {
    const draggableRect = event.target.getBoundingClientRect();
    const backgroundRect = document
      .querySelector(".background-image")
      .getBoundingClientRect();

    if (
      draggableRect.left < backgroundRect.right &&
      draggableRect.right > backgroundRect.left &&
      draggableRect.top < backgroundRect.bottom &&
      draggableRect.bottom > backgroundRect.top
    ) {
      setSelectedColor(selectedColor);
    } else {
      setSelectedColor("blue");
    }
  };

  return (
    <>
      <div className="container">
        <span id="project">Create Your Product</span>
        <hr id="hr1" />
        <div className="gap">
          <span>Product Style</span>
          <br />
          <span>Basic</span>
        </div>
        <div className="clothes">
          <div onClick={inputON} className="first-border">
            <img id="forModal" src={TShirt} alt="T-Shirt" />
          </div>
          <div onClick={inputOFFe} className="second-border">
            <img id="forModal" src={Pants} alt="Pants" />
          </div>
          <div onClick={inputOFFo} className="third-border">
            <img id="forModal" src={Combo} alt="Combo" />
          </div>
        </div>
        <hr />
        <div className="gap">
          <span>Choose Product Color</span>
          <br />
          <span>Select multiple background colors to offer</span>
        </div>
        <div className="select-all">
          <input name="select" type="checkbox" />
          <label htmlFor="select">Select All</label>
        </div>
        <div className="colors">
          {colors.map((col, index) => (
            <div
              onClick={() => handleAdd(col)}
              key={index}
              className={col}
            ></div>
          ))}
        </div>
        <hr />
        <div className="gap">
          <span>Product Sizing</span>
          <br />
          <span>Select multiple sizes to offer</span>
        </div>
        <div className="radios">
          {["S", "M", "L", "XL", "XXL", "3XL", "4XL"].map((size) => (
            <label key={size}>
              <input name="size" type="radio" value={size} />
              {size}
            </label>
          ))}
        </div>
        <hr />
        <div className="gap">
          <span>Product Details</span>
          <br />
          <span>Enter a product title</span>
          <div className="second-inputs">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="inp1"
              type="text"
              maxLength={7}
              disabled={inp}
            />
            <input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              id="inp2"
              type="text"
              placeholder="Size"
              disabled={inp}
            />
            <input
              value={color}
              onChange={handleColorChange}
              id="inp2"
              type="color"
              disabled={inp}
            />
          </div>
        </div>
        <hr />
        <span>Set Your Retail Price</span>
        <br />
        <input
          value={amount}
          onChange={handleAmountChange}
          id="inp3"
          name="euro"
          type="number"
        />
        <label htmlFor="euro">€</label>
        <br />
        <span>Комиссия: {commission} тг</span>
        <br />
        <br />
        <div className="buttons">
          <button onClick={handleOpen}>Add image</button>
          <button onClick={handleSave}>Continue & Save</button>
          <button onClick={handleLastSave}>Last Save</button>
        </div>
      </div>
      <div className="modal">
        <Draggable
          position={position}
          onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
        >
          <h1
            ref={titleRef}
            style={{
              fontSize: `${size}px`,
              color: color,
              position: "absolute",
              cursor: "grab",
              userSelect: "none",
            }}
            id="title"
          >
            {title}
          </h1>
        </Draggable>
        <div
          style={{ backgroundColor: selectedColor }}
          className="background-image"
        >
          {component}
        </div>
        {selectedColor && (
          <div className="selected-color">
            <div className="colors">
              <Draggable onDrag={handleDrag}>
                <p
                  style={{
                    backgroundColor: `${selectedColor}`,
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                  id="selected"
                >
                  .
                </p>
              </Draggable>
            </div>
          </div>
        )}
        {showModal && (
          <div className="image-modal">
            <span onClick={handleClose} id="exit-modal">
              X
            </span>
            <div className="icons">
              <div className="first-column">
                <Draggable>
                  <img id="icon-column" src={customOne} alt="Custom 1" />
                </Draggable>
                <Draggable>
                  <img id="icon-column" src={customTwo} alt="Custom 2" />
                </Draggable>
                <Draggable>
                  <img id="icon-column" src={customThree} alt="Custom 3" />
                </Draggable>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

// import React, { useState } from 'react';
// import Draggable from 'react-draggable';

// const App = () => {
//   const [objectColor, setObjectColor] = useState('black');
//   const [selectedColor, setSelectedColor] = useState('red');

//   const handleDrag = (event, data) => {
//     const draggableRect = event.target.getBoundingClientRect();
//     const objectRect = document.querySelector('.object').getBoundingClientRect();

//     if (
//       draggableRect.left < objectRect.right &&
//       draggableRect.right > objectRect.left &&
//       draggableRect.top < objectRect.bottom &&
//       draggableRect.bottom > objectRect.top
//     ) {
//       setObjectColor(selectedColor);
//     } else {
//       setObjectColor('black');
//     }
//   };

//   const handleColorChange = (color) => {
//     setSelectedColor(color);
//   };

//   const colors = ['red', 'yellow', 'green', 'blue', 'pink'];

//   return (
//     <div>
//       <div className="object" style={{ backgroundColor: objectColor }}>
//         {/* Объект */}
//         <div style={{ width: 100, height: 100 }}></div>
//       </div>

//       <div className="colors">
//         {colors.map((color) => (
//           <Draggable key={color} onDrag={handleDrag}>
//             <p
//               style={{
//                 backgroundColor: color,
//                 width: '50px',
//                 height: '50px',
//                 borderRadius: '50%',
//                 cursor: 'pointer',
//               }}
//               onClick={() => handleColorChange(color)}
//             >
//               .
//             </p>
//           </Draggable>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;
