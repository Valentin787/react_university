import PropTypes from "prop-types";
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
  return (
    <ul className={s.list}>
      {department.map((item, index) => (
        <li className={s.item__list} key={index + 1}>
          <Paper>
            <CardWithMenu
              text={item}
              onDeleteModal={() => onDeleteDepartment(item)}
              onOpenModalDelete={onOpenModalDelete}
              onOpenEditModal={() => onOpenEditDepartmentModal(item)}
              onEditModalOpen={onEditModalOpen}
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
