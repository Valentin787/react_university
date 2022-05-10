import PropTypes from "prop-types";

import { HiMenu } from "react-icons/hi";

import Paper from "../../common/Paper/Paper";

import s from "../CitiesBlock.module.css";

const CitiesList = ({ cities }) => {
  return (
    <ul className={s.list}>
      {cities.map((city, index) => (
        <li className={s.item__list} key={index + 1}>
          <Paper>
            <div className={s.item}>
              <p>{city}</p>
              <button className={s.button}>
                <HiMenu />
              </button>
            </div>
          </Paper>
        </li>
      ))}
    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.array,
};

export default CitiesList;
