import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";
import s from "./App.module.css";

const App = () => {
  return (
    <div className={s.main__container}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
