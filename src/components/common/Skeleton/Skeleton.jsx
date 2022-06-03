import React from "react";
import PropTypes from "prop-types";
// import ContentLoader, { Facebook } from 'react-content-loader'
import ContentLoader from "react-content-loader";
import s from "./Skeleton.module.css";

const Skeleton = () => {
  return (
    <div className={s.wrap}>
      <ContentLoader
        height={410}
        speed={2}
        backgroundColor={"#f3f3f3"}
        foregroundColor={"#ecebeb"}
        style={{ width: "100%" }}
      >
        {/* Only SVG shapes */}

        <rect x="-20" y="6" width="100%" height="120" />
        <rect x="-20" y="150" width="100%" height="120" />
        <rect x="-20" y="294" width="100%" height="120" />
      </ContentLoader>
    </div>
  );
};

Skeleton.propTypes = {};

export default Skeleton;
