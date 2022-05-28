import PropTypes from "prop-types";
import { Component } from "react";
import CitiesList from "./CitiesList/CitiesList";

import BigButton from "../common/BigButton/BigButton";
import DeleteCard from "../common/DeleteCard/DeleteCard";
import Modal from "../common/Modal/Modal";
import EditCard from "../common/EditCard/EditCard";
import CitiesForm from "./CitiesForm/CitiesForm";
import Filter from "../Filter/Filter";
import * as storage from "../../services/localStorage";
import { HiPlusCircle } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { BsFillHandIndexThumbFill } from "react-icons/bs";

import s from "./CitiesBlock.module.css";

const STORAGE_KEY = "cities";

const MODAL = {
  NONE: "none",
  EDIT: "edit",
  DELETE: "delete",
};

class CitiesBlock extends Component {
  static propTypes = {
    cities: PropTypes.array,
  };

  state = {
    cities: this.props.cities,
    activeCity: "",
    filter: "",
    openModal: MODAL.NONE,
    isAddFormOpen: false,
    // isDeleteModalOpen: false,
    // isEditModalOpen: false,
  };

  // COMPONENTS METHODS

  componentDidMount() {
    // const citiesArr = localStorage.getItem("cities");
    // const citiesArrParse = JSON.parse(citiesArr)
    // if (citiesArrParse) {
    //   this.setState({cities:citiesArrParse})
    // }
    const savedCities = storage.get(STORAGE_KEY);
    if (savedCities) {
      this.setState({ cities: savedCities });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { cities } = this.state;

    if (prevState.cities !== cities) {
      // return localStorage.setItem("cities", JSON.stringify(this.state.cities))
      return storage.save("cities", cities);
    }
  }

  // OPEN \/ CLOSE FORM

  handlerOpenForm = () => {
    this.setState((prevState) => ({
      isAddFormOpen: !prevState.isAddFormOpen,
    }));
  };

  closeModal = () =>
    this.setState({
      openModal: MODAL.NONE,
      activeCity: "",
    });

  // ADD CITY
  addNewCity = (newCity) => {
    const someCity = this.state.cities.some((item) => item === newCity);

    this.setState((prevState) => ({
      cities: someCity ? prevState.cities : [...prevState.cities, newCity],
    }));

    this.closeAddForm();
  };
  closeAddForm = () => {
    this.setState({ isAddFormOpen: false });
  };

  //EDIT CITY
  handleStartEditting = (activeCity) => {
    this.setState({
      openModal: MODAL.EDIT,
      activeCity,
    });
  };
  saveEditCity = (editCity) => {
    const { activeCity } = this.state;
    this.setState((prevState) => ({
      cities: prevState.cities.map((city) =>
        activeCity === city ? editCity : city
      ),
      // activeCity: "",
    }));

    this.closeModal();
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
      city.toLowerCase().includes(normalizedFilter)
    );
  };

  // DELETE CITY
  handleStartDeleteCity = (activeCity) => {
    this.setState({
      activeCity,
      openModal: MODAL.DELETE,
    });
  };
  onDeleteCity = () => {
    const { activeCity } = this.state;

    this.setState((prevState) => ({
      cities: prevState.cities.filter((city) => city !== activeCity),
      // activeCity: "",
    }));
    this.closeModal();
  };

  render() {
    const {
      cities,
      filter,
      isAddFormOpen,
      activeCity,
      openModal,
      // isEditModalOpen,
      // isDeleteModalOpen,
    } = this.state;

    const filterCities = this.getFilteredCities();

    return (
      <div className={s.cities__block}>
        {cities.length > 1 && (
          <Filter
            onFilter={this.handlerFilterChangeInput}
            value={filter}
            label="Поиск города:"
            placeholder="Введите название города ..."
          />
        )}
        {!cities.length && <strong>No cities yet</strong>}
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
            addNewCity={this.addNewCity}
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

        {openModal === MODAL.EDIT && (
          <Modal
            icon={<FaEdit />}
            onClose={this.closeModal}
            // onCloseEditModal={this.closeModal}
            title="Редактировать информацию о городах"
          >
            <EditCard
              onClose={this.closeModal}
              activeCity={activeCity}
              onSubmit={this.saveEditCity}
            />
          </Modal>
        )}

        {openModal === MODAL.DELETE && (
          <Modal
            icon={<BsFillHandIndexThumbFill />}
            onClose={this.closeModal}
            // onCloseEditModal={this.closeModal}
            onDeleteCity={this.onDeleteCity}
            title="Удаление города"
          >
            <DeleteCard
              onDeleteCity={this.onDeleteCity}
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
