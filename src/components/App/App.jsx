import { useState } from "react";
import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";
import { ThemeContext, themes } from "../context/themeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./App.module.css";

const App = () => {
  const [theme, setTheme] = useState(themes.light);
  const toggleTheme = () =>
    setTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light
    );

  return (
    <div className={s.main__container}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Sidebar />
        <Main />
      </ThemeContext.Provider>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default App;
