import React, { Component } from "react";
// import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { HiMenu } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import s from "./CardWithMenu.module.css";

// const menuModal = document.querySelector("#menu-modal")
// console.log(menuModal);

class CardWithMenu extends Component {
  state = {
    isOpenMenu: false,
  };

  handleClick = () => {
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
  };

  handleEdit = () => {
    this.props.onOpenEditModal();
    this.handleClick();
  };

  handleDelete = () => {
    this.props.onDeleteModal();
    this.handleClick();
  };
  //  handleDeleteDepartment = () => {
  //   this.props.onDeleteDepartment()
  //   this.handleClick()
  // }

  render() {
    const {
      text,
      // // onDeleteCity,
      // onDeleteDepartment,
      // onOpenModalDelete,
      // // onModalCityOpen,
      // // onOpenEditCityModal,
      // onOpenEditDepartmentModal,
      // onEditModalOpen
    } = this.props;

    const { isOpenMenu } = this.state;

    return (
      <div className={s.wrap}>
        <div className={s.item}>
          <p>{text}</p>
          <button onClick={this.handleClick} className={s.button}>
            <HiMenu />
          </button>
        </div>

        {isOpenMenu && (
          <div className={s.menuWrap}>
            <div onClick={this.handleEdit} className={s.itemContainer}>
              <span className={s.svgWrap}>
                <FaRegEdit fontSize="20px" color="#ff6b0a" />
              </span>
              <span>Редактировать</span>
            </div>
            <div onClick={this.handleDelete} className={s.itemContainer}>
              <span className={s.svgWrap}>
                <MdDeleteForever fontSize="22px" color="#ff6b0a" />
              </span>
              <span>Удалить</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

CardWithMenu.propTypes = {
  text: PropTypes.string,
  onDeleteModal: PropTypes.func,
  onOpenEditModal: PropTypes.func,

  onEditModalOpen: PropTypes.string,
  onOpenModalDelete: PropTypes.string,
  onModalCityOpen: PropTypes.string,
  // isOpenModal: PropTypes.bool,
};

export default CardWithMenu;
