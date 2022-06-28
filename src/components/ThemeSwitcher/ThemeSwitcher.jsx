import { useContext } from "react";
import { ThemeContext, themes } from "../../components/context/themeContext";
import PropTypes from "prop-types";
import Switch from "react-switch";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";

import s from "./ThemeSwitcher.module.css";

const ThemeSwitcher = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={s.container}>
      <div>
        <label>
          <Switch
            className={s.reactSwitch}
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === themes.light}
            handleDiameter={28}
            offColor="#fffc35"
            onColor="#4b4e4e"
            offHandleColor="#4b4e4e"
            onHandleColor="#fffc35"
            height={40}
            width={70}
            borderRadius={6}
            activeBoxShadow="0px 0px 1px 2px #fffc35"
            uncheckedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 15,
                  color: "orange",
                  paddingRight: 2,
                }}
              ></div>
            }
            checkedIcon={<svg></svg>}
            uncheckedHandleIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 18,
                }}
              >
                <BsFillMoonStarsFill style={{ color: "white" }} />
              </div>
            }
            checkedHandleIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  color: "red",
                  fontSize: 18,
                }}
              >
                <FaSun style={{ color: "#4b4e4e" }} />
              </div>
            }
          />
          {/* <div className={s.switchOn}></div> */}
        </label>
      </div>
    </div>
  );
};

ThemeSwitcher.propTypes = {};

export default ThemeSwitcher;
