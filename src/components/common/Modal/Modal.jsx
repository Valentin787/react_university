import React, { Component } from "react";
// MODAL
import { createPortal } from "react-dom";
////
import PropTypes from "prop-types";
import { RiCloseCircleFill } from "react-icons/ri";

import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handlerKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handlerKeyDown);
  }
  handlerKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
      // this.props.onCloseEditModal()
    }
  };
  handlerBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
      // this.props.onCloseEditModal()
    }
  };
  handlerBtnCloseClick = () => {
    this.props.onClose();
    // this.props.onCloseEditModal()
  };

  render() {
    const {
      title,
      icon,
      children,
      // onClose,
      // onCloseEditModal,
    } = this.props;

    return createPortal(
      <div onClick={this.handlerBackdropClick} className={s.backdrop}>
        <div className={s.modal}>
          <header className={s.header}>
            <button
              onClick={this.handlerBtnCloseClick}
              name="closeBtn"
              className={s.closeBtn}
            >
              <span className={s.svgBtnClose}>
                <RiCloseCircleFill />
              </span>
            </button>
          </header>

          <div className={s.content}>
            <div className={s.lead}>
              <span className={s.imageWrap}>{icon}</span>
              <header className="heading">{title.toUpperCase()}</header>
            </div>
            {children}
          </div>
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  children: PropTypes.node,
  onClose: PropTypes.func,
  onCloseEditModal: PropTypes.func,
};

export default Modal;
