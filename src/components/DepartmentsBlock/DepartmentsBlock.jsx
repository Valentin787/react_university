import PropTypes from "prop-types";
import Paper from "../common/Paper/Paper";
import dots from "../..//images/menu_open.svg";
import DepartmentsList from "./DepartmentsList/DepartmentsList";
import BigButton from "../common/BigButton/BigButton";
import editIcon from "../../images/icon-add.png";
import { HiPlusCircle } from "react-icons/hi";

const DepartmentsBlock = ({ department }) => {
  return (
    <div>
      <DepartmentsList department={department} />
      <BigButton text="Добавить факультет" icon={<HiPlusCircle />} />
    </div>
  );
};

DepartmentsBlock.propTypes = {
  department: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
};

export default DepartmentsBlock;
