import PropTypes from "prop-types";

import univerBuilding from "../../../images/building-education-school-school-icon_112987.svg";
import { ReactComponent as DeleteImage } from "../../../images/delete.svg";
import { ReactComponent as PlusImage } from "../../../images/plus.svg";

import s from "./Card.module.css";

const Card = ({ name }) => {
  const isAdmin = false;
  return (
    <div className={s.card}>
      <div className={s.imgWrapper}>
        <img src={univerBuilding} alt={name} />
      </div>
      <p className={s.text}>Университет</p>
      <h3 className={`heading ${s.wrapper}`}>{name}</h3>
      <div className={s.btn_container}>
        <button className={s.active} type="button" aria-label="Edit">
          <PlusImage />
        </button>
        <button
          disabled={!isAdmin}
          className={isAdmin ? s.active : s.disabled}
          type="button"
          aria-label="Delete"
        >
          <DeleteImage />
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Card;
