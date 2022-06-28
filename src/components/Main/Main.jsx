import { useContext } from "react";
import { ThemeContext, themes } from "../../components/context/themeContext";
import universityInfo from "../../data/universityInfo.json";
import Header from "../Header/Header";
import UniversityBlock from "../UniversityBlock/UniversityBlock";
import TutorsBlock from "../TutorsBlock/TutorsBlock";
import CitiesBlock from "../CitiesBlock/CitiesBlock";
import DepartmentsBlock from "../DepartmentsBlock/DepartmentsBlock";
import s from "./Main.module.css";
import Section from "../Section/Section";

import { ReactComponent as Teacher } from "../../images/iconfinder-499-student-education-graduate-learning-4212915_114945.svg";
import { ReactComponent as CityIcon } from "../../images/1-01_icon-icons.com_68873.svg";
import { ReactComponent as DepartmentIcon } from "../../images/bag.svg";

const { name, description, cities, department } = universityInfo;

const Main = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={theme === themes.light ? s.mainLight : s.mainDark}>
      <Header title="Информация об университете" />
      <UniversityBlock name={name} descr={description} />
      <Section title="Преподователи" icon={<Teacher />}>
        <TutorsBlock />
      </Section>

      <Section title="Города" icon={<CityIcon />}>
        <CitiesBlock />
      </Section>

      <Section title="Факультеты" icon={<DepartmentIcon />}>
        <DepartmentsBlock />
      </Section>
    </main>
  );
};

Main.propTypes = {};

export default Main;
