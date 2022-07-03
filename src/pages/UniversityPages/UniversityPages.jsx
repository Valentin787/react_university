import React from "react";
import CitiesBlock from "../../components/CitiesBlock/CitiesBlock";
import DepartmentsBlock from "../../components/DepartmentsBlock/DepartmentsBlock";
import Header from "../../components/Header/Header";
import Section from "../../components/Section/Section";
import TutorsBlock from "../../components/TutorsBlock/TutorsBlock";
import UniversityBlock from "../../components/UniversityBlock/UniversityBlock";
import { ReactComponent as Teacher } from "../../images/iconfinder-499-student-education-graduate-learning-4212915_114945.svg";
import { ReactComponent as CityIcon } from "../../images/1-01_icon-icons.com_68873.svg";
import { ReactComponent as DepartmentIcon } from "../../images/bag.svg";

const UniversityPages = ({ name, description, cities, department }) => {
  return (
    <>
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
    </>
  );
};

export default UniversityPages;
