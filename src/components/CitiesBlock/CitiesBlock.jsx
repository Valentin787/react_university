import PropTypes from "prop-types";
import CitiesList from "./CitiesList/CitiesList";

import editIcon from "../../images/icon-add.png";
import BigButton from "../common/BigButton/BigButton";

const CitiesBlock = ({ cities }) => {
  return (
    <div>
      <CitiesList cities={cities} />
      <BigButton text="Добавить город" icon={editIcon} />
    </div>
  );
};

CitiesBlock.propTypes = {};

export default CitiesBlock;
