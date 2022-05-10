import PropTypes from "prop-types";
import Tutor from "./Tutor/Tutor";
import Paper from "../common/Paper/Paper";

import s from "./TutorsBlock.module.css";

const TutorsBlock = ({ tutors }) => {
  return (
    <div className={s.tutorBlock}>
      <ul>
        {tutors.map((tutor) => (
          <li className={s.itemList} key={tutor.email}>
            <Paper>
              <Tutor {...tutor} />
            </Paper>
          </li>
        ))}
      </ul>
    </div>
  );
};

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

export default TutorsBlock;
