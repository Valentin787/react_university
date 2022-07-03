import { useState, useEffect, useContext } from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import { ThemeContext, themes } from "../../components/context/themeContext";

import Header from "../../components/Header/Header";
import Paper from "../../components/common/Paper/Paper";
import Loader from "../../components/common/Loader/Loader";
import * as api from "../../services/api";
import { toast } from "react-toastify";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import s from "./DepartmentsListPage.module.css";

const API_ENDPOINT = "departments";

const DepartmentsListPage = (props) => {
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstLoading, setFirstLoading] = useState(false);

  const { url } = useRouteMatch();
  const location = useLocation();

  //USE_CONTEXT

  const { theme } = useContext(ThemeContext);

  // FIRST FETCH
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      setError(null);
      setFirstLoading(true);

      try {
        const department = await api.getData(API_ENDPOINT);
        setDepartment(department);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setFirstLoading(false);
        setError(null);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <>
      <Header title="Факультеты" />
      {loading && <Loader loading={loading} />}
      <ul className={s.list}>
        {department.map((item) => (
          <li
            className={theme === themes.light ? s.itemLight : s.itemDark}
            key={item.id}
          >
            <Link
              to={{
                pathname: `${url}/${item.id}`,
                state: {
                  from: location,
                },
              }}
              className={theme === themes.light ? s.linkLight : s.linkDark}
            >
              <Paper>
                <p>{item.name}</p>
              </Paper>
            </Link>
          </li>
        ))}
      </ul>

      {/* 
      <DepartmentsList
        department={department}
        // onDeleteDepartment={handleStartDeleteDepartment}
        // onOpenModalDelete={openModal}
        // onOpenEditDepartmentModal={handleStartEditting}
        // onEditModalOpen={openModal}
      /> */}
    </>
  );
};

DepartmentsListPage.propTypes = {};

export default DepartmentsListPage;
