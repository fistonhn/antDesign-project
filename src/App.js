import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './component/pages/Home'; 

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Home/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
