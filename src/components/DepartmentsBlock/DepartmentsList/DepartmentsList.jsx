import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext, themes } from "../../../components/context/themeContext";
import { useRouteMatch } from "react-router-dom";

import Paper from "../../common/Paper/Paper";
import s from "./DepartmentsList.module.css";
import CardWithMenu from "../../CardWithMenu/CardWithMenu";

const DepartmentsList = ({
  department,
  onDeleteDepartment,
  onOpenModalDelete,
  onOpenEditDepartmentModal,
  onEditModalOpen,
}) => {
  //USE_CONTEXT

  const { theme } = useContext(ThemeContext);

  return (
    <ul className={s.list}>
      {department.map((item) => (
        <li
          className={theme === themes.light ? s.itemLight : s.itemDark}
          key={item.id}
        >
          <Paper>
            <CardWithMenu
              text={item.name}
              onDeleteModal={() => onDeleteDepartment(item)}
              onOpenModalDelete={onOpenModalDelete}
              onOpenEditModal={() => onOpenEditDepartmentModal(item)}
              onEditModalOpen={onEditModalOpen}
              link={"/departments"}
              id={item.id}
            />
          </Paper>
        </li>
      ))}
    </ul>
  );
};

DepartmentsList.propTypes = {
  department: PropTypes.array.isRequired,
  onDeleteDepartment: PropTypes.func,
  onOpenModalDelete: PropTypes.string,
  onOpenEditDepartmentModal: PropTypes.func,
};

export default DepartmentsList;
