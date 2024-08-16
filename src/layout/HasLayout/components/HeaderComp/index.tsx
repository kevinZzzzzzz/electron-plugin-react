import React, { useState, useEffect, memo } from "react";
import styles from "./index.module.scss";

import closeIcon from "@/assets/close.png";
import hiddenIcon from "@/assets/hidden.png";
import maximize from "@/assets/maximize.png";
import minimization from "@/assets/minimization.png";
function HeaderComp(props: any) {
  const [isFull, setIsFull] = useState(window.$electronAPI.isFullScreen());

  return (
    <div className={styles.header}>
      <div className={styles.header_empty}></div>
      <div className={styles.header_tools}>
        <img
          src={hiddenIcon}
          alt=""
          onClick={() => {
            window.$electronAPI.hideWindow();
          }}
        />
        <img
          src={isFull ? minimization : maximize}
          alt=""
          onClick={() => {
            window.$electronAPI.fullScreen(!isFull);
            setIsFull(!isFull);
          }}
        />
        <img
          src={closeIcon}
          alt=""
          onClick={() => {
            window.$electronAPI.closeWindow();
          }}
        />
      </div>
    </div>
  );
}
export default memo(HeaderComp);
