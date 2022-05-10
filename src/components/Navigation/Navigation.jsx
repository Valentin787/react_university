import { navConfig } from "../../data/navigation";
import NavItem from "./NavItem/NavItem";

const Navigation = () => {
  return (
    <nav>
      {navConfig.map(({ name, icon }) => (
        <NavItem key={name} name={name} icon={icon} />
      ))}
    </nav>
  );
};

export default Navigation;
