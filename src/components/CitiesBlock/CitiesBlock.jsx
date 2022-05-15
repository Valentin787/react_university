import PropTypes from "prop-types";
import CitiesList from "./CitiesList/CitiesList";

import editIcon from "../../images/icon-add.png";
import BigButton from "../common/BigButton/BigButton";
import { HiPlusCircle } from "react-icons/hi";

const CitiesBlock = ({ cities }) => {
  return (
    <div>
      <CitiesList cities={cities} />
      <BigButton text="Добавить город" icon={<HiPlusCircle />} />
    </div>
  );
};

CitiesBlock.propTypes = {};

export default CitiesBlock;
