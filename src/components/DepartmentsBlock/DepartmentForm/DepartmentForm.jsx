import { useState } from "react";
import { useContext } from "react";
import { ThemeContext, themes } from "../../../components/context/themeContext";

import PropTypes from "prop-types";
import Paper from "../../common/Paper/Paper";
import BigButton from "../../common/BigButton/BigButton";
import s from "./DepartmentForm.module.css";

const DepartmentForm = ({
  name,
  title,
  placeholder,
  departmentArr,
  addNewDepartment,
}) => {
  const [department, setDepartment] = useState("");

  //USE_CONTEXT

  const { theme } = useContext(ThemeContext);

  const handlerSubmitForm = (e) => {
    e.preventDefault();

    addNewDepartment(department);

    setDepartment("");
  };

  const sameDepartmentName = departmentArr.includes(department);

  const isActiveBtnAdd = Object.values(department).length === 0;

  return (
    <div className={s.wrap}>
      <Paper>
        <h4 className={theme === themes.light ? s.headerLight : s.headerDark}>
          {title}
        </h4>
        <form onSubmit={handlerSubmitForm} className={s.form} action="">
          <input
            onChange={(e) => setDepartment(e.target.value)}
            name={name}
            type="text"
            placeholder={placeholder}
            value={department}
            className={s.input}
            required
          />
          {sameDepartmentName && <p>Название {department} уже существует</p>}
          <BigButton
            type="submit"
            text="Добавить"
            disabledBtnCity={isActiveBtnAdd}
          />
        </form>
      </Paper>
    </div>
  );
};

DepartmentForm.propTypes = {
  addNewCity: PropTypes.func,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  departmentArr: PropTypes.array,
};

export default DepartmentForm;
