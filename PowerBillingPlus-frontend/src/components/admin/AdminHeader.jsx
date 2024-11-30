import "./AdminHeader.css";
// import { useState } from "react";

const AdminHeader = () => {
  function darkMode() {
    let element = document.body;
    let content = document.getElementById("DarkModetext");
    element.className = "dark-mode";
    content.innerText = "Dark Mode is ON";
  }
//   function lightMode() {
//     let element = document.body;
//     let content = document.getElementById("DarkModetext");
//     element.className = "light-mode";
//     content.innerText = "Dark Mode is OFF";
//   }

  return (
    // const [darkMode, setDarkMode] = useState("");

    <div>
      <p>Light mode</p>
      <label className="switch">
        <input type="checkbox" onChange={darkMode} />
        {/* <input type="checkbox" onChange={lightMode} /> */}
        <span className="slider round"></span>
      </label>
      <p>Dark mode</p>

      {/* <h3 id="DarkModetext">Dark Mode is OFF</h3>
      <button onClick={darkMode}>Darkmode</button>
      <button onClick={lightMode}>LightMode</button> */}
    </div>
  );
};

export default AdminHeader;
