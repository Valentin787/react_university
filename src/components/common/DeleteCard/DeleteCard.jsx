import React from "react";
import PropTypes from "prop-types";
import BigButton from "../BigButton/BigButton";
import s from "./DeleteCard.module.css";

const DeleteCard = ({ text, onClose, onDeleteCity, onDeleteDepartment }) => {
  return (
    <div className="">
      <p className={s.text}>{text}</p>
      <div className={s.container}>
        <button
          onClick={onDeleteCity || onDeleteDepartment}
          className={s.btnYes}
        >
          Да
        </button>
        <button onClick={onClose} className={s.btnNo}>
          Нет
        </button>
      </div>
    </div>
  );
};

DeleteCard.propTypes = {
  text: PropTypes.string,
  onClose: PropTypes.func,
  onDeleteCity: PropTypes.func,
  onDeleteDepartment: PropTypes.func,
};

export default DeleteCard;
