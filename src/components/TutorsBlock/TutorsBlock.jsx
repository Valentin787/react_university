import PropTypes from "prop-types";
import Tutor from "./Tutor/Tutor";
import TutorForm from "./TutorForm/TutorForm";
import Paper from "../common/Paper/Paper";
import BigButton from "../common/BigButton/BigButton";
import { HiPlusCircle } from "react-icons/hi";

import s from "./TutorsBlock.module.css";
import { Component } from "react";

class TutorsBlock extends Component {
  state = {
    tutorsEL: this.props.tutors,
    isOpenForm: false,
  };

  handleToggleForm = () => {
    this.setState((prevState) => {
      return {
        isOpenForm: !prevState.isOpenForm,
      };
    });
  };

  addTutors = (newTutor) => {
    this.setState((prevState) => ({
      tutorsEL: [...prevState.tutorsEL, newTutor],
      isOpenForm: false,
    }));
  };

  render() {
    const { tutorsEL, isOpenForm } = this.state;

    return (
      <div className={s.tutorBlock}>
        <ul>
          {tutorsEL.map((tutor) => (
            <li className={s.itemList} key={tutor.email}>
              <Paper>
                <Tutor {...tutor} />
              </Paper>
            </li>
          ))}
        </ul>
        {isOpenForm && <TutorForm onAddTutor={this.addTutors} />}
        <BigButton
          value={isOpenForm}
          onClickForm={this.handleToggleForm}
          text={isOpenForm ? "Отменить добавление" : "Добавить преподователя"}
          icon={!isOpenForm && <HiPlusCircle />}
        />
      </div>
    );
  }
}

TutorsBlock.propTypes = {
  tutors: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      patronymic: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      city: PropTypes.string,
      options: PropTypes.string,
    }).isRequired
  ).isRequired,
};

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
