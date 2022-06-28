// import React, { Component } from "react";
import React, { useEffect } from "react";
import { useLockBodyScroll, useToggle } from "react-use";

// MODAL
import { createPortal } from "react-dom";
////
import PropTypes from "prop-types";
import { RiCloseCircleFill } from "react-icons/ri";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ title, icon, children, onClose }) => {
  useLockBodyScroll(true);

  useEffect(() => {
    const handlerKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handlerKeyDown);

    return () => {
      window.removeEventListener("keydown", handlerKeyDown);
    };
  }, [onClose]);

  const handlerBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handlerBtnCloseClick = () => {
    onClose();
  };

  return createPortal(
    <div onClick={handlerBackdropClick} className={s.backdrop}>
      <div className={s.modal}>
        <header className={s.header}>
          <button
            onClick={handlerBtnCloseClick}
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
};

Modal.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  children: PropTypes.node,
  onClose: PropTypes.func,
  onCloseEditModal: PropTypes.func,
};

export default Modal;

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handlerKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handlerKeyDown);
//   }
//   handlerKeyDown = (e) => {
//     if (e.code === "Escape") {
//       this.props.onClose();
//       // this.props.onCloseEditModal()
//     }
//   };
//   handlerBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//       // this.props.onCloseEditModal()
//     }
//   };
//   handlerBtnCloseClick = () => {
//     this.props.onClose();
//     // this.props.onCloseEditModal()
//   };

//   render() {
//     const {
//       title,
//       icon,
//       children,
//       // onClose,
//       // onCloseEditModal,
//     } = this.props;

//     return createPortal(
//       <div onClick={this.handlerBackdropClick} className={s.backdrop}>
//         <div className={s.modal}>
//           <header className={s.header}>
//             <button
//               onClick={this.handlerBtnCloseClick}
//               name="closeBtn"
//               className={s.closeBtn}
//             >
//               <span className={s.svgBtnClose}>
//                 <RiCloseCircleFill />
//               </span>
//             </button>
//           </header>

//           <div className={s.content}>
//             <div className={s.lead}>
//               <span className={s.imageWrap}>{icon}</span>
//               <header className="heading">{title.toUpperCase()}</header>
//             </div>
//             {children}
//           </div>
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

// export default Modal;
