import React from "react";
import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./App.module.css";

const App = () => {
  return (
    <div className={s.main__container}>
      <Sidebar />
      <Main />
      <ToastContainer theme="colored" />
    </div>
  );
};

export default App;
