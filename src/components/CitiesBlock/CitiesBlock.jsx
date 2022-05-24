import PropTypes from "prop-types";
import CitiesList from "./CitiesList/CitiesList";

import BigButton from "../common/BigButton/BigButton";
import Modal from "../common/Modal/Modal";
import { HiPlusCircle } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { BsFillHandIndexThumbFill } from "react-icons/bs";
import { Component } from "react";
import s from "./CitiesBlock.module.css";
import DeleteCard from "../common/DeleteCard/DeleteCard";
import CitiesForm from "./CitiesForm/CitiesForm";
import EditCard from "../common/EditCard/EditCard";
import Filter from "../Filter/Filter";

class CitiesBlock extends Component {
  static propTypes = {
    cities: PropTypes.array,
  };

  state = {
    cities: this.props.cities,
    activeCity: "",
    filter: "",
    isDeleteModalOpen: false,
    isAddFormOpen: false,
    isEditModalOpen: false,
  };

  // OPEN \/ CLOSE FORM

  handlerOpenForm = () => {
    this.setState((prevState) => ({
      isAddFormOpen: !prevState.isAddFormOpen,
    }));
  };
  closeModal = () => this.setState({ isDeleteModalOpen: false });

  // ADD CITY
  addNewCity = (newCity) => {
    const someCity = this.state.cities.some((item) => item === newCity);

    this.setState((prevState) => ({
      cities: someCity ? prevState.cities : [...prevState.cities, newCity],
    }));
    console.log(newCity);
  };

  //EDIT CITY
  handleStartEditting = (activeCity) => {
    this.setState({
      isEditModalOpen: true,
      activeCity,
    });
  };
  saveEditCity = (editCity) => {
    const { activeCity } = this.state;
    this.setState((prevState) => ({
      cities: prevState.cities.map((city) =>
        activeCity === city ? editCity : city
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
      isDeleteModalOpen: true,
    });
  };
  onDeleteCity = () => {
    const { activeCity } = this.state;

    this.setState((prevState) => ({
      cities: prevState.cities.filter((city) => city !== activeCity),
      activeCity: "",
    }));
  };

  render() {
    const {
      cities,
      filter,
      isAddFormOpen,
      isDeleteModalOpen,
      activeCity,
      isEditModalOpen,
    } = this.state;

    const filterCities = this.getFilteredCities();

    return (
      <div className={s.cities__block}>
        <Filter
          onFilter={this.handlerFilterChangeInput}
          value={filter}
          label="Поиск города:"
          placeholder="Введите название города ..."
        />
        <CitiesList
          cities={filterCities}
          onDeleteCity={this.handleStartDeleteCity}
          onModalCityOpen={isDeleteModalOpen}
          onOpenEditCityModal={this.handleStartEditting}
        />
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

        {isEditModalOpen && (
          <Modal
            icon={<FaEdit />}
            onClose={this.closeModal}
            onCloseEditModal={this.closeEditModal}
            title="Редактировать информацию о городах"
          >
            <EditCard activeCity={activeCity} onSubmit={this.saveEditCity} />
          </Modal>
        )}

        {isDeleteModalOpen && (
          <Modal
            icon={<BsFillHandIndexThumbFill />}
            onClose={this.closeModal}
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
