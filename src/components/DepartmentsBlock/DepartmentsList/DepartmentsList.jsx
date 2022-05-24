import PropTypes from "prop-types";
import Paper from "../../common/Paper/Paper";
import s from "./DepartmentsList.module.css";
import CardWithMenu from "../../CardWithMenu/CardWithMenu";

const DepartmentsList = ({
  department,
  onDeleteDepartment,
  isOpenModal,
  onOpenEditDepartmentModal,
}) => {
  return (
    <ul className={s.list}>
      {department.map((item, index) => (
        <li className={s.item__list} key={index + 1}>
          <Paper>
            <CardWithMenu
              text={item}
              onDeleteDepartment={() => onDeleteDepartment(item)}
              isOpenModal={isOpenModal}
              onOpenEditDepartmentModal={() => onOpenEditDepartmentModal(item)}
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
  isOpenModal: PropTypes.bool,
  onOpenEditDepartmentModal: PropTypes.func,
};

export default DepartmentsList;
