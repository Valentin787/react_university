import PropTypes from "prop-types";
import Tutor from "./Tutor/Tutor";
import TutorForm from "./TutorForm/TutorForm";
import Paper from "../common/Paper/Paper";
import BigButton from "../common/BigButton/BigButton";
import { HiPlusCircle } from "react-icons/hi";
import * as api from "../../services/api";
import s from "./TutorsBlock.module.css";
import { Component } from "react";
import Loader from "../common/Loader/Loader";
import ErrorMessage from "../common/ErrorMessage/ErrorMessage";
import Filter from "../Filter/Filter";
import Skeleton from "../common/Skeleton/Skeleton";

const API_ENDPOINT = "tutors";

class TutorsBlock extends Component {
  state = {
    // tutorsEL: this.props.tutors,
    tutorsEL: [],
    isOpenForm: false,
    newTutor: null,
    loading: false,
    error: null,
    filter: "",
    firstLoading: false,
  };

  controller = new AbortController();

  componentDidMount() {
    this.setState({
      firstLoading: true,
    });
    this.fetchTutors().finally(() => this.setState({ firstLoading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { newTutor } = this.state;
    if (newTutor !== null && prevState.newTutor !== newTutor) {
      this.addTutors();
    }
  }

  fetchTutors = async () => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const data = await api.getData(API_ENDPOINT);
      this.setState({ tutorsEL: data });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleToggleForm = () => {
    this.setState((prevState) => {
      return {
        isOpenForm: !prevState.isOpenForm,
      };
    });
  };

  // ADD TUTORS

  confirmAdd = (newTutor) => {
    this.setState({ newTutor });
    // this.addTutors()
  };

  addTutors = async () => {
    this.setState({ loading: true });
    const { newTutor } = this.state;
    try {
      const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);
      this.setState((prevState) => ({
        tutorsEL: [...prevState.tutorsEL, savedTutor],
        isOpenForm: false,
        newTutor: null,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  // FILTER CITY
  handlerFilterChangeInput = (e) => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  getFilteredTutors = () => {
    const { tutorsEL, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return tutorsEL.filter((tutor) =>
      tutor.lastName.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { tutorsEL, filter, isOpenForm, loading, error, firstLoading } =
      this.state;

    const filterTutors = this.getFilteredTutors();
    const noTutors = !tutorsEL.length && !firstLoading;

    return (
      <div className={s.tutorBlock}>
        {loading && <Loader loading={loading} />}
        {tutorsEL.length > 1 && (
          <Filter
            onFilter={this.handlerFilterChangeInput}
            value={filter}
            label="Поиск преподователя:"
            placeholder="Введите фамилию преподователя ..."
          />
        )}
        {noTutors && <strong> No tutors yet</strong>}
        {firstLoading && <Skeleton />}
        {filterTutors.length > 0 && (
          <ul>
            {filterTutors.map((tutor) => (
              <li className={s.itemList} key={tutor.id}>
                <Paper>
                  <Tutor {...tutor} />
                </Paper>
              </li>
            ))}
          </ul>
        )}

        {isOpenForm && <TutorForm onAddTutor={this.confirmAdd} />}

        {error && (
          <ErrorMessage
            message="Не удалось записать нового преподователя.
          Перезагрузите страницу и попробуйте снова"
          />
        )}

        <BigButton
          value={isOpenForm}
          onClickForm={this.handleToggleForm}
          text={isOpenForm ? "Отменить добавление" : "Добавить преподователя"}
          icon={!isOpenForm && <HiPlusCircle />}
          disabled={loading}
        />
      </div>
    );
  }
}

// TutorsBlock.propTypes = {
//   tutors: PropTypes.arrayOf(
//     PropTypes.shape({
//       firstName: PropTypes.string,
//       lastName: PropTypes.string,
//       patronymic: PropTypes.string,
//       phone: PropTypes.string,
//       email: PropTypes.string,
//       city: PropTypes.string,
//       options: PropTypes.string,
//     }).isRequired
//   ).isRequired,
// };

// const TutorsBlock = ({ tutors }) => {
//   return (
//     <div className={s.tutorBlock}>
//       <ul>
//         {tutors.map((tutor) => (
//           <li className={s.itemList} key={tutor.email}>
//             <Paper>
//               <Tutor {...tutor} />
//             </Paper>
//           </li>
//         ))}
//       </ul>
//       <TutorForm/>
//       <BigButton text="Добавить преподователя" icon={editIcon} />
//     </div>
//   );
// };

// TutorsBlock.propTypes = {
//   tutors: PropTypes.arrayOf(
//     PropTypes.shape({
//       firstName: PropTypes.string,
//       lastName: PropTypes.string,
//       patronymic: PropTypes.string,
//       phone: PropTypes.string,
//       email: PropTypes.string,
//       city: PropTypes.string,
//       options: PropTypes.string,
//     }).isRequired
//   ).isRequired,
// };

export default TutorsBlock;
