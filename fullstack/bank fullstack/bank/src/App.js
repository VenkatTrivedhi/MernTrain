import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React,{useEffect, useState} from "react";
import {BrowserRouter,Routes,Route,useNavigate} from "react-router-dom";
import Login from './components/Login/Login';
import AdminDashBoard from './components/Admin/AdminDashBoard/AdminDashBoard';
import UserDashBoard from './components/User/UserDashBoard/UserDashBoard';

function  App(){
  
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/adminDashBoard/:username' element={<AdminDashBoard/>}></Route>
        <Route path='/userDashBoard/:username' element={<UserDashBoard/>}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
