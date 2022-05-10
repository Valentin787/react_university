import PropTypes from "prop-types";
import Paper from "../../common/Paper/Paper";

import { HiOutlineMenu } from "react-icons/hi";
import s from "./DepartmentsList.module.css";

const DepartmentsList = ({ department }) => {
  return (
    <ul className={s.list}>
      {department.map(({ name }, index) => (
        <li className={s.item__list} key={index + 1}>
          <Paper>
            <div className={s.item}>
              <p>{name}</p>
              <button className={s.button}>
                <HiOutlineMenu />
              </button>
            </div>
          </Paper>
        </li>
      ))}
    </ul>
  );
};

DepartmentsList.propTypes = {
  department: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
};

export default DepartmentsList;
