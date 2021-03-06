import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocalStorage } from "react-use";

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

// const STORAGE_KEY = "cities";

const API_ENDPOINT = "cities";
const FILTER_KEY = "filter";

const ACTION = {
  NONE: "none",
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
};

const CitiesBlock = (props) => {
  const [cities, setCities] = useState([]);
  const [activeCity, setActiveCity] = useState(null);
  // const [filter, setFilter] = useState(() => storage.get(FILTER_KEY) ?? "");
  const [newCity, setNewCity] = useState(null);
  const [openModal, setOpenModal] = useState(ACTION.NONE);
  const [action, setAction] = useState(ACTION.NONE);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstLoading, setFirstLoading] = useState(false);

  //CUSTOM HOOK USE_LOCAL_STORAGE

  const [filter, setFilter] = useLocalStorage(FILTER_KEY, "");

  // USEEFFECT__GET CITIES__COMPONENT DID MOUNT

  useEffect(() => {
    const fetchCity = async () => {
      setLoading(true);
      setError(null);
      try {
        const cities = await api.getData(API_ENDPOINT);
        setCities(cities);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, []);

  // OPEN \/ CLOSE FORM

  const handlerOpenForm = () => {
    setIsAddFormOpen((prevIsAddFormOpen) => !prevIsAddFormOpen);
  };

  const closeModal = () => {
    setOpenModal(ACTION.NONE);
    setActiveCity("");
  };

  // ADD CITY
  const confirmAdd = (newCity) => {
    setAction(ACTION.ADD);
    setActiveCity({ name: newCity });
  };

  useEffect(() => {
    if (action !== ACTION.ADD || !activeCity) return;

    const addNewCity = async () => {
      setLoading(true);
      setError(null);

      const someCity = cities.some(({ name }) => name === activeCity.name);

      try {
        if (!someCity) {
          const savedCity = await api.saveItem(API_ENDPOINT, activeCity);

          setCities((prevCities) =>
            someCity ? prevCities : [...prevCities, savedCity]
          );
          setIsAddFormOpen(false);

          toast.success(
            `?????????? ${savedCity.name.toUpperCase()} ?????????????? ???????????????? !!`
          );
        }

        if (someCity) {
          toast.warning(
            `?????????? ?? ?????????????????? ${activeCity.name.toUpperCase()} ?????? ????????????????????`
          );
        }
      } catch (error) {
        setError(error.message);
        toast.error(`??????-???? ?????????? ???? ?????? :(`);
      } finally {
        setLoading(false);
        setAction(ACTION.NONE);
        setActiveCity(null);

        closeModal();
      }
    };
    addNewCity();
  }, [action, activeCity, cities]);

  // EDIT CITY
  const handleStartEditting = useCallback((activeCity) => {
    setOpenModal(ACTION.EDIT);
    setActiveCity(activeCity);
  }, []);

  const confirmEdit = (editedCityName) => {
    if (editedCityName === activeCity.name) {
      closeModal();
      return;
    }
    setAction(ACTION.EDIT);
    setActiveCity({ ...activeCity, name: editedCityName });
  };
  useEffect(() => {
    if (action !== ACTION.EDIT || !activeCity) return;

    const saveEditCity = async () => {
      setLoading(true);
      setError(null);

      try {
        const updatedCity = await api.editItem(API_ENDPOINT, activeCity);

        setCities((prevCities) =>
          prevCities.map((city) =>
            city.id === updatedCity.id ? updatedCity : city
          )
        );

        toast.success(
          `?????????? ${updatedCity.name.toUpperCase()} ?????????????? ?????????????? !!`
        );
      } catch (error) {
        setError(error.message);

        toast.error(`??????-???? ?????????? ???? ?????? :(`);
      } finally {
        setAction(ACTION.NONE);
        setActiveCity(null);
        setOpenModal(ACTION.NONE);
        setLoading(false);

        closeModal();
      }
    };
    saveEditCity();
  }, [action, activeCity]);

  // FILTER CITY
  // useEffect(() => {
  //   storage.save(FILTER_KEY, filter);
  // }, [filter]);

  const handlerFilterChangeInput = (e) => {
    const { value } = e.target;
    setFilter(value);
  };
  //?????????????? ?? ?????????? USE MEMO
  const filterCities = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();

    return cities.filter((city) =>
      city.name.toLowerCase().includes(normalizedFilter)
    );
  }, [filter, cities]);

  // ?????????????? ?????? USE MEMO
  // const getFilterCities = () => {
  //   const normalizedFilter = filter.toLowerCase();

  //   return cities.filter((city) =>
  //     city.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };

  // const filterCities = getFilterCities();

  // DELETE CITY

  const handleStartDeleteCity = useCallback((activeCity) => {
    setActiveCity(activeCity);
    setOpenModal(ACTION.DELETE);
  }, []);

  const confirmDelete = () => setAction(ACTION.DELETE);

  useEffect(() => {
    if (action !== ACTION.DELETE || !activeCity) return;
    setLoading(true);
    setError(null);

    const onDeleteCity = async () => {
      try {
        const deletedCity = await api.deleteItem(API_ENDPOINT, activeCity.id);

        setCities((prevCities) =>
          prevCities.filter((city) => city.id !== deletedCity.id)
        );
        setActiveCity("");

        toast.success(
          `?????????? ${deletedCity.name.toUpperCase()} ?????????????? ???????????? !!`
        );
      } catch (error) {
        setError(error.message);
        toast.error(`??????-???? ?????????? ???? ?????? :(`);
      } finally {
        setLoading(false);
        setActiveCity(null);
        setOpenModal(ACTION.NONE);
        setAction(ACTION.NONE);

        closeModal();
      }
    };
    onDeleteCity();
  }, [action, activeCity]);

  // const filterCities = getFilteredCities();
  const noCities = !cities.length && !firstLoading;

  return (
    <div className={s.cities__block}>
      {loading && <Loader loading={loading} />}
      {cities.length > 1 && (
        <Filter
          onFilter={handlerFilterChangeInput}
          value={filter}
          label="?????????? ????????????:"
          placeholder="?????????????? ???????????????? ???????????? ..."
        />
      )}
      {noCities && <strong>No cities yet</strong>}
      {firstLoading && <Skeleton />}
      {filterCities.length > 0 && (
        <CitiesList
          cities={filterCities}
          onDeleteCity={handleStartDeleteCity}
          onModalCityOpen={openModal}
          onOpenEditCityModal={handleStartEditting}
          onEditModalOpen={openModal}
        />
      )}
      {isAddFormOpen && (
        <CitiesForm
          addNewCity={confirmAdd}
          cities={cities}
          name="city"
          title="???????????????????? ????????????"
          placeholder="???????????????? ????????????..."
        />
      )}

      <BigButton
        onClickOpenForm={handlerOpenForm}
        text={isAddFormOpen ? "???????????????? ????????????????????" : "???????????????? ??????????"}
        icon={!isAddFormOpen && <HiPlusCircle />}
      />

      {openModal === ACTION.EDIT && (
        <Modal
          icon={<FaEdit />}
          onClose={closeModal}
          // onCloseEditModal={this.closeModal}
          title="?????????????????????????? ???????????????????? ?? ??????????????"
        >
          <EditCard
            onClose={closeModal}
            activeCity={activeCity.name}
            onSubmit={confirmEdit}
          />
        </Modal>
      )}

      {openModal === ACTION.DELETE && (
        <Modal
          icon={<BsFillHandIndexThumbFill />}
          onClose={closeModal}
          // onCloseEditModal={this.closeModal}
          // onDeleteCity={this.onDeleteCity}
          title="???????????????? ????????????"
        >
          <DeleteCard
            onDeleteCity={confirmDelete}
            onClose={closeModal}
            text="?????????? ?????????????? ?????? ?????????????????? ?? ???????????????????? ?? ????????????"
          />
        </Modal>
      )}
    </div>
  );
};

export default CitiesBlock;
