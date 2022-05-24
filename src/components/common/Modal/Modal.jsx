import React, { Component } from "react";
import PropTypes from "prop-types";
import { RiCloseCircleFill } from "react-icons/ri";

import s from "./Modal.module.css";

class Modal extends Component {
  render() {
    const { title, icon, children, onClose, onCloseEditModal } = this.props;
    return (
      <div onClick={onClose} className={s.backdrop}>
        <div className={s.modal}>
          <header className={s.header}>
            <button
              onClick={onClose && onCloseEditModal}
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
      </div>
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
