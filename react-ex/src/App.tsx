//import { useState } from 'react'
import './App.css';
import './index.css';

import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import {Home} from './home';


function App() {

  return (
  <>
  <Router>
    <Routes>
     <Route path="/" element={<Home />}/>


    </Routes>
    </Router>

  </>
  );




}

export default App