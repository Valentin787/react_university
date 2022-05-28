import PropTypes from "prop-types";
import { Component } from "react";
import EditCard from "../common/EditCard/EditCard";
import BigButton from "../common/BigButton/BigButton";
import Modal from "../common/Modal/Modal";
import DeleteCard from "../common/DeleteCard/DeleteCard";
import DepartmentForm from "./DepartmentForm/DepartmentForm";
import DepartmentsList from "./DepartmentsList/DepartmentsList";
import Filter from "../Filter/Filter";
import * as storage from "../../services/localStorage";
import { HiPlusCircle } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";

const STORAGE_KEY = "departments";

const MODAL = {
  NONE: "none",
  EDIT: "edit",
  DELETE: "delete",
};

class DepartmentsBlock extends Component {
  static propTypes = {
    department: PropTypes.array,
  };

  state = {
    department: this.props.department,
    activeDepartment: "",
    filter: "",
    isAddFormOpen: false,
    openModal: MODAL.NONE,
    // isDeleteModalOpen: false,
    isEditModalOpen: false,
  };

  // COMPONENTS METHODS

  componentDidMount() {
    // const citiesArr = localStorage.getItem("cities");
    // const citiesArrParse = JSON.parse(citiesArr)
    // if (citiesArrParse) {
    //   this.setState({cities:citiesArrParse})
    // }
    const savedDepartments = storage.get(STORAGE_KEY);
    if (savedDepartments) {
      this.setState({ department: savedDepartments });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { department } = this.state;

    if (prevState.department !== department) {
      // return localStorage.setItem("cities", JSON.stringify(this.state.cities))
      return storage.save(STORAGE_KEY, department);
    }
  }

  // OPEN \/ CLOSE FORM

  handlerOpenForm = () =>
    this.setState((prevState) => ({
      isAddFormOpen: !prevState.isAddFormOpen,
    }));

  closeModal = () =>
    this.setState({
      openModal: MODAL.NONE,
      activeDepartment: "",
    });

  // ADD DEPARTMENT
  addNewDepartment = (newDepartment) => {
    const someDepartment = this.state.department.some(
      (item) => item === newDepartment
    );

    this.setState((prevState) => ({
      department: someDepartment
        ? prevState.department
        : [...prevState.department, newDepartment],
      isAddFormOpen: false,
    }));
    // this.setState((prevState) => ({
    //   department:[...prevState.department,newDepartment]
    // }))
  };

  //EDIT DEPARTMENT
  handleStartEditting = (activeDepartment) => {
    this.setState({
      openModal: MODAL.EDIT,
      // isEditModalOpen: true,
      activeDepartment,
    });
  };
  saveEditDepartment = (editDepartment) => {
    const { activeDepartment } = this.state;

    this.setState((prevState) => ({
      department: prevState.department.map((item) =>
        activeDepartment === item ? editDepartment : item
      ),
      activeDepartment: "",
    }));

    this.closeModal();
  };
  // closeEditModal = () => this.setState({ isEditModalOpen: false });

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
      openModal: MODAL.DELETE,
      // isDeleteModalOpen: true,
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
    this.closeModal();
  };

  render() {
    const {
      department,
      filter,
      activeDepartment,
      openModal,
      isAddFormOpen,
      // isDeleteModalOpen,
      // isEditModalOpen,
    } = this.state;

    const filterDepartment = this.getFilteredDepartment();
    return (
      <>
        <div>
          {department.length > 1 && (
            <Filter
              onFilter={this.handlerFilterChangeInput}
              value={filter}
              label="Поиск факультета:"
              placeholder="Введите название факультета ..."
            />
          )}
          {!department.length && <strong>Еще не записаны факультеты...</strong>}
          {filterDepartment.length > 0 && (
            <DepartmentsList
              department={filterDepartment}
              onDeleteDepartment={this.handleStartDeleteDepartment}
              onOpenModalDelete={openModal}
              onOpenEditDepartmentModal={this.handleStartEditting}
              onEditModalOpen={openModal}
            />
          )}
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
        {openModal === MODAL.EDIT && (
          <Modal
            icon={<FaEdit />}
            onClose={this.closeModal}
            // onCloseEditModal={this.closeModal}
            title="Редактировать информацию о факультетах"
          >
            <EditCard
              activeDepartment={activeDepartment}
              onSubmit={this.saveEditDepartment}
            />
          </Modal>
        )}

        {openModal === MODAL.DELETE && (
          <Modal
            onClose={this.closeModal}
            // onCloseEditModal={this.closeModal}
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
