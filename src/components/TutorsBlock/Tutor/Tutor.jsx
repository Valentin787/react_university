import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext, themes } from "../../../components/context/themeContext";
import { ReactComponent as Mobile } from "../../../images/mobile.svg";
import { ReactComponent as Email } from "../../../images/envelop.svg";
import { ReactComponent as Location } from "../../../images/location.svg";

import s from "./Tutor.module.css";

const Tutor = ({
  lastName,
  firstName,
  patronymic,
  phone,
  email,
  city,
  options,
}) => {
  const { theme } = useContext(ThemeContext);
  const dataText = theme === themes.light ? s.dataTextLight : s.dataTextDark;

  return (
    <div className={theme === themes.light ? s.blockLight : s.blockDark}>
      <div className={s.name}>
        <p>{lastName}</p>
        <p>{firstName}</p>
        <p>{patronymic}</p>
      </div>
      <div className={s.data}>
        <p className={dataText}>
          <span className={s.text}>
            {" "}
            <Mobile /> {phone}
          </span>
        </p>
        <p className={dataText}>
          <span className={s.text}>
            {" "}
            <Email /> {email}
          </span>
        </p>
        <p className={dataText}>
          <span className={s.text}>
            {" "}
            <Location /> {city}
          </span>
        </p>
      </div>
      <div>
        <p>{options}</p>
      </div>
    </div>
  );
};

Tutor.propTypes = {
  lastName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  firstName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  patronymic: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  phone: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  email: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  city: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  options: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default Tutor;
