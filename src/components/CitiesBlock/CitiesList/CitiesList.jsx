import PropTypes from "prop-types";
import { Component } from "react";

import CardWithMenu from "../../CardWithMenu/CardWithMenu";
import Paper from "../../common/Paper/Paper";
import s from "../CitiesBlock.module.css";

class CitiesList extends Component {
  render() {
    const { cities, onDeleteCity, onModalCityOpen, onOpenEditCityModal } =
      this.props;

    return (
      <ul className={s.list}>
        {cities.map((city, index) => (
          <li className={s.item__list} key={index + 1}>
            <Paper>
              <CardWithMenu
                text={city}
                onDeleteCity={() => onDeleteCity(city)}
                onModalCityOpen={onModalCityOpen}
                onOpenEditCityModal={() => onOpenEditCityModal(city)}
              />
            </Paper>
          </li>
        ))}
      </ul>
    );
  }
}

CitiesList.propTypes = {
  cities: PropTypes.array,
  onDeleteCity: PropTypes.func,
  onModalCityOpen: PropTypes.bool,
  onOpenEditCityModal: PropTypes.func,
};

export default CitiesList;
