import logo from "./logo.svg";
import "./App.css";
// import { ImageUpload } from "./home";
import { ImageUpload } from "./imageupload";
import { Dashboard } from "./Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <Dashboard /> } />
          <Route path="/upload" element={ <ImageUpload /> } />
        </Routes>
      </Router>
    </>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
