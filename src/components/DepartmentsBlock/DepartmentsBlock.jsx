import { useState, useEffect } from "react";
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
// import * as storage from "../../services/localStorage";
import { toast } from "react-toastify";
import { HiPlusCircle } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";

// const STORAGE_KEY = "departments";
const API_ENDPOINT = "departments";

const ACTION = {
  NONE: "none",
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
};

const DepartmentsBlock = () => {
  const [department, setDepartment] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState(null);
  const [filter, setFilter] = useState("");
  const [newDepartment, setNewDepartment] = useState(null);
  const [openModal, setOpenModal] = useState(ACTION.NONE);
  const [action, setAction] = useState(ACTION.NONE);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstLoading, setFirstLoading] = useState(false);

  // GET DEPARTMENTS__FIRSTFETCH__COMPONENT DID MOUNT

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      setError(null);
      setFirstLoading(true);

      try {
        const department = await api.getData(API_ENDPOINT);
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
  }, []);

  // OPEN \/ CLOSE FORM

  const handlerOpenForm = () =>
    setIsAddFormOpen((prevIsAddFormOpen) => !prevIsAddFormOpen);

  const closeModal = () => {
    setOpenModal(ACTION.NONE);
    setActiveDepartment("");
  };

  // ADD DEPARTMENT
  const confirmAdd = (newDepartment) => {
    setAction(ACTION.ADD);
    setActiveDepartment({ name: newDepartment });
  };

  useEffect(() => {
    if (action !== ACTION.ADD || !activeDepartment) return;

    const addNewDepartment = async () => {
      setLoading(true);
      setError(null);

      const someDepartment = department.some(
        (item) => item.name === activeDepartment.name
      );
      try {
        if (!someDepartment) {
          const savedDepartment = await api.saveItem(
            API_ENDPOINT,
            activeDepartment
          );

          setDepartment((prevDepartment) =>
            someDepartment
              ? prevDepartment
              : [...prevDepartment, savedDepartment]
          );

          setIsAddFormOpen(false);

          toast.success(
            `Факультет ${savedDepartment.name.toUpperCase()} успешно добавлен !!`
          );
        }

        setIsAddFormOpen(false);

        if (someDepartment) {
          toast.warning(
            `Город с названием ${activeDepartment.name.toUpperCase()} уже существует`
          );
        }
      } catch (error) {
        setError(error.message);
        toast.error(`Что-то пошло не так :(`);
      } finally {
        setLoading(false);
        setAction(ACTION.NONE);
        setActiveDepartment(null);

        closeModal();
      }
    };
    addNewDepartment();
  }, [action, activeDepartment, department]);

  //EDIT DEPARTMENT

  const handleStartEditting = (activeDepartment) => {
    setOpenModal(ACTION.EDIT);
    setActiveDepartment(activeDepartment);
  };
  const confirmEdit = (editedDepartmentName) => {
    if (editedDepartmentName === activeDepartment.name) {
      setOpenModal(ACTION.NONE);
      setActiveDepartment(null);
      return;
    }

    setAction(ACTION.EDIT);
    setActiveDepartment({ ...activeDepartment, name: editedDepartmentName });
  };

  useEffect(() => {
    if (action !== ACTION.EDIT || !activeDepartment) return;

    const saveEditDepartment = async () => {
      setLoading(true);
      setError(null);

      try {
        const updatedDepartment = await api.editItem(
          API_ENDPOINT,
          activeDepartment
        );

        setDepartment((prevDepartment) =>
          prevDepartment.map((item) =>
            item.id === updatedDepartment.id ? updatedDepartment : item
          )
        );

        toast.success(
          `Город ${updatedDepartment.name.toUpperCase()} успешно изменен !!`
        );
      } catch (error) {
        setError(error.message);
        toast.error(`Что-то пошло не так :(`);
      } finally {
        setLoading(false);
        setAction(ACTION.NONE);
        setActiveDepartment(null);
        setOpenModal(ACTION.NONE);

        closeModal();
      }
    };

    saveEditDepartment();
  }, [action, activeDepartment]);

  // FILTER CITY
  const handlerFilterChangeInput = (e) => setFilter(e.target.value);

  const getFilteredDepartment = () => {
    const normalizedFilter = filter.toLowerCase();

    return department.filter((item) =>
      item.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // DELETE DEPARTMENT
  const handleStartDeleteDepartment = (activeDepartment) => {
    setActiveDepartment(activeDepartment);
    setOpenModal(ACTION.DELETE);
  };

  const confirmDelete = () => setAction(ACTION.DELETE);

  useEffect(() => {
    if (action !== ACTION.DELETE || !activeDepartment) return;
    setLoading(true);
    setError(null);

    const onDeleteDepartment = async () => {
      try {
        const deletedDepartment = await api.deleteItem(
          API_ENDPOINT,
          activeDepartment.id
        );

        setDepartment((prevDepartment) =>
          prevDepartment.filter((item) => item.id !== deletedDepartment.id)
        );
        setActiveDepartment("");

        toast.success(
          `Город ${deletedDepartment.name.toUpperCase()} успешно удален !!`
        );
      } catch (error) {
        setError(error.message);
        toast.error(`Что-то пошло не так :(`);
      } finally {
        setLoading(false);
        setActiveDepartment(null);
        setError(null);
        setOpenModal(ACTION.NONE);
        setAction(ACTION.NONE);

        closeModal();
      }
    };

    onDeleteDepartment();
  }, [action, activeDepartment]);

  const filterDepartment = getFilteredDepartment();
  const noDepartments = !department.length && !firstLoading;
  return (
    <>
      <div>
        {loading && <Loader loading={loading} />}
        {department.length > 1 && (
          <Filter
            onFilter={handlerFilterChangeInput}
            value={filter}
            label="Поиск факультета:"
            placeholder="Введите название факультета ..."
          />
        )}
        {noDepartments.length && <strong>Еще не записаны факультеты...</strong>}
        {firstLoading && <Skeleton />}
        {filterDepartment.length > 0 && (
          <DepartmentsList
            department={filterDepartment}
            onDeleteDepartment={handleStartDeleteDepartment}
            onOpenModalDelete={openModal}
            onOpenEditDepartmentModal={handleStartEditting}
            onEditModalOpen={openModal}
          />
        )}
        {isAddFormOpen && (
          <DepartmentForm
            addNewDepartment={confirmAdd}
            departmentArr={department}
            name="department"
            title="Добавление факультета"
            placeholder="Название факультета..."
          />
        )}
        <BigButton
          onClickOpenForm={handlerOpenForm}
          text={isAddFormOpen ? "Отменить Добавление" : "Добавить факультет"}
          icon={!isAddFormOpen && <HiPlusCircle />}
        />
      </div>
      {openModal === ACTION.EDIT && (
        <Modal
          icon={<FaEdit />}
          onClose={closeModal}
          // onCloseEditModal={this.closeModal}
          title="Редактировать информацию о факультетах"
        >
          <EditCard
            activeDepartment={activeDepartment.name}
            onSubmit={confirmEdit}
          />
        </Modal>
      )}

      {openModal === ACTION.DELETE && (
        <Modal
          onClose={closeModal}
          // onCloseEditModal={this.closeModal}
          // onDeletePepartment={this.onDeleteDepartment}
          title="Удаление факультета"
        >
          <DeleteCard
            onClose={closeModal}
            onDeleteDepartment={confirmDelete}
            text="Будут удалены все материалы и информация о факультете"
          />
        </Modal>
      )}
    </>
  );
};

export default DepartmentsBlock;
