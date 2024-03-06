import React from "react";
import Easyheader from "./Easyheader";
import Adminpath from "./Adminpath";
import Blog from "./Blog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Readmore from "./Readmore";


function App() {
  return (
    <>
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Easyheader />}/>
          <Route path="/Admin" element={<Adminpath />} />
          <Route path="/home" element={<Easyheader/>}></Route>
          <Route path="/blog" element={<Blog/>}></Route>
          <Route path="/blog/:id" element={<Readmore />} />


          
          
        </Routes>
      </BrowserRouter> 
 
    
    </>
  );
}

export default App;
