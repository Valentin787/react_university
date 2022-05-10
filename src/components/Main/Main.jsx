import universityInfo from "../../data/universityInfo.json";
import PropTypes from "prop-types";
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

const { name, description, tutors, cities, department } = universityInfo;

const Main = () => {
  return (
    <main className={s.main}>
      <Header title="Информация об университете" />
      <UniversityBlock name={name} descr={description} />
      <Section title="Преподователи" icon={<Teacher />}>
        <TutorsBlock tutors={tutors} />
      </Section>

      <Section title="Города" icon={<CityIcon />}>
        <CitiesBlock cities={cities} />
      </Section>

      <Section title="Факультеты" icon={<DepartmentIcon />}>
        <DepartmentsBlock department={department} />
      </Section>
    </main>
  );
};

Main.propTypes = {};

export default Main;
