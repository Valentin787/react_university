import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import FadeLoader from "react-spinners/FadeLoader";
import s from "./Loader.module.css";
const loader = document.querySelector("#loader");

const Loader = ({ loading }) => {
  return createPortal(
    <div className={s.wrapLoader}>
      <div className={s.modal}>
        <FadeLoader
          height={15}
          width={5}
          radius={2}
          margin={2}
          color={"#ff6b0a"}
          loading={loading}
          size={60}
        />
      </div>
    </div>,
    loader
  );
};

Loader.propTypes = {};

export default Loader;
