import React, { Component } from "react";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import s from "./Sidebar.module.css";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handlerOpenSidebar = () => setIsOpen((prevIsOpen) => !prevIsOpen);
  return (
    <div className={isOpen ? s.Sidebar : s.SidebarClosed}>
      <div className={s.SidebarDecor}></div>
      <button
        onClick={handlerOpenSidebar}
        className={isOpen ? s.toggleBtnRight : s.toggleBtnRight}
        aria-label="toggleSidebar"
      >
        {isOpen ? (
          <span className={s.svgWrapLeft}>
            <MdArrowBackIosNew />
          </span>
        ) : (
          <span className={s.svgWrapRight}>
            <MdArrowForwardIos />
          </span>
        )}
      </button>
      <Navigation isActive={isOpen} />
    </div>
  );
};

export default Sidebar;

// class Sidebar extends Component {
//   state = {
//     isOpen: false,
//   };

// handlerOpenSidebar = () => {
//   this.setState((prevState) => ({
//     isOpen: !prevState.isOpen,
//   }));
// };

//   render() {
//     const { isOpen } = this.state;
//     return (
//       <div className={isOpen ? s.Sidebar : s.SidebarClosed}>
//         <div className={s.SidebarDecor}></div>
//         <button
//           onClick={this.handlerOpenSidebar}
//           className={isOpen ? s.toggleBtnRight : s.toggleBtnRight}
//           aria-label="toggleSidebar"
//         >
//           {isOpen ? (
//             <span className={s.svgWrapLeft}>
//               <MdArrowBackIosNew />
//             </span>
//           ) : (
//             <span className={s.svgWrapRight}>
//               <MdArrowForwardIos />
//             </span>
//           )}
//         </button>
//         <Navigation isActive={isOpen} />
//       </div>
//     );
//   }
// }

// Sidebar.propTypes = {};

// export default Sidebar;
