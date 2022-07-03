import { useState } from "react";
import { useContext } from "react";
import { ThemeContext, themes } from "../../components/context/themeContext";

import useToggle from "../../hooks/useToggle";
import Navigation from "../Navigation/Navigation";
import s from "./Sidebar.module.css";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(true);

  // const toggleSidebar = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  //USE_CONTEXT
  const { theme } = useContext(ThemeContext);

  const [isOpen, toggleSidebar] = useToggle(true);

  const sidebar = theme === themes.light ? s.SidebarLight : s.SidebarDark;
  const sidebarClosed =
    theme === themes.light || isOpen
      ? s.SidebarClosedLight
      : s.SidebarClosedDark;

  return (
    <div className={isOpen ? sidebar : sidebarClosed}>
      <div
        className={
          theme === themes.light ? s.SidebarDecorLight : s.SidebarDecorDark
        }
      ></div>
      <button
        onClick={toggleSidebar}
        className={isOpen ? s.toggleBtnRight : s.toggleBtnLeft}
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
      <Navigation
      // isActive={isOpen}
      />
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
