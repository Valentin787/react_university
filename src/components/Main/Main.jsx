import { useContext } from "react";
import { ThemeContext, themes } from "../../components/context/themeContext";
import { Redirect, Route, Switch } from "react-router-dom";
import DepartmentsListPage from "../../pages/DepartmentsListPage/DepartmentsListPage";
import UniversityPages from "../../pages/UniversityPages/UniversityPages";
import universityInfo from "../../data/universityInfo.json";
import s from "./Main.module.css";
import DepartmentPage from "../../pages/DepartmentPage/DepartmentPage";

const { name, description, cities, department } = universityInfo;

const Main = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={theme === themes.light ? s.mainLight : s.mainDark}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/departments" />} />

        <Route exact path="/departments">
          <DepartmentsListPage />
        </Route>

        <Route path="/departments/:id">
          <DepartmentPage />
        </Route>

        <Route path="/university">
          <UniversityPages
            name={name}
            description={description}
            cities={cities}
            department={department}
          />
        </Route>
      </Switch>
    </main>
  );
};

Main.propTypes = {};

export default Main;
