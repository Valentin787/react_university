import PropTypes from "prop-types";

import DepartmentForm from "./DepartmentForm/DepartmentForm";
import DepartmentsList from "./DepartmentsList/DepartmentsList";
import BigButton from "../common/BigButton/BigButton";
import { HiPlusCircle } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { Component } from "react";
import Modal from "../common/Modal/Modal";
import DeleteCard from "../common/DeleteCard/DeleteCard";
import Filter from "../Filter/Filter";
import EditCard from "../common/EditCard/EditCard";

class DepartmentsBlock extends Component {
  static propTypes = {
    department: PropTypes.array,
  };

  state = {
    department: this.props.department,
    activeDepartment: "",
    filter: "",
    isDeleteModalOpen: false,
    isAddFormOpen: false,
    isEditModalOpen: false,
  };

  // OPEN \/ CLOSE FORM

  handlerOpenForm = () =>
    this.setState((prevState) => ({
      isAddFormOpen: !prevState.isAddFormOpen,
    }));

  closeModal = () => this.setState({ isDeleteModalOpen: false });

  // ADD DEPARTMENT
  addNewDepartment = (newDepartment) => {
    const someDepartment = this.state.department.some(
      (item) => item === newDepartment
    );

    this.setState((prevState) => ({
      department: someDepartment
        ? prevState.department
        : [...prevState.department, newDepartment],
    }));
    // this.setState((prevState) => ({
    //   department:[...prevState.department,newDepartment]
    // }))
  };

  //EDIT DEPARTMENT
  handleStartEditting = (activeDepartment) => {
    this.setState({
      isEditModalOpen: true,
      activeDepartment,
    });
  };
  saveEditDepartment = (editDepartment) => {
    const { activeDepartment } = this.state;

    this.setState((prevState) => ({
      department: prevState.department.map((item) =>
        activeDepartment === item ? editDepartment : item
      ),
      activeCity: "",
    }));

    this.closeEditModal();
  };
  closeEditModal = () => this.setState({ isEditModalOpen: false });

  // FILTER CITY
  handlerFilterChangeInput = (e) => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  getFilteredDepartment = () => {
    const { department, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return department.filter((item) =>
      item.toLowerCase().includes(normalizedFilter)
    );
  };

  // DELETE DEPARTMENT
  handleStartDeleteDepartment = (activeDepartment) => {
    this.setState({
      activeDepartment,
      isDeleteModalOpen: true,
    });
  };

  onDeleteDepartment = () => {
    const { activeDepartment } = this.state;

    this.setState((prevState) => ({
      department: prevState.department.filter(
        (item) => item !== activeDepartment
      ),
      activeDepartment: "",
    }));
  };

  render() {
    const {
      department,
      filter,
      activeDepartment,
      isDeleteModalOpen,
      isAddFormOpen,
      isEditModalOpen,
    } = this.state;

    const filterDepartment = this.getFilteredDepartment();
    return (
      <>
        <div>
          <Filter
            onFilter={this.handlerFilterChangeInput}
            value={filter}
            label="Поиск факультета:"
            placeholder="Введите название факультета ..."
          />
          <DepartmentsList
            department={filterDepartment}
            onDeleteDepartment={this.handleStartDeleteDepartment}
            isOpenModal={isDeleteModalOpen}
            onOpenEditDepartmentModal={this.handleStartEditting}
          />
          {isAddFormOpen && (
            <DepartmentForm
              addNewDepartment={this.addNewDepartment}
              departmentArr={department}
              name="department"
              title="Добавление факультета"
              placeholder="Название факультета..."
            />
          )}
          <BigButton
            onClickOpenForm={this.handlerOpenForm}
            text={isAddFormOpen ? "Отменить Добавление" : "Добавить факультет"}
            icon={!isAddFormOpen && <HiPlusCircle />}
          />
        </div>
        {isEditModalOpen && (
          <Modal
            icon={<FaEdit />}
            onClose={this.closeModal}
            onCloseEditModal={this.closeEditModal}
            title="Редактировать информацию о факультетах"
          >
            <EditCard
              activeDepartment={activeDepartment}
              onSubmit={this.saveEditDepartment}
            />
          </Modal>
        )}

        {isDeleteModalOpen && (
          <Modal
            onClose={this.closeModal}
            onDeletePepartment={this.onDeleteDepartment}
            title="Удаление факультета"
          >
            <DeleteCard
              onClose={this.closeModal}
              onDeleteDepartment={this.onDeleteDepartment}
              text="Будут удалены все материалы и информация о факультете"
            />
          </Modal>
        )}
      </>
    );
  }
}

DepartmentsBlock.propTypes = {
  department: PropTypes.array.isRequired,
};

export default DepartmentsBlock;
