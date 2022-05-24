import React, { Component } from "react";
import PropTypes from "prop-types";
import { HiMenu } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import s from "./CardWithMenu.module.css";

class CardWithMenu extends Component {
  state = {
    isOpenMenu: false,
  };

  handleClick = () => {
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
  };

  render() {
    const {
      text,
      onDeleteCity,
      onDeleteDepartment,
      isOpenModal,
      onModalCityOpen,
      onOpenEditCityModal,
      onOpenEditDepartmentModal,
    } = this.props;

    const { isOpenMenu } = this.state;
    const closeMenu =
      isOpenModal === true || onModalCityOpen === true ? !isOpenMenu : null;

    return (
      <div className={s.wrap}>
        <div className={s.item}>
          <p>{text}</p>
          <button onClick={this.handleClick} className={s.button}>
            <HiMenu />
          </button>
        </div>
        {closeMenu === false ||
          (isOpenMenu && (
            <div className={s.menuWrap}>
              <div
                onClick={onOpenEditCityModal || onOpenEditDepartmentModal}
                className={s.itemContainer}
              >
                <span className={s.svgWrap}>
                  <FaRegEdit fontSize="20px" color="#ff6b0a" />
                </span>
                <span>Редактировать</span>
              </div>
              <div
                onClick={onDeleteCity || onDeleteDepartment}
                className={s.itemContainer}
              >
                <span className={s.svgWrap}>
                  <MdDeleteForever fontSize="22px" color="#ff6b0a" />
                </span>
                <span>Удалить</span>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

CardWithMenu.propTypes = {
  text: PropTypes.string,
  onDeleteCity: PropTypes.func,
  onDeleteDepartment: PropTypes.func,
  isOpenModal: PropTypes.bool,
};

export default CardWithMenu;
