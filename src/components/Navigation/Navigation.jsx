// import { navConfig } from "../../data/navigation";
import NavItem from "./NavItem/NavItem";
import { HiAcademicCap, HiBookOpen } from "react-icons/hi";
import PropTypes from "prop-types";

const Navigation = ({ isActive }) => {
  return (
    <nav>
      <NavItem
        key={"Факультеты"}
        name={"Факультеты"}
        icon={<HiBookOpen color="#ff6b0a" size="24px" />}
        // isActive={isActive}
        link={"/departments"}
      />
      <NavItem
        key={"Университет"}
        name={"Университет"}
        icon={<HiAcademicCap color="#ff6b0a" size="24px" />}
        // isActive={isActive}
        link={"/university"}
      />
      {/* 
      {navConfig.map(({ name, icon }) => (
        <NavItem key={name} name={name} icon={icon} isActive={isActive} />
      ))} */}
    </nav>
  );
};
Navigation.propTypes = {
  isActive: PropTypes.bool,
};

export default Navigation;
