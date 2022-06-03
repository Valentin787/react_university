import PropTypes from "prop-types";
import { Component } from "react";
import CitiesList from "./CitiesList/CitiesList";
import Skeleton from "../common/Skeleton/Skeleton";
import Loader from "../common/Loader/Loader";
import BigButton from "../common/BigButton/BigButton";
import DeleteCard from "../common/DeleteCard/DeleteCard";
import Modal from "../common/Modal/Modal";
import EditCard from "../common/EditCard/EditCard";
import CitiesForm from "./CitiesForm/CitiesForm";
import Filter from "../Filter/Filter";
import * as api from "../../services/api";
import * as storage from "../../services/localStorage";
import { HiPlusCircle } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { BsFillHandIndexThumbFill } from "react-icons/bs";
import { toast } from "react-toastify";
import s from "./CitiesBlock.module.css";

const STORAGE_KEY = "cities";
const API_ENDPOINT = "cities";

const ACTION = {
  NONE: "none",
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
};

class CitiesBlock extends Component {
  static propTypes = {
    cities: PropTypes.array,
  };

  state = {
    cities: [],
    activeCity: null,
    filter: "",
    newCity: null,
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
    // LOCAL STORAGE
    // const citiesArr = localStorage.getItem("cities");
    // const citiesArrParse = JSON.parse(citiesArr)
    // if (citiesArrParse) {
    //   this.setState({cities:citiesArrParse})
    // }
    // const savedCities = storage.get(STORAGE_KEY);
    // if (savedCities) {
    //   this.setState({ cities: savedCities });
    // }
    this.setState({
      firstLoading: true,
    });
    this.fetchCity().finally(() => this.setState({ firstLoading: false }));
  }
  componentDidUpdate(prevProps, prevState) {
    const { action } = this.state;

    // if (newCity !== null && prevState.newCity !== newCity) {
    //   this.addNewCity()
    // }
    if (prevState.action !== action) {
      if (action === ACTION.ADD) {
        this.addNewCity();
        return;
      }
      if (action === ACTION.EDIT) {
        this.saveEditCity();
        return;
      }
      if (action === ACTION.DELETE) {
        this.onDeleteCity();
        return;
      }
    }

    // LOCAL STORAGE
    // if (prevState.cities !== cities) {
    //   // return localStorage.setItem("cities", JSON.stringify(this.state.cities))
    //   return storage.save("cities", cities);
    // }
  }

  // GET CITIES

  fetchCity = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const cities = await api.getData(API_ENDPOINT);
      this.setState({ cities });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  // OPEN \/ CLOSE FORM

  handlerOpenForm = () => {
    this.setState((prevState) => ({
      isAddFormOpen: !prevState.isAddFormOpen,
    }));
  };

  closeModal = () =>
    this.setState({
      openModal: ACTION.NONE,
      activeCity: "",
    });

  // ADD CITY
  confirmAdd = (newCity) => {
    this.setState({
      action: ACTION.ADD,
      activeCity: {
        name: newCity,
      },
    });
  };
  addNewCity = async () => {
    this.setState({ loading: true, error: null });

    const { activeCity } = this.state;

    const someCity = this.state.cities.some(
      ({ name }) => name === activeCity.name
    );

    try {
      if (!someCity) {
        const savedCity = await api.saveItem(API_ENDPOINT, activeCity);

        this.setState((prevState) => ({
          cities: someCity
            ? prevState.cities
            : [...prevState.cities, savedCity],
          isAddFormOpen: false,
          activeCity: null,
        }));
        toast.success(
          `Город ${savedCity.name.toUpperCase()} успешно добавлен !!`
        );
      }
      this.setState({
        isAddFormOpen: false,
        activeCity: null,
      });

      if (someCity) {
        toast.warning(
          `Город с названием ${activeCity.name.toUpperCase()} уже существует`
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
  };

  //EDIT CITY
  handleStartEditting = (activeCity) => {
    this.setState({
      openModal: ACTION.EDIT,
      activeCity,
    });
  };

  confirmEdit = (editedCityName) => {
    const { activeCity } = this.state;

    if (editedCityName === activeCity.name) {
      this.setState({
        openModal: ACTION.NONE,
        activeCity: null,
      });
      return;
    }
    this.setState({
      action: ACTION.EDIT,
      activeCity: { ...activeCity, name: editedCityName },
    });
    // console.log(editedCityName);
  };

  saveEditCity = async () => {
    this.setState({ loading: true, error: null });

    const { activeCity } = this.state;

    try {
      const updatedCity = await api.editItem(API_ENDPOINT, activeCity);

      this.setState((prevState) => ({
        cities: prevState.cities.map((city) =>
          city.id === updatedCity.id ? updatedCity : city
        ),
      }));
      toast.success(
        `Город ${updatedCity.name.toUpperCase()} успешно изменен !!`
      );
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(`Что-то пошло не так :(`);
    } finally {
      this.setState({
        loading: false,
        activeCity: null,
        openModal: ACTION.NONE,
        action: ACTION.NONE,
      });
      this.closeModal();
    }
  };

  // FILTER CITY
  handlerFilterChangeInput = (e) => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  getFilteredCities = () => {
    const { cities, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return cities.filter((city) =>
      city.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // DELETE CITY
  handleStartDeleteCity = (activeCity) => {
    this.setState({
      activeCity,
      openModal: ACTION.DELETE,
    });
  };

  confirmDelete = () => {
    this.setState({
      action: ACTION.DELETE,
    });
  };

  onDeleteCity = async () => {
    const { activeCity } = this.state;
    this.setState({ loading: true, error: null });
    try {
      const deletedCity = await api.deleteItem(API_ENDPOINT, activeCity.id);

      this.setState((prevState) => ({
        cities: prevState.cities.filter((city) => city.id !== deletedCity.id),
        activeCity: "",
      }));
      toast.success(
        `Город ${deletedCity.name.toUpperCase()} успешно удален !!`
      );
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(`Что-то пошло не так :(`);
    } finally {
      this.setState({
        loading: false,
        activeCity: null,
        openModal: ACTION.NONE,
      });
      this.closeModal();
    }
  };

  render() {
    const {
      cities,
      filter,
      isAddFormOpen,
      activeCity,
      openModal,
      loading,
      firstLoading,
      // isEditModalOpen,
      // isDeleteModalOpen,
    } = this.state;

    const filterCities = this.getFilteredCities();
    const noCities = !cities.length && !firstLoading;

    return (
      <div className={s.cities__block}>
        {loading && <Loader loading={loading} />}
        {cities.length > 1 && (
          <Filter
            onFilter={this.handlerFilterChangeInput}
            value={filter}
            label="Поиск города:"
            placeholder="Введите название города ..."
          />
        )}
        {noCities && <strong>No cities yet</strong>}
        {firstLoading && <Skeleton />}
        {filterCities.length > 0 && (
          <CitiesList
            cities={filterCities}
            onDeleteCity={this.handleStartDeleteCity}
            onModalCityOpen={openModal}
            onOpenEditCityModal={this.handleStartEditting}
            onEditModalOpen={openModal}
          />
        )}
        {isAddFormOpen && (
          <CitiesForm
            addNewCity={this.confirmAdd}
            cities={cities}
            name="city"
            title="Добавление города"
            placeholder="Название города..."
          />
        )}

        <BigButton
          onClickOpenForm={this.handlerOpenForm}
          text={isAddFormOpen ? "Отменить Добавление" : "Добавить город"}
          icon={!isAddFormOpen && <HiPlusCircle />}
        />

        {openModal === ACTION.EDIT && (
          <Modal
            icon={<FaEdit />}
            onClose={this.closeModal}
            // onCloseEditModal={this.closeModal}
            title="Редактировать информацию о городах"
          >
            <EditCard
              onClose={this.closeModal}
              activeCity={activeCity.name}
              onSubmit={this.confirmEdit}
            />
          </Modal>
        )}

        {openModal === ACTION.DELETE && (
          <Modal
            icon={<BsFillHandIndexThumbFill />}
            onClose={this.closeModal}
            // onCloseEditModal={this.closeModal}
            // onDeleteCity={this.onDeleteCity}
            title="Удаление города"
          >
            <DeleteCard
              onDeleteCity={this.confirmDelete}
              onClose={this.closeModal}
              text="Будут удалены все материалы и информация о городе"
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default CitiesBlock;
