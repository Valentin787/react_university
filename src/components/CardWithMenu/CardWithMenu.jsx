import { useState } from "react";
import PropTypes from "prop-types";
import { HiMenu } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import s from "./CardWithMenu.module.css";

const CardWithMenu = ({ text, onOpenEditModal, onDeleteModal }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClick = () => setIsOpenMenu((prevState) => !prevState);

  const handleEdit = () => {
    onOpenEditModal();
    handleClick();
  };

  const handleDelete = () => {
    onDeleteModal();
    handleClick();
  };

  return (
    <div className={s.wrap}>
      <div className={s.item}>
        <p>{text}</p>
        <button onClick={handleClick} className={s.button}>
          <HiMenu />
        </button>
      </div>

      {isOpenMenu && (
        <div className={s.menuWrap}>
          <div onClick={handleEdit} className={s.itemContainer}>
            <span className={s.svgWrap}>
              <FaRegEdit fontSize="20px" color="#ff6b0a" />
            </span>
            <span>Редактировать</span>
          </div>
          <div onClick={handleDelete} className={s.itemContainer}>
            <span className={s.svgWrap}>
              <MdDeleteForever fontSize="22px" color="#ff6b0a" />
            </span>
            <span>Удалить</span>
          </div>
        </div>
      )}
    </div>
  );
};

CardWithMenu.propTypes = {
  text: PropTypes.string.isRequired,
  onDeleteModal: PropTypes.func,
  onOpenEditModal: PropTypes.func,
};

export default CardWithMenu;
