import { string } from "prop-types";
import { useEffect, useState } from "react";
import {
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Header from "../../components/Header/Header";
import Loader from "../../components/common/Loader/Loader";
import * as api from "../../services/api";
import s from "./DepartmentPage.module.css";
import Paper from "../../components/common/Paper/Paper";
import BigButton from "../../components/common/BigButton/BigButton";

const API_ENDPOINT = "departments";

const DepartmentPage = () => {
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstLoading, setFirstLoading] = useState(false);

  const params = useParams();
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  // console.log(location.state);
  // console.log(history);

  const handlerGoBack = () => {
    console.log(`btn`);
    // alert(`btn`)
    history.push(location.state.from);
  };

  // FIRST FETCH
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      setError(null);
      setFirstLoading(true);

      try {
        const department = await api.getData(`${API_ENDPOINT}/${params.id}`);
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
  }, [params.id]);

  return (
    <>
      <Header title={department.name ? department.name : "Факультет"} />
      {loading && <Loader loading={loading} />}

      <BigButton text="Назад" onClick={handlerGoBack}></BigButton>

      <nav className={s.container}>
        <NavLink
          to={{
            pathname: `${match.url}/description`,
            state: {
              from: location.state.from,
            },
          }}
          // to={`/departments/${params.id}/description`}
          className={s.navItem}
          activeClassName={s.activeNavItem}
        >
          Описание
        </NavLink>

        <NavLink
          to={{
            pathname: `${match.url}/history`,
            state: {
              from: location.state.from,
            },
          }}
          // to={`/departments/${params.id}/history`}
          className={s.navItem}
          activeClassName={s.activeNavItem}
        >
          История
        </NavLink>
      </nav>
      <Switch>
        <Route
          path={`${match.path}/description`}
          // path={`/departments/:id/description`}
        >
          <Paper>
            <h4> Description</h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad
              nesciunt saepe eaque, natus laboriosam earum sed odit aperiam
              ipsum quibusdam quidem, harum suscipit esse vitae tempore
              cupiditate quas quod molestiae et nobis animi, voluptatum eveniet
              aliquid vero. Laudantium aspernatur temporibus mollitia itaque a
              deleniti. Dolor eligendi atque veniam quis laborum?
            </p>
          </Paper>
        </Route>
        <Route
          path={`${match.path}/history`}
          // path={`/departments/:id/history`}
        >
          <Paper>
            <h4>History</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae at, doloremque dolore modi cumque iusto reiciendis
              consectetur id autem eligendi! Voluptates hic culpa, accusamus
              sequi consequuntur amet libero sunt tempora!
            </p>
          </Paper>
        </Route>
      </Switch>
    </>
  );
};

export default DepartmentPage;
