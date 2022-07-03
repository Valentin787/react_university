import { useState, useRef } from "react";
import { useContext } from "react";
import { ThemeContext, themes } from "../../components/context/themeContext";
import { Link, Switch, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useOutsideClickDetector from "../../hooks/useOutsideClickDetector.js";
import useToggle from "../../hooks/useToggle";
import { HiMenu } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import s from "./CardWithMenu.module.css";

const CardWithMenu = ({ text, onOpenEditModal, onDeleteModal, link, id }) => {
  // const [department, setDepartment] = useState([]);

  const location = useLocation();

  // use

  //USE_CONTEXT
  const { theme } = useContext(ThemeContext);
  //USE_REF
  const cardRef = useRef(null);

  // CUSTOM HOOK USE_TOGGLE

  const [isOpen, toggleMenu] = useToggle(false);

  //ПЕРЕДАЄМ В ЯКОСТІ АРГУМЕНТІВ КАСТОМНОМУ ХУКУ ДАННІ

  useOutsideClickDetector(cardRef, toggleMenu, isOpen);

  ///////
  // const [isOpenMenu, setIsOpenMenu] = useState(false);
  // const togglemMenu = () => setIsOpenMenu((prevState) => !prevState);

  const handleEdit = () => {
    onOpenEditModal();
    toggleMenu();
  };

  const handleDelete = () => {
    onDeleteModal();
    toggleMenu();
  };

  const textColor = theme === themes.light ? s.textLight : s.textDark;

  return (
    <div ref={cardRef} className={s.wrap}>
      <div className={s.item}>
        {link && (
          <Link
            className={theme === themes.light ? s.textLight : s.textDark}
            to={{
              pathname: `${link}/${id}`,
              state: {
                from: location,
              },
            }}
          >
            <p>{text}</p>
          </Link>
        )}

        {!link && <p>{text}</p>}
        <button
          onClick={toggleMenu}
          className={theme === themes.light ? s.buttonLight : s.buttonDark}
        >
          <HiMenu />
        </button>
      </div>

      {isOpen && (
        <div
          className={theme === themes.light ? s.menuWrapLight : s.menuWrapDark}
        >
          <div onClick={handleEdit} className={s.itemContainer}>
            <span className={s.svgWrap}>
              <FaRegEdit fontSize="20px" color="#ff6b0a" />
            </span>
            <span className={textColor}>Редактировать</span>
          </div>
          <div onClick={handleDelete} className={s.itemContainer}>
            <span className={s.svgWrap}>
              <MdDeleteForever fontSize="22px" color="#ff6b0a" />
            </span>
            <span className={textColor}>Удалить</span>
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
  link: PropTypes.string,
  id: PropTypes.string,
};

export default CardWithMenu;
