import React from "react"; 
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import EditProduct from "./components/edit.component"
import CreateProduct from "./components/create.component"
import ProductList from "./components/list.component"




function App() {
  return (
    <Router>
       <Navbar/>
       <div className="content container" style={{ marginTop: "80px" }}>
         <Routes>
           <Route path="/product/create" element={<CreateProduct/>}></Route>
           <Route path="/product/edit/:id" element={<EditProduct/>}></Route>
           <Route path="/" element={<ProductList/>}></Route>

         </Routes>
       </div>
       
    </Router>
       
  );
}

export default App;

