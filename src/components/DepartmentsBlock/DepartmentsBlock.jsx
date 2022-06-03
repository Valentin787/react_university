import PropTypes from "prop-types";
import { Component } from "react";
import Skeleton from "../common/Skeleton/Skeleton";
import Loader from "../common/Loader/Loader";
import EditCard from "../common/EditCard/EditCard";
import BigButton from "../common/BigButton/BigButton";
import Modal from "../common/Modal/Modal";
import DeleteCard from "../common/DeleteCard/DeleteCard";
import DepartmentForm from "./DepartmentForm/DepartmentForm";
import DepartmentsList from "./DepartmentsList/DepartmentsList";
import Filter from "../Filter/Filter";
import * as api from "../../services/api";
import * as storage from "../../services/localStorage";
import { toast } from "react-toastify";
import { HiPlusCircle } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";

const STORAGE_KEY = "departments";
const API_ENDPOINT = "departments";

const ACTION = {
  NONE: "none",
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
};

class DepartmentsBlock extends Component {
  static propTypes = {
    department: PropTypes.array,
  };

  state = {
    department: [],
    activeDepartment: null,
    filter: "",
    newDepartment: null,

    openModal: ACTION.NONE,
    action: ACTION.NONE,
    isAddFormOpen: false,
    // isDeleteModalOpen: false,
    // isEditModalOpen: false,
    loading: false,
    error: null,
    firstLoading: false,
  };

  // COMPONENTS METHODS

  componentDidMount() {
    // const citiesArr = localStorage.getItem("cities");
    // const citiesArrParse = JSON.parse(citiesArr)
    // if (citiesArrParse) {
    //   this.setState({cities:citiesArrParse})
    // }
    // LOCAL STORAGE
    // const savedDepartments = storage.get(STORAGE_KEY);
    // if (savedDepartments) {
    //   this.setState({ department: savedDepartments });
    // }
    // FETCH API
    this.setState({
      firstLoading: true,
    });
    this.fetchDepartments().finally(() =>
      this.setState({ firstLoading: false })
    );
  }
  componentDidUpdate(prevProps, prevState) {
    const { action } = this.state;

    if (prevState.action !== action) {
      if (action === ACTION.ADD) {
        this.addNewDepartment();
        return;
      }
      if (action === ACTION.EDIT) {
        this.saveEditDepartment();
        return;
      }
      if (action === ACTION.DELETE) {
        this.onDeleteDepartment();
        return;
      }
    }

    // if (newDepartment !== null && prevState.newDepartment !== newDepartment) {
    //   this.addNewDepartment()

    //   // LOCAL STORAGE
    //   // return localStorage.setItem("cities", JSON.stringify(this.state.cities))
    //   // return storage.save(STORAGE_KEY, department);
    // }
  }

  // GET DEPARTMENTS

  fetchDepartments = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const department = await api.getData(API_ENDPOINT);
      this.setState({ department });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  // OPEN \/ CLOSE FORM

  handlerOpenForm = () =>
    this.setState((prevState) => ({
      isAddFormOpen: !prevState.isAddFormOpen,
    }));

  closeModal = () =>
    this.setState({
      openModal: ACTION.NONE,
      activeDepartment: "",
    });

  // ADD DEPARTMENT
  confirmAdd = (newDepartment) => {
    this.setState({
      action: ACTION.ADD,
      activeDepartment: {
        name: newDepartment,
      },
    });
  };
  addNewDepartment = async () => {
    this.setState({ loading: true });
    const { activeDepartment } = this.state;

    const someDepartment = this.state.department.some(
      (item) => item.name === activeDepartment.name
    );

    try {
      if (!someDepartment) {
        const savedDepartment = await api.saveItem(
          API_ENDPOINT,
          activeDepartment
        );

        this.setState((prevState) => ({
          department: someDepartment
            ? prevState.department
            : [...prevState.department, savedDepartment],
          isAddFormOpen: false,
          activeDepartment: null,
        }));
        toast.success(
          `Факультет ${savedDepartment.name.toUpperCase()} успешно добавлен !!`
        );
      }
      this.setState({
        isAddFormOpen: false,
        activeDepartment: null,
      });
      if (someDepartment) {
        toast.warning(
          `Город с названием ${activeDepartment.name.toUpperCase()} уже существует`
        );
      }
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(`Что-то пошло не так :(`);
    } finally {
      this.setState({
        loading: false,
        action: ACTION.NONE,
      });
      this.closeModal();
    }

    // this.setState((prevState) => ({
    //   department: someDepartment
    //     ? prevState.department
    //     : [...prevState.department, newDepartment],
    //   isAddFormOpen: false,
    // }));
    // this.setState((prevState) => ({
    //   department:[...prevState.department,newDepartment]
    // }))
  };

  //EDIT DEPARTMENT
  handleStartEditting = (activeDepartment) => {
    this.setState({
      openModal: ACTION.EDIT,
      // isEditModalOpen: true,
      activeDepartment,
    });
  };
  confirmEdit = (editedDepartmentName) => {
    const { activeDepartment } = this.state;

    if (editedDepartmentName === activeDepartment.name) {
      this.setState({
        openModal: ACTION.NONE,
        activeDepartment: null,
      });
      return;
    }
    this.setState({
      action: ACTION.EDIT,
      activeDepartment: { ...activeDepartment, name: editedDepartmentName },
    });
    // console.log(editedCityName);
  };
  saveEditDepartment = async () => {
    this.setState({ loading: true, error: null });

    const { activeDepartment } = this.state;

    try {
      const updatedDepartment = await api.editItem(
        API_ENDPOINT,
        activeDepartment
      );

      this.setState((prevState) => ({
        department: prevState.department.map((item) =>
          item.id === updatedDepartment.id ? updatedDepartment : item
        ),
      }));
      toast.success(
        `Город ${updatedDepartment.name.toUpperCase()} успешно изменен !!`
      );
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(`Что-то пошло не так :(`);
    } finally {
      this.setState({
        loading: false,
        activeDepartment: null,
        openModal: ACTION.NONE,
        action: ACTION.NONE,
      });
      this.closeModal();
    }
    // this.setState((prevState) => ({
    //   department: prevState.department.map((item) =>
    //     activeDepartment === item ? editDepartment : item
    //   ),
    //   activeDepartment: "",
    // }));

    // this.closeModal();
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
      item.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // DELETE DEPARTMENT
  handleStartDeleteDepartment = (activeDepartment) => {
    this.setState({
      activeDepartment,
      openModal: ACTION.DELETE,
      // isDeleteModalOpen: true,
    });
  };

  confirmDelete = () => {
    this.setState({
      action: ACTION.DELETE,
    });
  };

  onDeleteDepartment = async () => {
    const { activeDepartment } = this.state;
    this.setState({ loading: true, error: null });
    try {
      const deletedDepartment = await api.deleteItem(
        API_ENDPOINT,
        activeDepartment.id
      );

      this.setState((prevState) => ({
        department: prevState.department.filter(
          (item) => item.id !== deletedDepartment.id
        ),
        activeDepartment: "",
      }));
      toast.success(
        `Город ${deletedDepartment.name.toUpperCase()} успешно удален !!`
      );
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(`Что-то пошло не так :(`);
    } finally {
      this.setState({
        loading: false,
        activeDepartment: null,
        openModal: ACTION.NONE,
      });
      this.closeModal();
    }

    // this.setState((prevState) => ({
    //   department: prevState.department.filter(
    //     (item) => item !== activeDepartment
    //   ),
    //   activeDepartment: "",
    // }));
    // this.closeModal();
  };

  render() {
    const {
      department,
      filter,
      activeDepartment,
      openModal,
      isAddFormOpen,
      loading,
      error,
      firstLoading,
      // isDeleteModalOpen,
      // isEditModalOpen,
    } = this.state;

    const filterDepartment = this.getFilteredDepartment();
    const noDepartments = !department.length && !firstLoading;
    return (
      <>
        <div>
          {loading && <Loader loading={loading} />}
          {department.length > 1 && (
            <Filter
              onFilter={this.handlerFilterChangeInput}
              value={filter}
              label="Поиск факультета:"
              placeholder="Введите название факультета ..."
            />
          )}
          {noDepartments.length && (
            <strong>Еще не записаны факультеты...</strong>
          )}
          {firstLoading && <Skeleton />}
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
              addNewDepartment={this.confirmAdd}
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
        {openModal === ACTION.EDIT && (
          <Modal
            icon={<FaEdit />}
            onClose={this.closeModal}
            // onCloseEditModal={this.closeModal}
            title="Редактировать информацию о факультетах"
          >
            <EditCard
              activeDepartment={activeDepartment.name}
              onSubmit={this.confirmEdit}
            />
          </Modal>
        )}

        {openModal === ACTION.DELETE && (
          <Modal
            onClose={this.closeModal}
            // onCloseEditModal={this.closeModal}
            // onDeletePepartment={this.onDeleteDepartment}
            title="Удаление факультета"
          >
            <DeleteCard
              onClose={this.closeModal}
              onDeleteDepartment={this.confirmDelete}
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
